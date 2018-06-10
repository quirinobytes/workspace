#!/usr/bin/env node

body = '{"text": "A very important thing has occurred! <https://alert-system.com/alerts/1234|Click here> for details!"}';


bluemoney_channel = 'https://hooks.slack.com/services/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';

if (! process.argv[2] )
	return

else{
	console.log('Enviando mensagem: '+process.argv[2]);
	msg =  process.argv[2];
}


var request = require("request");

var options = { method: 'POST',
  url: bluemoney_channel,
    headers: 
	   { 'Postman-Token': 'ea5ba04e-8fd4-4859-9d0b-e6898b8ccad4',
	        'Cache-Control': 'no-cache' },
			  body: '{"text": "'+msg+'"}' };

			  request(options, function (error, response, body) {
				   if (error) throw new Error(error);

				     console.log(body);
			  });
