#!/usr/bin/env node

	var os = require("os")
	const io = require("socket.io-client")
	const { spawn } = require('child_process');

	var socket = io.connect('http://servidorpush:3000')

	//buttons and inputs
	var message = "SHELL"
	var username = "cdshell"
	var send_message = "send_message"
	var send_username = "#send_username"
	var chatroom = "#chatroom"
	var feedback = "#feedback"

	//Emit message
		socket.emit('message', {message : message })

	//Listen on new_message
	socket.on("message", (data) => {
        var version = ""
		console.log("message: " + data.username + ": " + data.message )
		if ( data.message != version) { 
			const { exec } = require('child_process');
			exec('cd /root/shell ; git pull ; nohup  /root/shell/push-install.sh &', (err, stdout, stderr) => {
				console.log("Instalado com sucesso: " + data.message);
//				socket.disconnect();
			});
			console.log("Conectado no servidor...");
		}
	})
	socket.on("username", (data) => {
		console.log("username: " + data.username )
		
	})


	//Emit a username
		socket.emit('username', {username : socket.username }) 



