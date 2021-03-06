var clientId="822597338978-18vf2ntq66tn3bvvl1i823tvfu5ag92c.apps.googleusercontent.com";
var apiKey="AIzaSyCRPjg2VZo2ecyVAvk8GybFpWOaAstUbEU";

function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(apiKey);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
  

function getSubscriptions() {
    var channelTitle = null;
    var channelID = null;
    var flag = 0;
    var itemArray = null;
    return gapi.client.youtube.subscriptions.list({
        "part": [
        "id",
        "snippet"
      ],
        "maxResults": 50,
        "mine": true
      })
      .then(function(response) {
          itemArray = response.result.items;
          for (let i = 0; i < itemArray.length; i++) {
            channelTitle = itemArray[i].snippet.title;
            channelID = itemArray[i].snippet.resourceId.channelId;
            console.log("Name", channelTitle);
            console.log("ID", channelID);
            //channelArray();
          }

          // Handle the results here (response.result has the parsed body).
        },
        function(err) { console.error("Execute error", err); });
}

//====================Get channel details by ID===============================================

function channelDetails(cId) {
  return gapi.client.youtube.channels.list({
    "part": [
      "snippet,contentDetails,statistics"
    ],
    "id": [
      cId
    ]
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              //console.log("Response", response);
              var items=response.result.items[0];
              var url=items.snippet.customUrl;
              var id=items.id;
              var title=items.snippet.title;
              var description=items.snippet.description;
              var publishedAt=items.snippet.publishedAt;
              var thumbnail=items.snippet.thumbnails.high.url;
              var country=items.snippet.country;
              var uploads =items.contentDetails.relatedPlaylists.uploads;
              var viewCount=items.statistics.viewCount;
              var subscriberCount=items.statistics.subscriberCount;
              var hiddenSubscriberCount=items.statistics.hiddenSubscriberCount;
              var videoCount=items.statistics.videoCount;
              
            },
            function(err) { console.error("Execute error", err); });
}


//===========================Get Comments for a video by Id============================================

function getCommentsForVideo(videoId) {
    return gapi.client.youtube.commentThreads.list({
      "part": [
        "snippet,replies"
      ],
      "videoId": videoId
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: clientId});
  });
  function s(){
    var t="UCNIPltykIATy0PhRp82uNMQ";
    channelDetails(t);
  }
