//loads up the depenencies
var express = require("express");

//starts up the express server
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//setting up routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});