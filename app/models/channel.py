from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime, Boolean

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')))
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    dm_channel = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    members = db.relationship('ChannelMember', backref='channel', cascade='all, delete-orphan')
    messages = db.relationship('ChannelMessage', backref='channel',cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverId': self.server_id,
            'messages': {message.id:message.to_dict() for message in self.messages},
            'members': {member.user_id: member.to_dict() for member in self.members},
            'dmChannel': self.dm_channel,
            'membersLength': len(self.members)
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverId': self.server_id,
            'dmChannel': self.dm_channel,
            'membersLength': len(self.members)
        }
