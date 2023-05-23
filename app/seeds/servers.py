from app.models import db, Server, User, Member, SCHEMA, environment
from sqlalchemy.sql import func, text

from app.models import db, Server, User, Member
from sqlalchemy.sql.expression import func


def seed_servers():
    server1 = Server(
        name = 'The Boys',
        images = 'Example.jpg',
        owner_id = 1
    )

    db.session.add(server1)
    db.session.commit()

    for i in range(1, 1):
        members = Member(
            user_id = i,
            server_id = 1
        )
        db.session.add(members)
        db.session.commit()

    for j in range(1,10):
        print(j, "______J LOOOP__________")
        random_user_id = db.session.query(User.id).order_by(func.random()).first()[0]
        print(random_user_id, "______RANDOM______")
        seed_server = Server(
            name=f'Server {j}',
            owner_id = random_user_id
        )
        db.session.add(seed_server)
        db.session.commit()

        member1 = Member(
            user_id = 1,
            server_id = j
        )
        print(member1, "_____MEMBER1")
        member2 = Member(
            user_id = 2,
            server_id = j
        )
        member3 = Member(
            user_id = 3,
            server_id = j
        )
        member4 = Member(
            user_id = 4,
            server_id = j
        )
        member5 = Member(
            user_id = 5,
            server_id = j
        )
        db.session.add(member1)
        db.session.add(member2)
        db.session.add(member3)
        db.session.add(member4)
        db.session.add(member5)
        db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
