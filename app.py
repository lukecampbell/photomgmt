from flask.ext.restless import APIManager
from photomgmt import app, initialize_db

import argparse

def main(args):
    if args.create:
        return initialize_db()
    else:
        app.run(debug=True)


if __name__ == '__main__':

    parser = argparse.ArgumentParser('Application')
    parser.add_argument('-c', '--create', action='store_true', help='Create tables')
    args = parser.parse_args()
    main(args)

