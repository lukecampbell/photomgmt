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


var PhotoView = Backbone.View.extend({
  initialize: function(el) {
    this.el = el;
    console.log("initializing");
    _.bindAll(this, "render");
    this.render();
  },
  template: JST['photomgmt/static/partials/photo_edit.html'],
  render: function() {
    console.log("rendering");
    $(this.el).html(this.template({
      fields: [
        {"id":"title", "name":"Photo Title", "placeHolder": "My vacation"}
      ]
    }));
  }
});

