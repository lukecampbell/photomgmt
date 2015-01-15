from flask import Flask, jsonify, request, render_template
from flask.ext.restless import APIManager

app = Flask('photomgmt', static_url_path='')

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

from photomgmt.model import db, Photo

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sbadmin')
def sbadmin():
    return render_template('sbadmin.html')

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Photo, methods=['GET', 'POST', 'PUT', 'DELETE'])

def initialize_db():
    from photomgmt.model import db
    db.drop_all()
    db.create_all()

