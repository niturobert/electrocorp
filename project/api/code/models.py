# https://www.submarinecablemap.com/
# This website is an archive of the electric lines.

from app import db
import cv2
import numpy
import base64
import hashlib
import face_recognition


# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())



# Define an Employee model
class Employee(Base):
    __tablename__ = 'employees'

    # User Name
    name    = db.Column(db.String(128), nullable=False)
    surname = db.Column(db.String(128), nullable=False)

    # Identification Data: email, password and face
    email    = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(192), nullable=False)
    face     = db.Column(db.LargeBinary, nullable=False)

    # Authorisation Data: role & status
    role     = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    # Authentication method
    @staticmethod
    def authenticate(email, password, frame):
        temp_user = Employee.query.filter(
            Employee.email == email,
            Employee.password == hashlib.sha512(password.encode('utf-8')).hexdigest()
        )

        if temp_user.count() != 1:
            raise Exception('Invalid credentials...')
        
        temp_user = temp_user.first()

        # Check if the face matches...
        captured_frame = cv2.imdecode(numpy.fromstring(base64.b64decode(frame), dtype=numpy.uint8), cv2.IMREAD_COLOR)
        face_locations = face_recognition.face_locations(captured_frame)
        detected_faces = len(face_locations)

        if detected_faces == 0: raise Exception('No faces detected')
        if detected_faces > 1: raise Exception('Please be alone when you use the workstation')
        
        # print(face_locations)
        account_face = cv2.imdecode(numpy.fromstring(base64.b64decode(temp_user.face), dtype=numpy.uint8), cv2.IMREAD_COLOR)

        try:
            account_face_encoding = face_recognition.face_encodings(account_face)[0]
        
        except Exception as e:
            raise Exception('There was an error detecting the user in the database.')
            
        captured_frame_encoding = face_recognition.face_encodings(captured_frame)[0]

        is_the_same_person = face_recognition.compare_faces([account_face_encoding], captured_frame_encoding)[0]
        if is_the_same_person != True:
            raise Exception('It seems you are not the person in the database...')

        return temp_user

    def __repr__(self):
        return '<User %r>' % (self.name)  

    def toApiData(self):
        return {
            'name': '%s %s' % (self.surname, self.name),
            'email': '%s' % self.email,
            'role': '%s' % Role.query.get(self.role).name
        }


# Defining the Role model.
class Role(Base):
    __tablename__ = 'roles'

    # Role information
    name            = db.Column(db.String(128), nullable=False, unique=True)
    description     = db.Column(db.String(409), nullable=False)

    # Relationship data
    users           = db.relationship('Employee', backref='roles', lazy=False)

    def __repr__(self):
        return '<Role %r>' % (self.name)
    
    def toApiData(self):
        return {
            'name': self.name,
            'description': self.description
        }


# Defining the PowerPlant model.
class PowerPlant(Base):
    __tablename__ = 'power_plants'

    # Information about the power plant
    name        = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(4096), nullable=True)
    category    = db.Column(db.Integer, db.ForeignKey('power_plant_categories.id'), nullable=False)

    # Location of the power plant
    latitude    = db.Column(db.Float, nullable=False)
    longitude   = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return '<PowerPlant %s %f:%f>' % (self.name, self.latitude, self.longitude)
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': 'Power Plant',
            'description': self.description,
            'category': PowerPlantCategory.query.get(self.category).name,
            'location': [self.latitude, self.longitude],
            'lat': self.latitude,
            'lng': self.longitude,
        }


class Pylon(Base):
    __tablename__ = 'pylons'

    # Information about the pylon
    name        = db.Column(db.String(128), nullable=True)
    category    = db.Column(db.Integer, db.ForeignKey('pylon_categories.id'))

    # Location of the pylon
    latitude    = db.Column(db.Float, nullable=False)
    longitude   = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return '<Pylon %f:%f>' % (self.latitude, self.longitude)
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': 'Pylon',
            'category': PylonCategory.query.get(self.category).name,
            'color': '#00ff00',
            'lat': self.latitude,
            'lng': self.longitude,
            'size': 0.0051215125,
            'radius': 0.03,
        }


class HighVoltagePowerCabin(Base):
    __tablename__ = 'high_voltage_power_cabins'

    # Information of the cabin
    name        = db.Column(db.String(128), nullable=True)

    # Location of the electric cabin
    latitude    = db.Column(db.Float, nullable=False)
    longitude   = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return '<HighVoltagePowerCabin %f:%f>' % (self.latitude, self.longitude)
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': 'Power Cabin',
            'color': '#3b82f6',
            'lat': self.latitude,
            'lng': self.longitude,
            'size': 0.0221152,
            'radius': 0.04,
            'voltage': 'HIGH',
        }


class LowVoltagePowerCabin(Base):
    __tablename__ = 'low_voltage_power_cabins'

    # Information of the cabin
    name        = db.Column(db.String(128), nullable=True)

    # Location of the electric cabin
    latitude    = db.Column(db.Float, nullable=False)
    longitude   = db.Column(db.Float, nullable=False)

    # Source power cabin
    power_cabin = db.Column(db.Integer, db.ForeignKey('high_voltage_power_cabins.id'), nullable=False)


    def __repr__(self):
        return '<LowVoltagePowerCabin %f:%f>' % (self.latitude, self.longitude)
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': 'Power Cabin',
            'color': '#1d4ed8',
            'lat': self.latitude,
            'lng': self.longitude,
            'size': 0.0221152,
            'radius': 0.04,
            'voltage': 'LOW',
            # 'source': HighVoltagePowerCabin.query.get(self.power_cabin).
        }


class PowerLine(Base):
    __tablename__ = 'power_lines'

    # Information of the power line
    line_name   = db.Column(db.String(128), nullable=True)
    line_type   = db.Column(db.Integer, db.ForeignKey('power_line_categories.id'), nullable=False)

    # Path of the electric line
    source      = db.Column(db.Integer, db.ForeignKey('power_plants.id'), nullable=False)
    destination = db.Column(db.Integer, db.ForeignKey('high_voltage_power_cabins.id'), nullable=False)

    # Method to calculate the path.
    def calculateRoute(self):
        routes = []
        origin = PowerPlant.query.get(self.source)
        destination = HighVoltagePowerCabin.query.get(self.destination)

        # This is the start (the power plant)
        routes.append([origin.latitude, origin.longitude])

        first_item = None
        while True:
            foobar = Pylon1_Pylon2.query.filter_by(
                line = self.id,
                pylon1 = first_item
            )

            if foobar.count() == 0:
                break

            pylon_data = Pylon.query.get(foobar.first().pylon2)
            if pylon_data is None:
                break

            routes.append([pylon_data.latitude, pylon_data.longitude])
            first_item = pylon_data.id

        # This is the end (the power cabin)
        routes.append([destination.latitude, destination.longitude])

        # Return the calculated routes.
        return routes

    def __repr__(self):
        return '<PowerLine %f:%f>' % (self.source, self.destination)

    def toApiData(self):
        return {
            'coords': self.calculateRoute(),
            'properties': {
                'id': self.id,
                'name': self.line_name,
                'color': 'Purple',
                'type': 'Power Line',
            }
        }


class Pylon1_Pylon2(Base):
    __tablename__ = 'pylon1_pylon2'

    line   = db.Column(db.Integer, db.ForeignKey('power_lines.id'), nullable=False)
    pylon1 = db.Column(db.Integer, db.ForeignKey('pylons.id'), nullable=True)
    pylon2 = db.Column(db.Integer, db.ForeignKey('pylons.id'), nullable=True)

    def __repr__(self) -> str:
        return '<PylonConnection from %d to %d>' % (self.pylon1 or 0, self.pylon2 or 0)


# User informations
class Customer(Base):
    __tablename__ = 'customers'

    # Informations about the customer.
    name = db.Column(db.String(64), nullable=False)
    surname = db.Column(db.String(128), nullable=False)
    birthdate = db.Column(db.DateTime, nullable=False)
    fiscal_code = db.Column(db.String(16), nullable=False)
    pec = db.Column(db.String(300), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)

    def __repr__(self) -> str:
        return '<Customer@%d %s %s>' % (self.id, self.name, self.surname)

    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'birthdate': self.birthdate,
            'fiscal_code': self.fiscal_code,
            'pec': self.pec,
            'phone_number': self.phone_number
        }


class Residence(Base):
    __tablename__ = 'residences'

    # Information
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    # Relationships
    owner = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    power_cabin = db.Column(db.Integer, db.ForeignKey('low_voltage_power_cabins.id'), nullable=False)
    
    def __repr__(self) -> str:
        return '<Residence %d of %s at %f:%f>' % (self.id, repr(Customer.query.get(self.owner)), self.latitude, self.longitude)
    
    def toApiData(self):
        return {
            'id': self.id,
            'owner': Customer.query.get(self.owner).toApiData(),
            'location': [self.latitude, self.longitude],
            'cabin': LowVoltagePowerCabin.query.get(self.power_cabin).toApiData()
        }


class Bill(Base):
    __tablename__ = 'bills'

    # Information
    consumption = db.Column(db.Float, nullable=False)
    paid = db.Column(db.Boolean, default=False)

    # Relationship
    residence = db.Column(db.Integer, db.ForeignKey('residences.id'))

    def __repr__(self) -> str:
        return '<Bill %d to %s>' % (self.id, repr(Residence.query.get(self.residence)))


class Ticket(Base):
    __tablename__ = 'tickets'

    # Information
    subject = db.Column(db.String(128), nullable=False)
    message = db.Column(db.String(8192), nullable=False)
    solved  = db.Column(db.Boolean, default=False)

    # Relationships
    customer = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    staff    = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=True)

    def __repr__(self) -> str:
        return '<Ticket id=%d solved=%s>' % (self.id, self.solved)


## Redundancy deleetus
class PowerPlantCategory(Base):
    __tablename__ = 'power_plant_categories'

    # Information about the category
    name        = db.Column(db.String(127), nullable=False)
    description = db.Column(db.String(4096), nullable=False)

    def __repr__(self):
        return '<PowerPlantCategory %s>' % self.name
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name
        }


class PylonCategory(Base):
    __tablename__ = 'pylon_categories'

    # Information about the category
    name        = db.Column(db.String(127), nullable=False)
    description = db.Column(db.String(4096), nullable=False)

    def __repr__(self):
        return '<PylonCategory %s>' % self.name

    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name
        }


class PowerLineCategory(Base):
    __tablename__ = 'power_line_categories'

    # Categories:
    # - Bassa Tensione
    # - Media Tensione
    # Information about the category
    name        = db.Column(db.String(127), nullable=False)
    description = db.Column(db.String(4096), nullable=False)

    def __repr__(self):
        return '<PowerLineCategory %s>' % self.name
    
    def toApiData(self):
        return {
            'id': self.id,
            'name': self.name
        }