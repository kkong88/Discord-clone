from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    images = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id', nullable=False))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='servers')
    members = db.relationship('User', secondary=add_prefix_for_prod('members'), back_populates='servers')
    channels = db.relationship('Channel', back_populate='servers')

    def to_dict_server(self):
        return {
            'id': self.id,
            'name': self.name,
            'images': self.images,
            'owner_id': self.owner_id,
            'members' : [user.to_dict() for user in self.members],
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
