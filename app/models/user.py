from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from alembic import op
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime(), server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now())


    servers_owned = db.relationship('Server', backref='owner',cascade="all, delete")

    server_member = db.relationship('ServerMember', backref='member')

    channel_member = db.relationship('ChannelMember', backref='member')

    channel_messages_sent = db.relationship('ChannelMessage', backref='sender',cascade="all, delete")

    channels_owned = db.relationship('Channel', backref='owner', cascade='all, delete')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email':self.email,
        'profilePicture': self.profile_picture,
        'serverOwned': {server.id: server.to_resource_dict() for server in self.servers_owned},
        'serverMember': {member.server_id: member.server.to_dict() for member in self.server_member},
        'channelMember': {room.id: room.channel.to_dict() for room in self.channel_member},
        'dmChannelsOwned': { channel.id: channel.to_resource_dict() for channel in self.channels_owned if channel.dm_channel == True  },
        'dmChannelMember': {member.id: member.channel.to_dict() for member in self.channel_member if member.channel.dm_channel == True},
    }
    def to_resource_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email':self.email,
        'profilePicture': self.profile_picture,
    }

    def in_server(self, server_id):
        for server in self.server_member:
            if server.server_id == server_id:
                return True
        return False

    def in_channel(self, channel_id):

        for channel in self.channel_member:
            if channel.channel_id == channel_id:
                return True
        return False
