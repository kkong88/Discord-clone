from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime

class ChannelMessage(db.Model):
    __tablename__ = 'channelMessages'

    id = db.Column(Integer, primary_key=True)
    channel_id = db.Column(Integer, ForeignKey('channels.id'))
    sender_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    content = db.Column(String(2000), nullable=False)
    picture = db.Column(String(2000))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.channel.server_id,
            'channelId': self.channel_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
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

