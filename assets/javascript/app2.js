$("#submit").on("click", function (e) {
    e.preventDefault();
    var kw = $("#search").val();
    console.log(kw);
    
var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + kw + "&inputtype=textquery&fields=photos,formatted_address,geometry,icon,name,permanently_closed,price_level,user_ratings_total,opening_hours,rating&locationbias=circle:2000@-33.888584,151.1873473&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM"


//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=sushi&inputtype=textquery&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM

// "&inputtype=textquery&fields=opening_hours&icon&geometry&formatted_address&geometry&icon&name&permanently_closed&photos&place_id&plus_code&types&ipbias";

    
    $.ajax({
        url: queryURL,
        method: 'get',
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // },
        cache: false,
    }).then(function (list) {

        console.log(list)

    });

});