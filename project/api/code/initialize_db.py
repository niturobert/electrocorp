#!/usr/bin/env python3


from app import app, db
from models import *
from os import remove


# print(str(db.drop_all()))
# print(str(db.create_all()))

db.drop_all()
db.create_all()


import data.users
import data.power_plants
import data.pylons
import data.cabins
import data.power_lines
import data.connections