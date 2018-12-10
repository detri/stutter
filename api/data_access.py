from models import User, Post, Thumb, Login_Attempt
from pony.orm import db_session, select, desc, count
from bcrypt import hashpw, gensalt, checkpw
from exceptions import RegistrationException, ThumbException
from datetime import datetime

class UserAccess:

  @staticmethod
  @db_session
  def get_by_id(id):
    '''
    Simple Pony method to get a User by ID.
    '''
    return User[id]

  @staticmethod
  @db_session
  def create(name, email, password):
    '''
    User registration data access method.
    '''
    # Check for already existing user
    user = User.get(name=name)
    if user:
      raise RegistrationException("A user with this name already exists.")
    user = User.get(email=email)
    if user:
      raise RegistrationException("A user with this email address already exists.")

    # OK, we're good, so create the user in the db
    return User(
      name=name,
      email=email,
      password=hashpw(password.encode('utf-8'), gensalt())
    )

  @staticmethod
  @db_session()
  def login_check(name, password, ip):
    # Check if the user exists, if not
    # store the login attempt.
    user = User.get(name=name)
    if not user:
      Login_Attempt(
        remote_address=ip,
        attempted_username=name
      )
      return None
    # Check for correct password; if not, store the login attempt.
    correct_pw = checkpw(password.encode('utf-8'), user.password)
    if not correct_pw:
      Login_Attempt(
        remote_address=ip,
        attempted_username=name
      )
      return None
    # If our user exists and the password is correct,
    # the attempt was successful. Return the user
    # so Flask-Login can log them in.
    Login_Attempt(
      remote_address=ip,
      attempted_username=name,
      success=True
    )
    return user

class PostAccess:

  @staticmethod
  @db_session
  def create(content, user):
    post = Post(
      content=content,
      user=user
    )
    return {
      "message": "Post successfully created!",
      "post": {
        "id": post.id,
        "content": post.content,
        "up": len([t for t in post.thumbs if t.up]),
        "down": len([t for t in post.thumbs if not t.up]),
        "date_created": post.date_created.timestamp()
      }
    }

  @staticmethod
  @db_session
  def read(page=None, order="date"):
    post_query = Post.select()
    if order == "date":
      post_query = post_query.order_by(desc(Post.date_created))
    if "thumbs" in order:
      up = "up" in order
      post_query = post_query.order_by(lambda p: desc(count(t for t in p.thumbs if t.up == up)))
    if page:
      posts = list(post_query.page(page))
    else:
      posts = list(post_query)
    posts_json = [{
      "id": p.id,
      "content": p.content,
      "up": len([t for t in p.thumbs if t.up]),
      "down": len([t for t in p.thumbs if not t.up]),
      "date_created": p.date_created.timestamp()
    } for p in posts]
    return posts_json

  @staticmethod
  @db_session
  def thumbs(post_id, user_id, up):
    post = Post.get(id=post_id)
    if not post:
      raise ThumbException("This post no longer exists.")
    thumb = Thumb.get(user=user_id, post=post_id)
    if thumb:
      thumb.up = up
      thumb.date_modified = datetime.now()
    else:
      Thumb(
        user=user_id,
        post=post_id,
        up=up
      )
    return {
      "message": "Thumbs " + ("up" if up else "down") + "!",
      "post": {
        "id": post.id,
        "content": post.content,
        "up": len([t for t in post.thumbs if t.up]),
        "down": len([t for t in post.thumbs if not t.up]),
        "date_created": post.date_created.timestamp()
      }
    }