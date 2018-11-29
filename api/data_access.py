from models import User, Post, Thumb, Login_Attempt
from pony.orm import db_session, select
from bcrypt import hashpw, gensalt, checkpw
from exceptions import LoginException, RegistrationException, ThumbException
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
  @db_session(allowed_exceptions=[LoginException])
  def login_check(name, password, ip):
    # Check if the user exists, if not
    # store the login attempt.
    user = User.get(name=name)
    if not user:
      Login_Attempt(
        remote_address=ip,
        attempted_username=name
      )
      raise LoginException("User does not exist")
    # Check for correct password; if not, store the login attempt.
    correct_pw = checkpw(password.encode('utf-8'), user.password)
    if not correct_pw:
      Login_Attempt(
        remote_address=ip,
        attempted_username=name
      )
      raise LoginException("Incorrect password")
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
    return Post(
      content=content,
      user=user
    )

  @staticmethod
  @db_session
  def read(page=None):
    if page:
      posts = list(Post.select().page(page))
    else:
      posts = list(Post.select())
    posts_json = [{
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
    thumb = Thumb.get(user=user_id)
    if thumb:
      thumb.up = up
      thumb.date_modified = datetime.now()
      return thumb
    return Thumb(
      up=up,
      user=user_id,
      post=post_id
    )