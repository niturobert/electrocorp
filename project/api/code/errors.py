import json

from app import app, db
from flask import abort, jsonify, request, g
import models


@app.errorhandler(404)
def error_404(e):
    return jsonify({
        'error': 'Not found'
    }), 404




@app.errorhandler(405)
def error_500(e):
    return jsonify({
        'error': 'Method not allowed'
    }), 405



@app.errorhandler(500)
def error_500(e):
    return jsonify({
        'error': 'Internal Server Error'
    }), 500