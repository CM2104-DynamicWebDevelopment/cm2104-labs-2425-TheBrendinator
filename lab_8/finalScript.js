$(function(){
    alert("document ready");

    $('#searchform').submit(function(){
        //get current value and add to items list
        var searchterms = $("#searchterms").val();
        //call our search youtube function
        getResultsFromOMDB(searchterms);
        return false;
    });
});

function getResultsFromOMDB(searchterms) {
    //call youtube API using AJAX
    //build url for the request
    var url = "http://www.omdbapi.com/?apikey=bc342de&type=movie&s=" + searchterms;
    //use jquery json shortcut
    $.getJSON(url, function(jsondata) {
        //handle the results
        addResultTitles(jsondata);
    });
}

function addResultTitles(jsondata) {
    //create a string to contain our HTML code to inject
    var htmlstring = "";
    //iterate over the collection of results
    for (var i=0; i<10; i++){
        var title = jsondata.Search[i].Title;
        var poster = jsondata.Search[i].Poster;
        var year = jsondata.Search[i].Year;
        var type = jsondata.Search[i].Type;
        var imdbID = jsondata.Search[i].imdbID;
        htmlstring += "<li>" + title + "<ul>";
        htmlstring += "<li>" + poster + "</li>";
        htmlstring += "<li>" + year + "</li>";
        htmlstring += "<li>" + type + "</li>";
        htmlstring += "<li>" + "https://www.imdb.com/title/" + imdbID + "</li>";
        htmlstring += "</ul>" + "</li>";
    }

    //inject the HTML into our empty list
    $("#results").html(htmlstring);
}