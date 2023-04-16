import http from "http";
//import WebSocket from "ws";
import SocketIO from "socket.io";
//import { Server } from "socket.io";
//import { instrument } from "@socket.io/admin-ui"
import express from 'express'

const app = express();

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => res.render("home"))
app.get("/*", (req,res) => res.redirect("/"))

wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    })
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    })
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    })
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    })
});
//const handleListen = () => console.log("Listening on http://localhost:3000");

//const server = http.createServer(app);
//const httpServer = http.createServer(app);
//const wsServer = SocketIO(httpServer);
// const wsServer = new Server(httpServer, {
//     cors: {
//         origin: ["https://admin.socket.io"],
//         credentials: true
//     }
// });

// instrument(wsServer, {
//     auth: false
// })
//const wss = new WebSocket.Server({server});

// function publicRooms(){
//     //const sids = wsServer.sockets.adapter.sids;
//     //const rooms = wsServer.sockets.adapter.rooms;

//     const {
//         sockets: {
//             adapter: {sids, rooms },
//         },
//     } = wsServer;

//     const publicRooms = [];
//     rooms.forEach((_, key) => {
//         if(sids.get(key) === undefined){
//             publicRooms.push(key)
//         }
//     })
//     return publicRooms;
// }

// function countRoom(roomName){
//     return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

//const sockets = [];
// wsServer.on("connection", (socket) => {
//     //console.log(socket);
//     socket["nickname"] = "Anon";
//     socket.onAny((event) => {
//         console.log(wsServer.sockets.adapter);
//         console.log(`Socket Event: ${event}`);
//     })
//     //socket.on("enter_room", (roomName) => console.log(roomName))
//     socket.on("enter_room", (roomName, done) => {
//             done();
//             socket.join(roomName);
           
//             //socket.to(roomName).emit("welcome");
//             socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
//             wsServer.sockets.emit("room_change", publicRooms());
//             // console.log(roomName);
//             // console.log(socket.id);
//             // console.log(socket.rooms);
//             // socket.join(roomName);
//             // console.log(socket.rooms);
//             // setTimeout(() => {
//             //     done();
//             // }, 5000);
//         });
//     socket.on("disconnecting", () => {
//         socket.rooms.forEach((room) =>
//                 socket.to(room).emit("bye", socket.nickname, countRoom(room)-1)
//             )
//     })
//     socket.on("disconnect", () => {
//         wsServer.sockets.emit("room_change", publicRooms())
//     })
//     socket.on("new_message", (msg, room, done) => {
//         //socket.to(room).emit("new_message", msg);
//         socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//         done();
//     })
//     socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });

const handleListen = () => console.log("Listening on http://localhost:3000")
httpServer.listen(3000, handleListen);