import json

from app import app, db
from flask import abort, jsonify, request, g
import models
import jwt
import traceback


# Simple endpoint for testing stuff
@app.route('/test', methods=['POST'])
def test():
    return jsonify({
        'context': g.data,
        'full_context': dir(g),
    })

# Authentication endpoint.
@app.route('/login/employee', methods=['POST'])
def login():
    error = None
    data = None
    try:
        l33t = request.get_json(force=True)

        user = models.Employee.authenticate(l33t.get('username', None), l33t.get('password', None), l33t.get('frame', ''))
        data = jwt.encode({'id': user.id, 'role': user.role}, app.config['SECRET_KEY'], algorithm='HS256')
        response = jsonify({
            'error': None,
            'data': data
        })
        response.set_cookie('token', data)
        return response


    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        })


# Power Plant endpoints.
@app.route('/power_plant/all', methods=['POST'])
def read_all_power_plants():
    data = []
    checked = check_authorization([1])
    if checked is not None:
        return checked

    for x in models.PowerPlant.query.all():
        data.append(x.toApiData())
    
    return jsonify({
        'error': None,
        'data': data,
    }), 200



@app.route('/power_plant/categories', methods=['GET'])
def get_power_plant_categories():
    # It does NOT require privileges to access this data.
    data = []
    for x in models.PowerPlantCategory.query.all():
        data.append(x.toApiData())
    
    return jsonify({
        'data': data
    })


@app.route('/power_plant/create', methods=['POST'])
def create_power_plant():
    error = None
    status = 200
    checked = check_authorization([1])
    if checked is not None: return checked
    
    data = request.get_json(force=True)
    try:
        foobar = models.PowerPlant(
            name=data['name'],
            description=data['desc'],
            category=int(data['cat']),
            latitude=float(data['lat']),
            longitude=float(data['lng'])
        )
        db.session.add(foobar)
        db.session.commit()

    except Exception as e:
        status = 400
        error = str(e)

    finally:
        return jsonify({
            "error": error
        }), status


@app.route('/power_plant/<int:id>/read', methods=['POST'])
def read_power_plant_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.PowerPlant.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/power_plant/<int:id>/update', methods=['POST'])
def update_power_plant_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.PowerPlant.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/power_plant/<int:id>/delete', methods=['POST'])
def delete_power_plant_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        foo = models.PowerPlant.query.get(id)
        db.session.delete(foo)
        db.session.commit()
        return jsonify({
            'error': None,
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 404



# Power Cabin endpoints
@app.route('/power_cabin/all', methods=['POST'])
def read_all_power_cabins():
    # checked = check_authorization([1])
    # if checked is not None:
    #     return checked

    data = []
    for x in models.HighVoltagePowerCabin.query.all():
        data.append(x.toApiData())

    for x in models.LowVoltagePowerCabin.query.all():
        data.append(x.toApiData())

    return jsonify({
        'error': None,
        'data': data,
    }), 200


# @app.route('/power_cabin/categories', methods=['GET'])
# def get_power_cabin_categories():
#     # It does NOT require privileges to access this data.
#     data = []
#     for x in models.HighVoltagePowerCabinCategory.query.all():
#         data.append(x.toApiData())
    
#     return jsonify({
#         'data': data
#     })


@app.route('/power_cabin/<int:id>/read', methods=['POST'])
def read_power_cabin_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.HighVoltagePowerCabin.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/power_cabin/<int:id>/update', methods=['POST'])
def update_power_cabin_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.HighVoltagePowerCabin.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/power_cabin/<int:id>/delete', methods=['POST'])
def delete_power_cabin_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        foo = models.HighVoltagePowerCabin.query.get(id)
        db.session.delete(foo)
        db.session.commit()
        return jsonify({
            'error': None,
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 404



# Pylon endpoints
@app.route('/pylon/all', methods=['POST'])
def read_all_pylons():
    checked = check_authorization([1])
    if checked is not None:
        return checked

    data = []
    for x in models.Pylon.query.all():
        print(x)
        data.append(x.toApiData())

    return jsonify({
        'error': None,
        'data': data,
    }), 200


@app.route('/pylon/categories', methods=['GET'])
def get_pylon_categories():
    # It does NOT require privileges to access this data.
    data = []
    for x in models.PylonCategory.query.all():
        data.append(x.toApiData())
    
    return jsonify({
        'data': data
    })


@app.route('/pylon/create', methods=['POST'])
def add_pylon_to_database():
    error = None
    status = 200
    checked = check_authorization([1])
    if checked is not None: return checked
    
    data = request.get_json(force=True)
    try:
        foobar = models.Pylon(
            name=data['name'],
            category=int(data['cat']),
            latitude=float(data['lat']),
            longitude=float(data['lng'])
        )
        db.session.add(foobar)
        db.session.commit()

    except Exception as e:
        status = 400
        error = str(e)

    finally:
        return jsonify({
            "error": error
        }), status



@app.route('/pylon/<int:id>/read', methods=['POST'])
def read_pylon_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.Pylon.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/pylon/<int:id>/update', methods=['POST'])
def update_pylon_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        return jsonify({
            'error': None,
            'data': models.Pylon.query.get(id).toApiData()
        }), 200

    except Exception as e:
        return jsonify({
            'error': str(e),
            'data': None
        }), 404


@app.route('/pylon/<int:id>/delete', methods=['POST'])
def delete_pylon_by(id: int):
    checked = check_authorization([1])
    if checked is not None:
        return checked

    try:
        foo = models.Pylon.query.get(id)
        db.session.delete(foo)
        db.session.commit()
        return jsonify({
            'error': None,
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 404
    

# Power Line endpoints.
@app.route('/power_line/all', methods=['POST'])
def read_all_power_lines():
    error = None
    data = []
    # checked = check_authorization([1])
    # if checked is not None:
        # return checked

    try:
        data = []
        for x in models.PowerLine.query.all():
            data.append(x.toApiData())
        
        for line in models.PowerLine.query.all():
            data.append(line.toApiData())

    except Exception as e:
        error = str(traceback.print_exc())
        data = []
    
    finally:        
        return jsonify({
            'error': error,
            'data': data,
        }), 200


@app.route('/power_line/categories', methods=['GET'])
def get_power_line_categories():
    data = []
    for x in models.PowerLineCategory.query.all():
        data.append(x.toApiData())
    
    return jsonify({
        'data': data
    }), 200


# Users endpoint
@app.route('/user/all', methods=['POST'])
def get_users():
    checked = check_authorization([1])
    if checked is not None:
        return checked
    
    data = []
    for x in models.Employee.query.all():
        data.append(x.toApiData())
    
    return jsonify({
        'error': None,
        'data': data
    })


# Useful functions
def check_authorization(user_roles):
    if g.data == None or g.data.get('role', None) not in user_roles:
        return jsonify({
            'error': 'Unauthorized',
            'data': str(g.data),
        }), 401
    
    return None
