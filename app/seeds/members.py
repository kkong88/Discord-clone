from app.models import db, Server, Member, SCHEMA, environment
from sqlalchemy.sql import text

def seed_members():
    member1 = Member(
        user_id = 1, server_id = 1
    )
    member2 = Member(
        user_id = 2, server_id = 1
    )
    member3 = Member(
        user_id = 1, server_id = 2
    )
    member4 = Member(
        user_id = 2, server_id = 3
    )
    member5 = Member(
        user_id = 3, server_id = 2
    )

    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(member5)
    db.session.commit()

def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))

    db.session.commit()
