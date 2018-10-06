#!/usr/bin/env python3

# Jason Vo z5075551

import json
import operator
from datetime import datetime

import smtplib
from email.message import EmailMessage

import requests
import os
from bson import ObjectId, json_util
from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource, fields
from pymongo import MongoClient

email_address = os.getenv('BLOCKFORM_GMAIL_ADDRESS', None)
email_password = os.getenv('BLOCKFORM_GMAIL_PASSWORD', None)

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
        responder = str(request.args.get('responder'))

        return get_forms(owner, responder)

    # Post expects indicator_id field to be set
    @api.expect(form_fields)
    def post(self):
        payload = request.get_json(force=True)
        return post_forms(payload)


def get_forms(owner, responder):

    if owner is None and responder is None:
        return {'message': 'Owner or responder Param is none'}, 400

    if owner:
        data = json_util.loads(json_util.dumps(db.forms.find({
            'owner': owner
        })))

    elif responder:
        data = json_util.loads(json_util.dumps(db.forms.find({
            'responses.responder': responder
        }, { 'responses.$':1 } )))


    transformed = []
    for x in data:
        transformed.append({
            '_id': str(x['_id']),
            'name': x['name'],
            'schema': x['schema'],
            'responses': x['responses'],
            'contractAddress': x['contractAddress'],
            'creationTime': parseDateFromId(x['_id'])
        })

    return transformed, 200

def post_forms(payload):

    if payload.get('schema') is None:
        return {'message': 'Schemas is Null'}, 400

    user = json_util.loads(json_util.dumps(db.users.find_one({
        'address': payload.get('owner')}, {'contractAddress': 1}
    )))

    form_id = db.forms.insert({
        'owner': payload.get('owner'),
        'contractAddress': user['contractAddress'],
        'name': str(payload.get('name')).title().replace(' ','-'),
        'schema': payload.get('schema'),
        'responses': []
    })

    return {'id': str(form_id)}, 201


@api.route('/forms/<id>')
class forms_id(Resource):
    # Get list of indicators
    def get(self, id):
        owner = str(request.args.get('owner'))

        if owner is None:
            return {'message': 'Owner Param is none'}, 400

        return get_form_id(id)

def get_form_id(id):

    data = json_util.loads(json_util.dumps(db.forms.find_one({'_id': ObjectId(id)})))

    if data is None:
        return { 'message': 'NotFound' }, 404

    return {
        '_id': str(data['_id']),
        'name': data['name'],
        'schema': data['schema'],
        'responses': data['responses'],
        'contractAddress': data['contractAddress'],
        'creationTime': parseDateFromId(data['_id'])
    }, 200

# https://stackoverflow.com/questions/10147455/how-to-send-an-email-with-gmail-as-provider-using-python
def send_email(form ,to_email, to_address):
    print('Inside send')
    try:
        msg = EmailMessage()
        msg['From'] = email_address
        msg['To'] = to_email
        msg['Subject'] = '''BlockForms: Invitation to %s''' % (form['schema']['schema']['title'])

        body = '''<p>Hey %s!</p>
            <p>
            You have been invited to complete %s
            </p>
            <a href="http://localhost:3000/responder/complete/%s?sender=%s"><button>Complete Form</button></a>
            <p>
                Note you must access the website using metamask and with the wallet below.
                <p>Public Key %s</p>
            </p>
            <br>
            Thanks,<br>
            Block Forms
        ''' % ('Jason', form['schema']['schema']['title'], str(form['_id']), to_address, to_address)

        msg.set_content(body, subtype='html')

        server_ssl = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server_ssl.ehlo() # optional, called by login()
        server_ssl.login(email_address, email_password)
        # ssl server doesn't support or need tls, so don't call server_ssl.starttls()
        server_ssl.send_message(msg)
        #server_ssl.quit()
        server_ssl.close()
        print('successfully sent the mail')
    except:
        print('Error sending mail')

responder_fields = api.model('responder', {
    'responderAddress': fields.String,
    'responderEmail': fields.String
})

@api.route('/forms/<id>/responder')
class forms_id_responder(Resource):
    # Get list of indicators
    @api.expect(responder_fields)
    def post(self, id):
        owner = str(request.args.get('owner'))
        if owner is None:
            return {'message': 'Owner Param is none'}, 400

        payload = request.get_json(force=True)

        return add_responder(id, payload)

def add_responder(id, payload):
    data = json_util.loads(json_util.dumps(db.forms.find_one({'_id': ObjectId(id)})))

    if data is None:
        return { 'message': 'NotFound' }, 404

    for x in data['responses']:
        if x['responder'] == payload.get('responderAddress'):
            return {'message': 'Responder already exists'}, 400

    data['responses'].append({'responder': payload.get('responderAddress'), 'values': []})

    db.forms.update_one(
       { '_id': ObjectId(id) },
       { '$set':
          {
            'responses': data['responses']
          }
       }
    )

    send_email(data, payload.get('responderEmail'), payload.get('responderAddress'))

    return get_form_id(id)

@api.route('/forms/<id>/responder/<addr>/response')
class forms_id_responder_response(Resource):
    # Get list of indicators
    @api.expect(responder_fields)
    def post(self, id, addr):
        payload = request.get_json(force=True)
        return add_response(id, addr, payload)

def add_response(id, addr, payload):
    data = json_util.loads(json_util.dumps(db.forms.find_one({'_id': ObjectId(id)})))

    # TODO need to add validation check possibly signed message
    if data is None:
        return { 'message': 'NotFound' }, 404

    added = False
    for idx, x in enumerate(data['responses']):
        if x['responder'] == addr:
            added = True
            x['values'].append({
                'response': payload.get('response'),
                'tx': payload.get('tx')
            })
            data['responses'][idx] = x
            break

    if not added:
        return {'message': 'Couldn\'t find responder'}, 400

    db.forms.update_one(
       { '_id': ObjectId(id) },
       { '$set':
          {
            'responses': data['responses']
          }
       }
    )

    return get_form_id(id)


def build_response():

    return {
        '_id': ObjectId(),
        'user': '',
        'response': ''
    }

if __name__ == '__main__':

    # send_email('','jasonvo1997@gmail.com', '0x5d145e5dce9032332f392645f21a9e4aae119956')
    app.run(debug=True)
