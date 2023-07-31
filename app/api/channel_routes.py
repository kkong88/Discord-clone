from flask import Blueprint, request
from .auth_routes import validation_errors_to_error_messages
from app.models import User, Server, ServerMember, Channel, ChannelMember,ChannelMessage, db
from flask_login import current_user


channel_routes = Blueprint('channels', __name__)

# @channel_routes.route('')
# def get_channel(server_id):
#         channels= Channel.query.filter(Channel.server_id == server_id).all()

#         return {'channels': {channel.id:channel.to_resource_dict() for channel in channels}}


@channel_routes.route('/<int:channel_id>')
def get_one_channel(channel_id):
    channel = Channel.query.get(channel_id)
    return channel.to_dict()

@channel_routes.route('<int:channel_id>', methods = ['POST'])
def post_a_channel(channel_id):

        data = request.json

        channel = Channel(name = data['name'], server_id = data['serverId'])
        db.session.add(channel)
        db.session.commit()

        message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
        db.session.add(message)
        db.session.commit()

        return channel.to_dict()


@channel_routes.route('<int:channel_id>', methods = ['PUT'])
def edit_one_channel(channel_id):
        channel = Channel.query.get(channel_id)
        name = request.json['name']
        message = ChannelMessage.query.filter(ChannelMessage.channel_id == channel_id).filter(ChannelMessage.sender_id == 1).first()
        message.content = f'Welcome to {channel.server.name}\'s Channel {name}'
        db.session.commit()

        channel.name = request.json['name']
        db.session.commit()
        return channel.to_dict()

@channel_routes.route('<int:channel_id>', methods = ['DELETE'])
def delete_channel(channel_id):
        channel = Channel.query.get(channel_id)
        db.session.delete(channel)
        db.session.commit()
        return {'channelId': channel.id}


@channel_routes.route('/<int:channel_id>/messages', methods=['POST'])
def post_channel_message(channel_id):
    new_message = ChannelMessage(
        channel_id=channel_id,
        sender_id = current_user.id,
        content = request.form['content'],
        picture = 'testing.url'

    )
    db.session.add(new_message)
    db.session.commit()
    return new_message.to_dict()

@channel_routes.route('/<int:channel_id>/messages/<int:message_id>', methods=['PUT', 'DELETE'])
def update_delete_message(channel_id,message_id):

       message = ChannelMessage.query.get(message_id)

       if request.method == 'PUT':
              data = request.form['content']
              message.content = data
              db.session.commit()
              return message.to_dict()

       if request.method == 'DELETE':
              db.session.delete(message)
              db.session.commit()
              return {'messageId': message.id}


@channel_routes.route('/<int:channel_id>/members')
def get_channel_members(channel_id):

        channel_members= ChannelMember.query.filter(ChannelMember.channel_id == channel_id).all()

        return {'channelMembers': {member.id:member.to_dict() for member in channel_members}}

@channel_routes.route('<int:channel_id>/members', methods=['POST'])
def post_channel_members(channel_id):

        data = request.json
        joining_member = User.query.get(data['userId'])
        data = request.json
        member = ChannelMember(channel_id=channel_id, user_id=data['userId'])
        db.session.add(member)


        message = ChannelMessage(channel_id=channel_id, sender_id=1, content=f'{joining_member.username} has entered')
        db.session.add(message)
        db.session.commit()
        channel = Channel.query.get(channel_id)

        return {'member':member.to_dict(), 'channel': channel.to_dict()}

@channel_routes.route('/<int:channel_id>/members/<int:member_id>', methods=['DELETE'])
def delete_member(channel_id, member_id):

    channel = Channel.query.get(channel_id)
    member = ChannelMember.query.get(member_id)
    db.session.delete(member)
    leaving_message = ChannelMessage(channel_id=channel_id, sender_id=1, content=f'{member.member.username} has left the channel')
    db.session.add(leaving_message)
    db.session.commit()

    return {'memberId': member_id, 'channelId': channel.id }
