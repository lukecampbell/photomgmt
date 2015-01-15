window.template = function(id) {
  return _.template($('#' + id).html());
};

var PhotoModel = Backbone.Model.extend({
  urlRoot: '/api/photo',
  defaults: {
    title: '',
    date: ''
  }
});

var Photos = Backbone.Collection.extend({
    model: PhotoModel,
    url: '/api/photo'
});


var PhotoView = Backbone.View.extend({
  el: $('#photo-view'),
  events: {
    'click button#photoSubmit' : 'submit',
    'change input' : 'inputChanged',
    'change select' : 'inputChanged'
  },
  initialize: function() {
    console.log("initializing");
    _.bindAll(this, "render", "submit", "inputChanged");
    this.render();
    this.model = new PhotoModel();
  },
  template: JST['photomgmt/static/partials/photo_edit.html'],
  render: function() {
    console.log("rendering");
    this.$el.html(this.template({
      fields: [
        {"id":"title", "name":"Photo Title", "placeHolder": "My vacation"},
        {"id":"date", "name" : "Date", "placeHolder" : "2012-10-01"}
      ]
    })); 
  },
  submit: function(e) {
    e.preventDefault();
    $(e.target).closest('form').find("input[type=text], textarea").val("");
    this.model.save();
    console.log(this.model.toJSON());
    this.model = new PhotoModel();
  },
  inputChanged: function(evt) {
    var changed = evt.currentTarget;
    var value = $(evt.currentTarget).val();
    var obj = {};
    obj[changed.id] = value;
    this.model.set(obj);
  }
});

