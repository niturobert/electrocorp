from app import app, db
from flask import redirect, request, session, jsonify, g
import models
import jwt


@app.before_request
def authorization_filter():
    try:
        token = request.get_json(force=True).get('token', None)
        g.data = None

        if token is not None:
            try:
                g.data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

            except Exception as e:
                return jsonify({'message': str(e)}), 401
        
        # else:
        #     g.data = {
        #         'id': 0,
        #         'role': 0
        #     }
            
    except Exception as e:
        print('Error in authorization_filter')


@app.after_request
def set_headers_cors(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Headers'] = '*'
    return response