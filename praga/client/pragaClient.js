#!/usr/bin/env node



	var os = require("os")
	const io = require("socket.io-client")
	var socket = io.connect('http://dev1:3000')


	//buttons and inputs
	var message = "version:" + process.argv[2]
	var host = os.hostname();
	var count=0;

	//Emit a username
	socket.emit('message', {message : message })

	socket.on("sairagora", (data) => {
      	 console.log( data );
		 socket.emit("repete", { message: 'instalado' } );
	     socket.disconnect();
     })

	socket.on("admin", (data) => {
    	 console.log("ADMIN: " + data.username + ": " + data.message )
     })

	socket.on("message", (data) => {
		// console.log("#: " + data.message + ": " + data.hostname )
		 socket.emit("repete", { message: 'repete' } );
		 socket.emit("message", { message: 'repete' } );
     })

	socket.on("repete", (data) => {
		//	console.log("#: " + data.message + ": " + data )
		 socket.emit("repete", { message: 'instalado' } );
     })

	socket.on("inicia", (data) => {
			console.log("► inicia (" + data + ") "   );
			while(true){
				 socket.emit("message", { message: 'instalado' } );
			}
     })


