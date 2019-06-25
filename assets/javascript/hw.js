// ### Instructions

// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

const topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// $(document).ready(function(){
const animalSection = $("#animalSection");
for (let j = 0; j < topics.length; j++) {
    const newButton = $("<button>" + topics[j] + "</button>");
    newButton.attr("animalNameid", topics[j]);
    animalSection.append(newButton);
    newButton.addClass("renderedButtons");
};

// })

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

$("#search").on("click", function () {
    let formInput = $("#searchTerm").val().trim();
    let button2 = $("<button>").text(formInput);
    button2.attr("animalNameid", formInput);
    animalSection.append(button2);
    $("#searchTerm").val("");
    button2.addClass("renderedButtons");
});

$(document).on("click", ".renderedButtons", function () {
    // const animal = $(this).attr("animalNameid")
    const animal = $(this).text()
        ;

    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=EgokgU7ir5J9Osyc9N0YWwM8HVBRL5Ka&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    
// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

        const results = response.data;
        for (let i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                const gifDiv = $("<div>");
                const rating = results[i].rating;
                const p = $("<p>").text("Rating:" + rating);
                const animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.addClass("gif");

                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("src", results[i].images.fixed_height_still.url);
               animalImage.attr("data-state", "still");

                gifDiv.append(p);
                gifDiv.append(animalImage);
                $("#gifs-appear-here").prepend(gifDiv);
                

                
            }
        }
        console.log(response);
    });

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    $(document).on("click", ".gif", function () {
        const state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});

