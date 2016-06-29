"use strict";

var PhotoModel = Backbone.Model.extend({
  urlRoot: '/api/photo',
  defaults: {
    title: '',
    date: '',
    res_x: 0.0,
    res_y: 0.0,
    file_type: "",
    exif_iso: 0,
    exif_shutter_speed: "",
    exif_aperture: ""
  }
  /* TODO: add validation for the fields */
});

var Photos = Backbone.Collection.extend({
    model: PhotoModel,
    url: '/api/photo'
});

var PhotoView = Backbone.View.extend({
  el: $('#photo-view'),
  events: {
    'click button#photoSubmit' : 'submit',
    'change input'             : 'inputChanged',
    'change select'            : 'inputChanged'
  },
  initialize: function() {
    // the following functions will be bound to "this"
    _.bindAll(this, "render", "submit", "inputChanged");
    this.model = new PhotoModel();
    this.render();
  },
  /*
   * the template accepts a parameter "fields", each field needs
   * to declare an id that binds to the model attribute, a fieldType (text|date)
   * and the placeHolder value
   */
  template: JST['photomgmt/static/partials/photo_edit.html'],
  render: function() {
    this.$el.html(this.template({
      fields: [
        {"id":"title", "fieldType" : "text", "name":"Photo Title", "placeHolder": "My vacation"},
        {"id":"date",  "fieldType" : "date", "name" : "Date", "placeHolder" : "2012-10-01"},
        {"id":"res_x", "fieldType" : "text", "name" : "Resolution-X", "placeHolder" : "4000"},
        {"id":"res_y", "fieldType" : "text", "name" : "Resolution-Y", "placeHolder" : "6000"},
        {"id":"file_type", "fieldType" : "text", "name" : "File-Type", "placeHolder":"JPEG"},
      ]
    })); 
  },
  /*
   * When the submit button is clicked, the model is saved and the form is cleared
   */
  submit: function(e) {
    e.preventDefault();
    this.model.save(this.model.toJSON(), {
      error: function(model, response) {
        console.error("WHAT");
        console.log(response);
      }
    });
    $(e.target).closest('form').find("input, textarea").val("");
    this.model = new PhotoModel();
  },
  /*
   * When any form element is edited, the model is immiately updated.
   */
  inputChanged: function(evt) {
    var changed = evt.currentTarget;
    var value = $(evt.currentTarget).val();
    var obj = {};
    obj[changed.id] = value;
    this.model.set(obj);
  }
});

