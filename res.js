'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};

exports.err = function(message, res) {
  var data = {
      'status': 404,
      'message': message
  };
  res.json(data);
  res.end();
};
