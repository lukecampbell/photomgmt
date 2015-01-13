from photomgmt.model import db

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode)
    date = db.Column(db.DateTime)

