import os
from flask import Flask, request, jsonify, send_from_directory
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
from data_access import UserAccess, PostAccess
from exceptions import *
from json import loads, dumps
from pony.orm import TransactionError
from datetime import timedelta

# init app
app = Flask(__name__, static_folder='static/build')
app.secret_key = os.environ['SECRET_KEY']

# Config app
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=12)

# setup JWT
def authenticate(username, password):
  user_login = UserAccess.login_check(
    username,
    password,
    request.remote_addr
  )
  if user_login:
    return user_login

def identity(payload):
  user_id = payload['identity']
  return UserAccess.get_by_id(user_id)

JWT(app, authenticate, identity)


# setup CORS
# CORS(app=app, origin="localhost:3000", supports_credentials=True)

# register route
@app.route("/register", methods=["POST"])
def register_user():
  if not request.is_json:
    return RequestException("Request is not JSON").response()
  user_json = request.get_json()
  try:
    user = UserAccess.create(
      user_json["name"],
      user_json["email"],
      user_json["password"]
    )
  except TransactionError:
    return RequestException("Database error").response()
  except KeyError:
    return RequestException("Invalid registration request").response()
  except RegistrationException as err:
    return err.response()
  return jsonify({
    "name": user.name,
    "email": user.email,
  })

## API ROUTES ##

# post CRUD
@app.route("/api/post", methods=["GET"])
def get_posts():
  posts_json = PostAccess.read()
  return jsonify({
    "message": "Posts grabbed successfully",
    "posts": posts_json
  })

@app.route("/api/post/<sort>/<page>", methods=["GET"])
def get_posts_by_page(sort, page):
  page = int(page)
  posts_json = PostAccess.read(page, sort)
  return jsonify({
    "message": "Posts grabbed successfully",
    "posts": posts_json["posts"],
    "count": posts_json["count"]
  })

@app.route("/api/post", methods=["POST"])
@jwt_required()
def create_post():
  if not request.is_json:
    return RequestException("Request is not JSON").response()
  post_json = request.get_json()
  try:
    new_post = PostAccess.create(post_json["content"], current_identity.id)
  except KeyError:
    return RequestException("Invalid post request").response()
  return jsonify(new_post)

# thumbs up
@app.route("/api/post/<id>/up")
@jwt_required()
def thumbs_up(id):
  try:
    thumb_json = PostAccess.thumbs(
      post_id=id,
      user_id=current_identity.id,
      up=True
    )
  except ThumbException as err:
    return err.response()
  return jsonify(thumb_json)

# thumbs down
@app.route("/api/post/<id>/down")
@jwt_required()
def thumbs_down(id):
  try:
    thumb_json = PostAccess.thumbs(
      post_id=id,
      user_id=current_identity.id,
      up=False
    )
  except ThumbException as err:
    return err.response()
  return jsonify(thumb_json)

# serve static files for production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists("static/build/" + path):
        return send_from_directory('static/build', path)
    else:
        return send_from_directory('static/build', 'index.html')