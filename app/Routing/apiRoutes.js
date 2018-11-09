var friendData = require("../data/friend");
var path = require("path");
// exports the information to the be used in our htmlroutes.js file
module.exports = function (app) {

  //simple get to pull all of the information from the api
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  //post route that takes the information gathered in the survey and places that into the json file
  //this is also where the logic is handled for the friend match. this information is used in the survey.html to populate our modal when a new friend is entered.
  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var newFriendScores = newFriend.scores;
    console.log(newFriend);

    // starting variables for the friend match using a larger number for the initial matches
    var totalDiff = 51;
    var matchName = "";
    var matchUrl = "";

    //loops through the friendData json
    for (var i = 0; i < friendData.length; i++) {
      var diff = 0;
      //loops through the scores of each friend and calculates the differences between them and the newly added friend.
      for (var j = 0; j < newFriendScores.length; j++) {
        diff += Math.abs(friendData[i].scores[j] - newFriendScores[j])
      }

      //the matth that determines the match
      if (diff < totalDiff) {
        totalDiff = diff;
        matchName = friendData[i].name;
        matchUrl = friendData[i].photoUrl;
      }
    }

    //pushes the newly added frined into the friend data json
    friendData.push(newFriend);
    
    //sends the match information to the html page so we can populate the modal
    res.json({matchName: matchName, matchUrl: matchUrl});
  });
};
