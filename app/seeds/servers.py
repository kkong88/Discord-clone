from app.models import db, Server, User, ServerMember, SCHEMA, environment
from sqlalchemy.sql import func, text
from sqlalchemy.sql.expression import func


def seed_servers():
    server1 = Server(
        name = 'The Boys',
        server_picture = 'Example.jpg',
        description = 'Hello Welcome',
        owner_id = 1
    )
    server2 = Server(
        name = 'App Academy',
        server_picture = 'TEST.jpg',
        description = 'Have Fun',
        owner_id = 2
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.commit()

def seed_server_members():
    for i in range(1, 2):
        members = ServerMember(
            user_id = i,
            server_id = 1
        )
        db.session.add(members)
        db.session.commit()

    for j in range(1,2):
        random_user_id = db.session.query(User.id).order_by(func.random()).first()[0]
        seed_server = Server(
            name=f'Server {j}',
            owner_id = random_user_id
        )
        db.session.add(seed_server)
        db.session.commit()

        member1 = ServerMember(
            user_id = 1,
            server_id = j
        )
        member2 = ServerMember(
            user_id = 2,
            server_id = j
        )
        member3 = ServerMember(
            user_id = 3,
            server_id = j
        )
        member4 = ServerMember(
            user_id = 4,
            server_id = j
        )
        member5 = ServerMember(
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


def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM server_members"))

    db.session.commit()
