
import random
from app.models import db, Server, Channel, SCHEMA, environment
from sqlalchemy.sql import text

def seed_channels():
    for i in range(1, 50):
        seed_channel = Channel(
            name=f'Channel {i}',
            server_id=random.choice(db.session.query(Server.id).all())[0]
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
