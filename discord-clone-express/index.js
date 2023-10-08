import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9RExq4HweYqbspxHs_FR7kJI0vCdClJU",
  authDomain: "discord-clone-f1226.firebaseapp.com",
  projectId: "discord-clone-f1226",
  storageBucket: "discord-clone-f1226.appspot.com",
  messagingSenderId: "515118505121",
  appId: "1:515118505121:web:4bf721b69c73d741f8e4e0",
  measurementId: "G-6T7N0D5HLL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const app = express();

app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

app.post("/signIn", (req, res) => {
  console.log("received request");
  signInAnonymously(auth)
    .then(() => {
      console.log("New User signed in anonymously");
      res.status(200).send({ message: "Signed in" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
});

io.on("connection", (socket) => {
  console.log("a user connected with id " + socket.id);

  // manage click event
  socket.on("globalchatsubmithandler", (msg) => {
    console.log(
      "User " +
        msg.userId +
        " sent message " +
        msg.message.text +
        " from socket : " +
        msg.message.socketId
    );

    io.emit("globalchatappend", msg);
  });

  socket.on("disconnect", (msg) => {
    console.log("Disconnedted : message: " + msg);
  });
});

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
