from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime
from .server import Server
from .user import User


class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    # users = db.relationship('User', back_populates ='members')
    # servers = db.relationship('Server', back_populates = 'members')
