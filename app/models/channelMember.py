from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime


class ChannelMember(db.Model):
    __tablename__ = 'channelMembers'

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id', passive_deletes=True), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'channelId': self.channel_id,
            'userId': self.user_id,
            'username':self.member.username,
            'profilePicture': self.member.profile_picture,
        }
