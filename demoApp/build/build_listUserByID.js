/*
* Checks to see if the projection exists in Photon.
* If not, it will use muon to send the create command to build it
*
* Author: NJW
* Date: 2015-08-10
*/

var muonCore = require("muon-core");
var events = require('events');
var debug = require("debug")("buildProjection");

var eventEmitter = new events.EventEmitter();

// configure app - should be from file or the environment
var myConfig = {};
  myConfig.eventstore = "eventstore";
  myConfig.useport = 3010;

var muonSystem = muonCore.generateMuon();

//Get list of existing projections and add if required
muonSystem.resource.query('muon://'+ myConfig.eventstore +'/projection-keys', function(event, payload) {

  //Project name
  var projName = "UserInfo";

  checkProjection(projName,payload);

});

function checkProjection(projName, payload){

  //Simple flag
  var bProjectionExists = false;

  //extract projection names from payload
  var keyArray = payload['projection-keys'];

  if (keyArray.length > 0) {

    for (var i=0; i<keyArray.length; i++){

      var thisData = keyArray[i];

      debug(thisData);

      //check for matching name
      if (thisData == projName) {

        debug('Found a matching Projection');
        //change flag
        bProjectionExists = true;
        break;
      }
    }
  }

  if (!bProjectionExists) {
    debug('Projection is not defined, so define & build a new projection');

    // Fire the projection_required event
    eventEmitter.emit('projection_required');
  }
  else {
    eventEmitter.emit('finish');
  }
}

buildProjection = function(){

  var projName = "UserInfo";

  //actual projection reduction function
  var projString = "function eventHandler(state, event) {  var user = event.payload.user;  if (!(user.id in state)) {state[user.id] = {};  }  state[user.id].id = user.id;  state[user.id].fullname = user.first + \' \' + user.last;  var username = null;  if(user.last.length > 8) {username = (user.last.substring(0,7) + user.first.charAt(0)).toLowerCase();  }  else {username = (user.last + user.first.charAt(0)).toLowerCase();  }  state[user.id].username = username.replace(\/ \/g,\'\');  state[user.id].first = user.first;  state[user.id].last = user.last;  state[user.id].password = user.password;  return state;}";

  //Define projection
  var projConf = {"projection-name" : projName,
                      "stream-name" : "users" ,
                      "language" : "javascript" ,
                      "initial-value" : '{}' ,
                      "filter" : "",
                      "reduction" : projString};

  //Now send the create projection command to Photon via Muon
  muonSystem.resource.command('muon://' + myConfig.eventstore + '/projections', projConf, function (event, payload){
    // Fire the projection_created event
    eventEmitter.emit('projection_created');
  });

};

eventEmitter.on('projection_required', buildProjection);

eventEmitter.on('projection_created', function(){
   debug('Created new projection');
   eventEmitter.emit('finish');
});

eventEmitter.on('finish', function(){
   debug('Finished');
   process.exit();
});
