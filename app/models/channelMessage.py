from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime



class ChannelMessage(db.Model):
    __tablename__ = 'channelMessages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    picture = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime(), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.channel.server_id,
            'channelId': self.channel_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
    def to_socket_dict(self):
        return {
            'id': self.id,
            'serverId': self.channel.server_id,
            'channelId': self.channel_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
        }


# class Message(db.Model):
    # __tablename__ = 'messages'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True)
    # channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    # content = db.Column(db.String, nullable=False)
    # owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # created_at = db.Column(db.DateTime(), nullable=False, server_default=func.now())
    # updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    # users = db.relationship('User', back_populates ='messages')
    # channels = db.relationship('Channel', back_populates ='messages')


    # def to_dict_message(self):
    #     return {
    #         'id': self.id,
    #         'channel_id': self.channel_id,
    #         'content': self.content,
    #         'owner_id': self.owner_id,
    #         'owner': self.users.to_dict(),
    #         'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
    #         'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
    #     }
