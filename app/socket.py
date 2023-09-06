from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://this-cord-8tu7.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins,logger=True, engineio_logger=True )

@socketio.on('connect')
def on_connect():
    retrieve_active_users()

def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)

@socketio.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)

@socketio.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)

@socketio.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    ('THIS IS ROOM!')
    emit('open_room', {'room': room}, broadcast=True)

@socketio.on("leave_room")
def leave(data):
    leave_room(data['room'])

@socketio.on('message')
def on_chat_sent(data):
    emit('message', {'message': data['message']}, room=data['room'])


@socketio.on('delete_message')
def on_message_delete(data):
    messageId = data.get('messageId')
    # emit('message_deleted', {'messageId': messageId, 'channelId': data['channelId']}, room=data['room'], broadcast=True)
    emit('message_deleted', {'messageId': data['messageId'], 'channelId': data['channelId']}, to=data['room'], broadcast=True, include_self=False)
