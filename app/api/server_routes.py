from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, Server, ServerMember, Channel, ChannelMember ,ChannelMessage, db


servers_routes = Blueprint('servers', __name__)


#get all servers
@servers_routes.route('')
def get_to_servers():

        servers= db.session.query(Server).all()

        return {'servers':{server.id: server.to_resource_dict() for server in servers}}

#get one server
@servers_routes.route('/<int:server_id>')
def get_one_server(server_id):

    server = Server.query.get(server_id)
    return server.to_dict()

#create a server
@servers_routes.route('', methods = ['POST'])
def post_to_servers():

        server = Server(owner_id=current_user.id, server_picture='test.url', name=request.form['name'], )

        db.session.add(server)
        db.session.commit()

        server_member = ServerMember(server_id=server.id, user_id=server.owner_id)
        db.session.add(server_member)

        channel = Channel(name='General Chat', server_id=server.id)
        db.session.add(channel)
        db.session.commit()

        first_message = ChannelMessage(channel_id = channel.id, sender_id=current_user.id, content = f'Welcome to {server.name}\'s Server')
        db.session.add(first_message)
        db.session.commit()

        return server.to_dict()

#update a server
@servers_routes.route('/<int:server_id>', methods = ['PUT'])
def update_server(server_id):

        server = Server.query.get(server_id)
        server_general_channel = Channel.query.get(server.channels[0].id)
        general_channel_welcome_message = ChannelMessage.query.filter(ChannelMessage.channel_id == server_general_channel.id).filter(ChannelMessage.sender_id == 1 ).first()
        name = request.form['name']
        general_channel_welcome_message.content = f'Welcome to {name}\'s Server'
        db.session.commit()
        server.name = request.form['name']
        server.server_picture = 'testing'
        db.session.commit()
        return server.to_dict()

#Delete a server
@servers_routes.route('/<int:server_id>', methods = ['DELETE'])
def delete_server(server_id):
        server = Server.query.get(server_id)
        db.session.delete(server)
        db.session.commit()
        return {'serverId': server.id}


#find all server members
@servers_routes.route('/<int:server_id>/members')
def get_all_server_members(server_id):

    server_members= ServerMember.query.filter(ServerMember.server_id == server_id).all()
    return {'serverMembers': {member.id:member.to_dict() for member in server_members}}
#find one server member
@servers_routes.route('<int:server_id>/members', methods = ['POST'])
def post_server_member(server_id):

        server = Server.query.get(server_id)

        test_channel = Channel.query.filter_by(server_id=server_id).first()
        data = request.json
        joining_member = User.query.get(data['userId'])
        data = request.json
        member = ServerMember(server_id=server_id, user_id=data['userId'])
        db.session.add(member)

        first_message = ChannelMessage(channel_id=test_channel.id, sender_id=server.owner_id, content=f'{joining_member.username} welcome to the server')
        db.session.add(first_message)
        db.session.commit()

        return {'member':member.to_dict(), 'server': server.to_dict()}

#delete a server member
@servers_routes.route('/<int:server_id>/members/<int:member_id>', methods=['DELETE'])
def delete_server_member(server_id, member_id):

#     server_general_channel = Channel.query.filter(Channel.server_id == server_id).filter(Channel.name == 'Test').first()
    server_general_channel = Channel.query.filter_by(server_id=server_id).first()
    member = ServerMember.query.get(member_id)
    db.session.delete(member)
    leaving_message = ChannelMessage(channel_id=server_general_channel.id, sender_id = server_general_channel.server.owner_id, content=f'{member.member.username} has left the server')
    db.session.add(leaving_message)
    db.session.commit()
    return {'memberId': member_id, 'serverId': server_general_channel.server_id }


@servers_routes.route('/<int:server_id>/channels')
def get_channel(server_id):

        channels= Channel.query.filter(Channel.server_id == server_id).all()

        return {'channels': {channel.id:channel.to_resource_dict() for channel in channels}}

@servers_routes.route('/<int:server_id>/channels', methods = ['POST'])
def post_to_channel(server_id):

        data = request.json
        channel = Channel(name = data['name'], server_id = data['serverId'])
        db.session.add(channel)
        db.session.commit()
        message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
        db.session.add(message)

        db.session.commit()
        return channel.to_dict()
