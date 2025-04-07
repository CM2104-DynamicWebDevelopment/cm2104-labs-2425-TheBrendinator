var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi({
  clientId: "4210bee5f9074829af2fb7ba39764e81",
  clientSecret: "36e7027a9013495ab0c533b3fb97fe50",
});

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is" + data.body["access_token"]);

    // Saves the access token
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log(
      "Something went wrong while retrieving an access token",
      err.message,
    );
  },
);

function formatData(track) {
  // Sets up response
  var HTMLResponse = "";
  console.log(track.name);

  HTMLResponse =
    HTMLResponse +
    "<div>" +
    "<h2>" +
    track.name +
    "</h2>" +
    "<h4>" +
    track.artists[0].name +
    "</h4>" +
    "<img src='" +
    track.album.images[0].url +
    "'>" +
    "<a href=#'" +
    track.external_urls.spotify +
    "> Track Details </a>" +
    "</div>";
  return HTMLResponse;
}

async function getTracks(searchterm, res) {
  spotifyApi.searchTracks(searchterm).then(
    function (data) {
      var tracks = data.body.tracks.items;
      var OUTPUT = "";
      for (var i = 0; i < tracks.length; i++) {
        OUTPUT += formatData(tracks[i]);
      }
      res.send(OUTPUT);
    },
    function (err) {
      console.error(err);
    },
  );
}

async function getTopTracks(artist, res) {
  spotifyApi.searchTracks(artist).then(function (data) {
    var artistId = data.body.tracks.items[0].artists[0].id;
    console.log("ARTIST ID:" + artistId);

    spotifyApi.getArtistTopTracks(artistId, "GB").then(
      function (data2) {
        var tracks = data2.body.tracks;
        var OUTPUT = "";
        for (var i = 0; i < tracks.length; i++) {
          OUTPUT += formatData(tracks[i]);
        }
        res.send(OUTPUT);
      },
      function (err) {
        console.log("Something went wrong!", err);
      },
    );
  });
}

app.get("/", function (req, res) {
  res.send("Hello world by express!");
});

app.get("/searchLove", function (req, res) {
  getTracks("love", res);
});

app.post("/search", function (req, res) {
  var searchterm = req.body.searchterm;
  var artisttop = Boolean(req.body.artisttop);
  if (artisttop === true) {
    getTopTracks(searchterm, res);
  } else {
    getTracks(searchterm, res);
  }
});

app.listen(8080);
