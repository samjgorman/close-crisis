
//This is a deprecated route that sends a request to Twilio to send a text message.
//Use as an example of how we structure routes.  
//We could put as many GET POST etc requests as we want here that have to do with this route.

var express = require('express');
var router = express.Router();

/* POST twilio listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
  
  var phoneNumber = req.body.phone;
  const accountSid = "AC96e64e43861012e0814671a37a765177";
  const authToken = '98851889e69f6aa71dde580aa547792e';
  const client = require('twilio')(accountSid, authToken);
  client.messages
  .create({
      body: 'itms-services://?action=download-manifest&amp;url=https://closecrisis.com/close.plist',
      from: '+18184059863',
      to: phoneNumber
  })
  .then(message => console.log(message.sid));
  
});


module.exports = router;
