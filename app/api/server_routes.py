from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, Server, ServerMember, Channel, ChannelMember,ChannelMessage, db


servers_routes = Blueprint('servers', __name__)

@servers_routes.route('/', methods=['GET', 'POST'])
def get_all_or_post_to_servers():

    if request.method == 'GET':
        servers= db.session.query(Server).all()

        return {'servers':{server.id: server.to_resource_dict() for server in servers}}

    if request.method == 'POST':

        server = Server(owner_id=current_user.id, server_picture='test.url', name=request.form['name'], )

        db.session.add(server)
        db.session.commit()

        server_member = ServerMember(server_id=server.id, user_id=server.owner_id)
        db.session.add(server_member)

        channel = Channel(name='Test', server_id=server.id)
        db.session.add(channel)
        db.session.commit()

        first_message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {server.name}\'s Server')
        db.session.add(first_message)
        db.session.commit()

        return server.to_dict()

@servers_routes.route('/<int:server_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one__put_delete_server(server_id):
    server = Server.query.get(server_id)
    if request.method == 'GET':
        return server.to_dict()

    if request.method == 'PUT':
        server_general_channel = Channel.query.get(server.channels[0].id)
        general_channel_welcome_message = ChannelMessage.query.filter(ChannelMessage.channel_id == server_general_channel.id).filter(ChannelMessage.sender_id == 1 ).first()
        name = request.form['name']
        general_channel_welcome_message.content = f'Welcome to {name}\'s Server'
        db.session.commit()
        server.name = request.form['name']
        server.server_picture = 'testing'
        db.session.commit()
        return server.to_dict()

    if request.method == 'DELETE':
        db.session.delete(server)
        db.session.commit()
        return {'serverId': server.id}

@servers_routes.route('/<int:server_id>/members', methods=['GET', 'POST'])
def get_all_or_post_to_server_members(server_id):

    server_general_channel = Channel.query.filter(Channel.server_id == server_id).filter(Channel.name == 'General').first()



    if request.method == 'GET':

        server_members= ServerMember.query.filter(ServerMember.server_id == server_id).all()


        return {'serverMembers': {member.id:member.to_dict() for member in server_members}}
    if request.method == 'POST':
        data = request.json
        joining_member = User.query.get(data['userId'])
        data = request.json
        member = ServerMember(server_id=server_id, user_id=data['userId'])
        db.session.add(member)

        first_message = ChannelMessage(channel_id=server_general_channel.id, sender_id=1, content=f'👋{joining_member.username} has slid into the server')
        db.session.add(first_message)
        db.session.commit()
        server = Server.query.get(server_id)

        return {'member':member.to_dict(), 'server': server.to_dict()}

@servers_routes.route('/<int:server_id>/members/<int:member_id>', methods=['DELETE'])
def delete_server_member(server_id, member_id):
    server_general_channel = Channel.query.filter(Channel.server_id == server_id).filter(Channel.name == 'General').first()
    member = ServerMember.query.get(member_id)
    db.session.delete(member)
    leaving_message = ChannelMessage(channel_id=server_general_channel.id, sender_id=1, content=f'😭 {member.member.username} has left the server')
    db.session.add(leaving_message)
    db.session.commit()
    return {'memberId': member_id, 'serverId': server_general_channel.server_id }

@servers_routes.route('/<int:server_id>/channels', methods=['GET', 'POST'])
def get_all_or_post_to_channel(server_id):
    if request.method == 'GET':
        channels= Channel.query.filter(Channel.server_id == server_id).all()

        return {'channels': {channel.id:channel.to_resource_dict() for channel in channels}}
    if request.method == 'POST':
        data = request.json
        channel = Channel(name=data['name'], server_id=data['serverId'])
        db.session.add(channel)
        db.session.commit()

        first_message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
        db.session.add(first_message)

        db.session.commit()
        return channel.to_dict()

@servers_routes.route('/<int:server_id>/channels/<int:channel_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one__put_delete_channel(server_id, channel_id):
    channel = Channel.query.get(channel_id)
    if request.method == 'GET':
        return channel.to_dict()

    if request.method == 'PUT':
        name = request.json['name']
        diss_cord_bot_message = ChannelMessage.query.filter(ChannelMessage.channel_id == channel_id).filter(ChannelMessage.sender_id == 1).first()
        diss_cord_bot_message.content = f'Welcome to {channel.server.name}\'s Channel {name}'
        db.session.commit()


        channel.name = request.json['name']
        db.session.commit()
        return channel.to_dict()

    if request.method == 'DELETE':
        db.session.delete(channel)
        db.session.commit()
        return {'channelId': channel.id}
