from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1689353949/male_default_dp_t2m5to.png")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1689354025/profile-icon-design-free-vector_q7zvww.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686255870/png-clipart-computer-icons-discord-logo-smiley-emoticon-smiley-miscellaneous-blue_zdbu60.png")
    kelly = User(
        username = 'kelly', email='kelly@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1688232430/IMG-5124_cryrur.jpg")
    marlon = User(
        username= 'marlon', email='marlon@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1686255057/discord-icon-all-the-cool-kids-are-moving-discord-podfeet-podcasts-0_puo5ol.png")
    james = User(
        username='james', email='james@aa.io', password='password', profile_picture="https://res.cloudinary.com/dip4w3xmy/image/upload/v1689354584/hqdefault_ucnktj.jpg")



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kelly)
    db.session.add(marlon)
    db.session.add(james)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
