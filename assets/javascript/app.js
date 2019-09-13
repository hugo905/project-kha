
$("#search").on("change", function (e) {
    e.preventDefault();
    var kw = $("#search").val();
    console.log(kw);
    
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM&input=" + kw + "&inputtype=textquery&fields=opening_hours,icon,geometry,formatted_address,geometry,icon,name,permanently_closed,photos,place_id,plus_code,types";
    
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
