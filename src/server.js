import http from "http";
import WebSocket from "ws";
import express from 'express'

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req,res) => res.render("home"))
app.get("/*", (req,res) => res.redirect("/"))

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
    console.log(socket);
    sockets.push(socket);
    sockets.forEach(aSocket => aSocket.send(`${message}`));
    socket.on("close", () => console.log("Disconnected from Browser"));
    socket.on("message", (message) => {
        //console.log(`${message}`)
        const message = JSON.parse(msg);
        socket.send(`${message}`)
    });
    socket.send("hello!");
})

app.listen(3000, handleListen);