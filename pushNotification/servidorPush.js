#!/usr/bin/env node

const express = require('express')
const app = express()
const {exec} = require('child_process');
var count;
count=0;


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
//	console.log('New user connected')
//	console.log("Conn.ID: " + socket.client.conn.id + "(" + socket.client.conn.remoteAddress + ")" )

	//default username
	socket.username = "Server"

    //listen on new_message
    socket.on('message', (data) => {
			comando = "rafael";
		    exec ('hostname;uptime', (err,stdout,stderr) => {
					socket.emit('sair', {message : count, username : stdout});
			});
	        socket.emit('message', { message: data.message});
		  	console.log("# "+ (count+=1));
    })

	socket.on('sair', (data) => {
        //broadcast the new message
        socket.emit('sair', {count });
    })

	socket.on('repete', (data) => {
        socket.emit('message', {message : 'oi' , username : socket.username});
	    //console.log("# "+ data.message );
    })

})
