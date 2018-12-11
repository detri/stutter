import os
from datetime import datetime
from pony.orm import Database, Required, Set, PrimaryKey

db = Database()

DB_USER = os.environ['DB_USER']
DB_HOST = os.environ['DB_HOST']
DB_PASS = os.environ['DB_PASS']
DB_NAME = os.environ['DB_NAME']

class User(db.Entity):
    id = PrimaryKey(int, auto=True)
    name = Required(str, 16, unique=True)
    email = Required(str, 320, unique=True)
    password = Required(bytes)
    posts = Set('Post', cascade_delete=True)
    thumbs = Set('Thumb', cascade_delete=True)
    date_created = Required(datetime, default=lambda: datetime.now())
    date_modified = Required(datetime, default=lambda: datetime.now())


class Post(db.Entity):
    id = PrimaryKey(int, auto=True)
    content = Required(str, 280)
    user = Required(User)
    thumbs = Set('Thumb', cascade_delete=True)
    date_created = Required(datetime, default=lambda: datetime.now())
    date_modified = Required(datetime, default=lambda: datetime.now())


class Thumb(db.Entity):
    id = PrimaryKey(int, auto=True)
    up = Required(bool, default=False)
    user = Required(User)
    post = Required(Post)
    date_created = Required(datetime, default=lambda: datetime.now())
    date_modified = Required(datetime, default=lambda: datetime.now())

class Login_Attempt(db.Entity):
    id = PrimaryKey(int, auto=True)
    remote_address = Required(str)
    attempted_username = Required(str)
    success = Required(bool, default=False)
    date_attempted = Required(datetime, default=lambda: datetime.now())

db.bind(provider='postgres', user=DB_USER, password=DB_PASS, host=DB_HOST, database=DB_NAME)
db.generate_mapping(create_tables=True)