
import random
from app.models import db, Server, Channel, SCHEMA, environment
from sqlalchemy.sql import text, func

def seed_channels():
    for i in range(1, 50):
        seed_channel = Channel(
            name=f'Channel {i}',
            server_id = db.session.query(Server.id).order_by(func.random()).first()[0]
        )
        db.session.add(seed_channel)
        db.session.commit()

# def undo_channels():
#     db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE')
#     db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
