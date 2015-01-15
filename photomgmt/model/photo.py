from photomgmt.model import db

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode)
    date = db.Column(db.DateTime)
    res_x = db.Column(db.Float)
    res_y = db.Column(db.Float)
    file_type = db.Column(db.Unicode)
    exif_iso = db.Column(db.Integer)
    exif_shutter_speed = db.Column(db.Unicode)
    exif_aperture = db.Column(db.Unicode)


