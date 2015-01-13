from flask import Flask, jsonify, request
from flask.ext.restless import APIManager

import argparse

app = Flask('photomgmt', static_url_path='')

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'



def initialize_api():
    from model import db
    from model.photo import Photo
    manager = APIManager(app, flask_sqlalchemy_db=db)
    manager.create_api(Photo, methods=['GET', 'POST', 'DELETE'])

def initialize_db():
    from model import db
    from model.photo import Photo
    db.create_all()


@app.route('/')
def index():
    return app.send_static_file('index.html')


def main(args):
    if args.create:
        initialize_db()
    else:
        initialize_api()
        app.run(debug=True)


if __name__ == '__main__':

    parser = argparse.ArgumentParser('Application')
    parser.add_argument('-c', '--create', action='store_true', help='Create tables')
    args = parser.parse_args()
    main(args)

