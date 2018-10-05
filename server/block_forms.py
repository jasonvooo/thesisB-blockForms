#!/usr/bin/env python3

# Jason Vo z5075551

import json
import operator
from datetime import datetime

import requests
from bson import ObjectId, json_util
from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource, fields
from pymongo import MongoClient

app = Flask(__name__)
api = Api(app, version='1.0', title='Block Forms', description='Thesis B z5075551 Jason Vo')
CORS(app)

parser = api.parser()

client = MongoClient(host='mongodb://jasonvo:Cere590!@ds111113.mlab.com:11113/thesisb-blockforms')
db = client['thesisb-blockforms']

def parseDateFromId(id):
    return datetime.strftime(ObjectId(id).generation_time, '%Y-%m-%dT%H:%M:%S.000Z')

# USERS
registration_fields = api.model('users', {
    'address': fields.String,
    'name': fields.String,
    'password': fields.String,
    'contractAddress': fields.String
})

@api.route('/register')
@api.expect(registration_fields)
class register(Resource):

    def post(self):
        payload = request.get_json(force=True)

        user = json_util.loads(json_util.dumps(db.users.find_one({'address': payload.get('address')})))

        if user:
            return {'message': 'Address is already registered'}, 400

        user_id = db.users.insert({
            'address': payload.get('address'),
            'name': payload.get('name'),
            'password': payload.get('password'),
            'contractAddress': payload.get('contractAddress')
        })

        return {'address': payload.get('address'), 'name': payload.get('name')}, 201


login_fields = api.model('login', {
    'password': fields.String
})

@api.route('/login/<addr>', methods=['POST'])
@api.expect(login_fields)
class login(Resource):

    def post(self, addr):
        payload = request.get_json(force=True)

        user = json_util.loads(json_util.dumps(db.users.find_one({'address': addr})))
        if user is None:
            return {'message': 'Invalid Error'}, 400

        if payload.get('password') == user['password']:
            return {'address': addr, 'name': user['name'], 'contractAddress': user['contractAddress']}, 200
        else:
            return {'message': 'Password is incorrect'}, 422


# patch_user_fields = api.model('user', {
#     'contractAddress': fields.String
# })
# @api.route('/user/<addr>', methods=['GET', 'PATCH'])
# class user(Resource):
#
#     @api.expect(patch_user_fields)
#     def patch(self, addr):
#         payload = request.get_json(force=True)
#         db.users.update_one(
#            { 'address': addr },
#            { '$set':
#               {
#                 contractAddress: payload.get('contractAddress')
#               }
#            }
#         )
#
#         return {'message': 'Success'}, 200



# FORMS
form_fields = api.model('forms', {
    'owner': fields.String,
    'schema': fields.Raw
})

@api.route('/forms')
class forms(Resource):

    # Get list of indicators
    def get(self):
        owner = str(request.args.get('owner'))
        return get_forms(owner)

    # Post expects indicator_id field to be set
    @api.expect(form_fields)
    def post(self):
        payload = request.get_json(force=True)
        return post_forms(payload.get('owner'), payload.get('schema'))


def get_forms(owner):

    if owner is None:
        return {'message': 'Owner Param is none'}, 400

    data = json_util.loads(json_util.dumps(db.forms.find({
        'owner': owner
    })))

    transformed = []
    for x in data:
        transformed.append({
            '_id': str(x['_id']),
            'schema': x['schema'],
            'responses': x['responses'],
            'creationTime': parseDateFromId(x['_id'])
        })

    return transformed, 200

def post_forms(owner, schema):

    if schema is None:
        return {'message': 'Schemas is Null'}, 400

    form_id = db.forms.insert({
        'owner': owner,
        'schema': schema,
        'responses': []
    })

    return {'id': str(form_id)}, 201

# def add_response():


@api.route('/forms/<id>')
class formsId(Resource):
    # Get list of indicators
    def get(self, id):
        owner = str(request.args.get('owner'))

        if owner is None:
            return {'message': 'Owner Param is none'}, 400

        return get_form_id(id)

def get_form_id(id):

    print(id)
    data = json_util.loads(json_util.dumps(db.forms.find_one({'_id': ObjectId(id)})))

    if data is None:
        return { 'message': 'NotFound' }, 404

    return {
        '_id': str(data['_id']),
        'schema': data['schema'],
        'responses': data['responses'],
        'creationTime': parseDateFromId(data['_id'])
    }, 200


def build_response():

    return {
        '_id': ObjectId(),
        'user': '',
        'response': ''
    }

if __name__ == '__main__':
    app.run(debug=True)
