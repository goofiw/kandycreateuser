'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
  First:  String,
  Last: String,
  Email:   {type: String, unique: true},
  Slack: String,
  Mobile: String,
  Company: String
});

memberSchema.statics.addMembers = function(members) {
  for(let i = 0; i < members.length; i++) {
    this.create(members[i], function (err, obj) {
      if (err) {
        return console.log(err);
      }
      console.log('member added', obj)
    });
  }
}
module.exports = mongoose.model('Member', memberSchema);