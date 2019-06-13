// Import express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Import api-router
const routes = require('./routes/routes');
// Import des fichiers de config de la bd
const dbConfig = require('./config/config.js');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const socket = require('socket.io');
// Initialize the app
const app = express();

// our server instance
const server = http.Server(app);

// This creates our socket using the instance of the server
const io = socket(server);
// app.use(passport.initialize());

// const passportMiddleware = require('./middleware/passport');
// passport.use(passportMiddleware);

const config = {
	Origin : "*",
	Methods : 'GET, PUT, POST, DELETE',
	Headers: 'Content-Type, Authorization',
	credentials: true
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Setup server port
const port = process.env.PORT || 8080;

app.use(cors(config));

// Send message for default URL
app.use('/api/', routes);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion :'));

db.once('open', () => {
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Serveur node écoute sur le port : " + port);
});

const PanierCollection = db.collection('recu');
const changeStream = PanierCollection.watch();

changeStream.on('change', (change) => {
  	console.log(change);
});

});

mongoose.Promise = global.Promise;


// Mise en place du Temps réel

io.on("connection", socket => {
	console.log("New client connected" + socket.id);
  console.log(socket);

// Returning the initial data of food menu from FoodItems collection
  socket.on("initial_recu", () => {
    PanierCollection.find({}).then(data => {
      io.sockets.emit("get_recu", data);
      console.log(data);
    });
  });

// Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  socket.on("putOrder", order => {
    collection_foodItems
      .update({ _id: order._id }, { $inc: { ordQty: order.order } })
      .then(updatedDoc => {
        // Emitting event to update the Kitchen opened across the devices with the realtime order values
        io.sockets.emit("change_data");
      });
  });
// Order completion, gets called from /src/main/Kitchen.js
  socket.on("mark_done", id => {
    collection_foodItems
      .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
      .then(updatedDoc => {
        //Updating the different Kitchen area with the current Status.
        io.sockets.emit("change_data");
      });
  });

// Functionality to change the predicted quantity value, called from /src/main/UpdatePredicted.js
  socket.on("ChangePred", predicted_data => {
    collection_foodItems
      .update(
        { _id: predicted_data._id },
        { $set: { predQty: predicted_data.predQty } }
      )
      .then(updatedDoc => {
        // Socket event to update the Predicted quantity across the Kitchen
        io.sockets.emit("change_data");
      });
  });

// disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

