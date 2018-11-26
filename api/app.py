from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from data_access import UserAccess, PostAccess
from exceptions import *
from json import loads, dumps
from pony.orm import TransactionError

# init app
app = Flask(__name__)
app.secret_key = b':p\x10\xd9N\xdb\xdd\xfb\xe2z\x01\xbd\x04\x18\xf1`'

# setup login manager
login_manager = LoginManager(app)

# setup login functions
@login_manager.user_loader
def load_user(user_id):
  return UserAccess.get_by_id(user_id)

@login_manager.unauthorized_handler
def handle_unauthorized():
  return UnauthorizedException("You must be logged in to perform this action.").response()

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

# login route
@app.route("/login", methods=["POST"])
def login():
  if not request.is_json:
    return RequestException("Request is not JSON").response()
  login_json = request.get_json()
  try:
    user_login = UserAccess.login_check(
      login_json["name"],
      login_json["password"],
      request.remote_addr
    )
  except KeyError:
    return RequestException("Invalid login request").response()
  except LoginException as err:
    return err.response()
  login_user(user_login)
  return jsonify({
    "message": "Logged in successfully"
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

@app.route("/api/post", methods=["POST"])
@login_required
def create_post():
  if not request.is_json:
    return RequestException("Request is not JSON").response()
  post_json = request.get_json()
  try:
    new_post = PostAccess.create(post_json["content"], current_user.id)
  except KeyError:
    return RequestException("Invalid post request").response()
  return jsonify({
    "message": "Post created successfully",
    "content": new_post.content
  })

# thumbs up
@app.route("/api/post/<id>/up", methods=["POST"])
@login_required
def thumbs_up(id):
  try:
    PostAccess.thumbs(
      post_id=id,
      user_id=current_user.id,
      up=True
    )
  except ThumbException as err:
    return err.response()
  return jsonify({
    "message": "Thumbs up!"
  })

# thumbs down
@app.route("/api/post/<id>/down", methods=["POST"])
@login_required
def thumbs_down(id):
  try:
    PostAccess.thumbs(
      post_id=id,
      user_id=current_user.id,
      up=False
    )
  except ThumbException as err:
    return err.response()
  return jsonify({
    "message": "Thumbs down!"
  })

@app.route("/")
def hello():
  return "<h1>Hello world!!</h1>"