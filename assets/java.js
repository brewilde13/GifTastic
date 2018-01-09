$(document).ready(function() {
    var buttonSelection = ["Pork Chop", "Olive", "Chocolate", "Peanut", "Ice Cream", "Cucumber", "Burger"];
    var gifLimit = 10;

    $("select").on('change', function() {
        gifLimit = this.value;
    });

    function addButton(val, all = false) {
        if (all) {
            for (var i = 0; i < buttonSelection.length; i++) {
                $("#foodButtons").append($("<button>").attr({ "class": "btn btn-default custom-btn", "data-name": buttonSelection[i] }).text(buttonSelection[i]));
            }
        }
        if (val !== "") {
            buttonSelection.push(val);
            $("#foodButtons").append($("<button>").attr({ "class": "btn btn-default custom-btn", "data-name": val }).text(val));
        }
    }

    function addGif(rating, url, height) {
        var createDiv = $("<div>").attr({ "class": "col-lg-3 col-md-4 col-sm-4 col-xs-12 gif-container" });
        var thumbNail = $("<div>").attr({ "class": "thumbnail" });
        var createImg = $("<img>").attr({ "src": url }).css("height", height);
        var caption = $("<div>").attr({ "class": "caption" });
        var rating = $("<h2>").text("Rating: " + rating);
        caption.html(rating);
        thumbNail.append(createImg).append(caption);
        createDiv.html(thumbNail);
        $("#food").append(createDiv);
    }

    function callAPI() {
        var q = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            q + "&api_key=oWswWAYc7J2sc9l9yDBjgQkh6fX2WRFg&limit=" + gifLimit;
        $("#food").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                addGif(data[i].rating, data[i].images.fixed_height.url, data[i].images.fixed_height.height);
            }
        });
    }

    $("#addFood").on("click", function() {
        addButton($("#foodInput").val());
        $("#foodInput").val("");
    });

    addButton("", true);
    $(document).on("click", ".custom-btn", callAPI);
});