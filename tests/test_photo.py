from unittest import TestCase
import photomgmt
import json

class TestPhoto(TestCase):
    def setUp(self):
        photomgmt.app.config['TESTING'] = True
        photomgmt.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/testing.db'
        from photomgmt.model import db
        db.session.close()
        db.drop_all()
        db.create_all()
        self.app = photomgmt.app.test_client()

    def test_crud(self):
        rv = self.app.get('/api/photo')
        expected = {
            'num_results': 0,
            'objects': [ ],
            'page': 1,
            'total_pages': 0
        }
        received = json.loads(rv.data)
        assert expected == received

        rv = self.app.post('/api/photo', content_type='application/json', data=json.dumps({'title' : 'sample photo', 'date' : '2012-01-01T00:00:00'}))
        received = json.loads(rv.data)
        assert 'id' in received

        rv = self.app.get('/api/photo')
        received = json.loads(rv.data)
        assert received['num_results'] == 1
        assert received['objects'][0]['title'] == 'sample photo'
        assert received['objects'][0]['id'] == 1

        rv = self.app.put('/api/photo/1', content_type='application/json', data=json.dumps({'title' : 'new title'}))
        received = json.loads(rv.data)
        assert received['id'] == 1
        assert received['title'] == 'new title'

        rv = self.app.get('/api/photo')
        received = json.loads(rv.data)
        assert received['num_results'] == 1
        assert received['objects'][0]['title'] == 'new title'
        assert received['objects'][0]['id'] == 1

        rv = self.app.delete('/api/photo/1')
        assert rv.status_code == 204

        rv = self.app.get('/api/photo')
        received = json.loads(rv.data)
        assert received['num_results'] == 0
        
