//!server file

// import
const express = require("express");
const cors = require("cors");
const socket = require("socket.io"); //importing socket.io
const app = express();
const port = 8000;

require("dotenv").config(); // so we can read the information from the secret key that is on the .env file
// console.log(`secret ${process.env.secret_key}`) //take this out later

const cookieParser = require("cookie-parser"); //so that the server is able to so that the server is able to understand  the cookie info coming from the client browser

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//changing cors()  to
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //credentials == able to get information from a cookie // and  the origin == where are this cookies coming from
app.use(cookieParser());

//import the data base
require("./server/config/prestamos.config");

//import routes
require("./server/routes/user.routes")(app);
require("./server/routes/person.routes")(app);
require("./server/routes/loans.routes")(app);

const server = app.listen(port, () => console.log(`listening on port ${port}`));

//socket.io setup
let connectedUsers = 0;

//initialize socket.io with the express server
const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true,
		allowedHeaders: ["*"],
	},
});
//when a user connects to the server it will console log the socket id and increment the connected users
io.on("connection", (socket) => {
	connectedUsers++;
	console.log(
		`there are ${connectedUsers} connected users  and this is the socket id ${socket.id} of the last one `
	);
	// socket.broadcast.emit("new_connection", {
	// 	msg: `some one new join there are now ${connectedUsers} active}`,
	// });

	//when a user disconnects it will console log the socket id and decrement the connected users
	// socket.on("disconnect", () => {
	// 	connectedUsers--;
	// 	console.log(
	// 		`there are ${connectedUsers} connected users  and this is the socket id ${socket.id} of the last one `
	// 	);
	// socket.broadcast.emit("new_connection", {
	// 	msg: `someone left  there are now ${connectedUsers} active}`,
	// });
	// });
});

//!server file end
