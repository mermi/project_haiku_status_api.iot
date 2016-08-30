//'use strict';
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var Metrics = require('cd-metrics');
var api = {
  status: require('./api/status'),
  slots: require('./api/slots'),
  message: require('./api/message'),
  details: require('./api/details'),
  user: require('./models/user')
};

var app = express();
var config = {
  port: process.env.PORT || 3000
};

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://localhost/haiku');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Haiku database with Mongoose");
});

app.get('/user/:id/status', api.status.getStatus);
app.put('/user/:id/status', api.status.updateStatus);
app.get('/user/:id/message', api.message.getMessage);
app.put('/user/:id/message', api.message.updateMessage);
app.get('/user/:id/slots', api.slots.getSlots);
app.get('/user/:id/details', api.details.getDetails);

app.listen(config.port, function () {
  console.log('Status app listening on port ' + config.port + '!');
  recordInitialMetrics(api.status.getStatus,api.status.getMessage,api.status.getSlots,1);
});
var options = {
            locale: 'locale',
            os: 'osx',
            os_version: 'elcapitan',
            device: 'pc',
            app_name: 'haiku-status',
            app_version: '0.1',
            app_update_channel: 'develop',
            app_build_id: '0.1',
            app_platform: 'node',
            arch: 'x64',
            logger: logger
    };
    this.metrics = new Metrics(this.clientId,this.options);

recordInitialMetrics : function(category, action, label, value){
      this.metrics.recordEventAsync("status_api", "startup", api.status.getStatus, 1);
      this.metrics.recordEventAsync("status_api", "startup", api.status.getMessage, 1);
      this.metrics.recordEventAsync("status_api", "startup", api.status.getSlots, 1);
}
