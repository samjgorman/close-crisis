var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.post('/phone', function(req,res){
  var id = req.params.id;
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
