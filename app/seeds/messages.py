# from app.models import db, ChannelMessage, Channel, ChannelMember, User, environment, SCHEMA
# from faker import Faker
# from sqlalchemy.sql import func, text
# import random

# fake = Faker()

# def seed_channel_messages():
#     for i in range (0, 200):
#         channel_id = db.session.query(Channel.id).order_by(func.random()).first()[0]
#         owner_id = db.session.query(User.id).order_by(func.random()).first()[0]

#         seed_data = ChannelMessage(
#             channel_id = channel_id,
#             content = fake.paragraph(nb_sentences=5),
#             owner_id = owner_id
#         )

#         member_list = ChannelMember (
#             user_id = owner_id,
#             channel_id = channel_id
#         )

#         db.session.add(member_list)
#         db.session.add(seed_data)

# def undo_channel_messages():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.channelMessages RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM channelMessages"))

#     db.session.commit()




# def seed_messages():
#     for x in range(0, 300):
#         channel_id = random.choice(db.session.query(Channel.id).all())[0]
#         owner_id = random.choice(db.session.query(User.id).all())[0]
#         channel = db.session.query(Channel).get(channel_id)
#         server_id = channel.server_id

#         seed_message = Message(
#         content = fake.paragraph(nb_sentences=3),
#         owner_id = owner_id,
#         channel_id = channel_id
#     )

#         make_member = Member(
#             user_id=owner_id,
#             server_id=server_id
#         )

#         db.session.add(make_member)
#         db.session.add(seed_message)

#     db.session.commit()
