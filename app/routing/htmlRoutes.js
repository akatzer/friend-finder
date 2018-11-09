// loading up dependencies
var path = require("path");


// exporting for use elsewhere
module.exports = function(app) {

  // html get request based on the path /survey
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

   // catch all in case the path does't match any of our routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};