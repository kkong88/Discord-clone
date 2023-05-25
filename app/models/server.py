
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db, environment, SCHEMA
import datetime

def find_general_channel_id (channels):
    for channel in channels:
        if channel.name == 'General':
           return channel.id


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    server_picture = db.Column(String(2000))
    name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(255)),
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    channels = db.relationship('Channel', backref='server', cascade="all,delete-orphan")

    members = db.relationship('ServerMember', cascade='all, delete-orphan', backref='server')

    def to_dict(self):
        return {
            'id': self.id,
            'owner': {'id':self.owner.id, 'username': self.owner.username},
            'picture': self.server_picture,
            'name': self.name,
            'description': self.description,
            'channels':{channel.id: channel.to_resource_dict() for channel in self.channels},
            'members': {member.id: member.to_dict() for member in self.members},
            'generalChannelId': find_general_channel_id(self.channels),
            'membersLength': len(self.members),
        }

    def to_resource_dict(self):
        return {
            'id': self.id,
            'owner': {'id':self.owner.id, 'username': self.owner.username},
            'picture': self.server_picture,
            'name': self.name,
            'description': self.description,
            'generalChannelId': self.channels[0].id,
            'membersLength': len(self.members),
        }













# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func
# from sqlalchemy.orm import relationship
# import datetime
# from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime


# class Server(db.Model):
#     __tablename__ = 'servers'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(30), nullable=False)
#     images = db.Column(db.String(255))
#     owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

#     users = db.relationship('User', back_populates ='servers')
#     members = db.relationship('User', secondary=add_prefix_for_prod('members'), back_populates ='servers')
#     channels = db.relationship('Channel', back_populates ='servers')

#     def to_dict_server(self):
#         if len(self.channels):
#             channel = self.channels[0].to_dict_channel()
#             channel_id = channel['id']

#         return {
#             'id': self.id,
#             'name': self.name,
#             'images': self.images,
#             'owner_id': self.owner_id,
#             'members' : [user.id for user in self.members],
#             'list_member': [user.to_dict() for user in self.members],
#             'channels': {channel_id: self.channels[0].to_dict_channel()} if len(self.channels) else {},
#             'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
#             'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
#         }

#     def member_id(self):
#         return [user.id for user in self.members]
