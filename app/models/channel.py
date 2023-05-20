from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Enum, ForeignKey, DateTime


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id', nullable=False))
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(), onupdate=func.now(), default=func.now())

    servers = db.relationship('Server', back_populate='channels')
    messages = db.relationship('Message', back_populates='channels')


    def to_dict_channel(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'description': self.description,
            'messages': {},
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S')
        }
