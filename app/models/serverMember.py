from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime
from .server import Server
from .user import User



class ServerMember(db.Model):
    __tablename__ = 'serverMembers'

    id = db.Column(Integer, primary_key=True)
    server_id = db.Column(Integer, db.ForeignKey('servers.id', passive_deletes=True), nullable=False)
    user_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.member.username,
            'userId': self.member.id,
            'profilePicture': self.member.profile_picture,
            'email': self.member.email,
            'serverId': self.server_id,
        }
