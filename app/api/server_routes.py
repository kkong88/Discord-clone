from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, Server, ServerMember, Channel, ChannelMember, db


servers_routes = Blueprint('servers', __name__)

@servers_routes.route('/')
@login_required
def get_all_servers():
    servers = db.session.query(Server).all()
    return {'servers':{server.id: server.to_resource_dict() for server in servers}}
