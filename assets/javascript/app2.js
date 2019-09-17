function runAPI (eatery) {
    
    console.log("e, eatery" + eatery);
   
    var kw = eatery;


    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + kw + "&inputtype=textquery&place_id&fields=photos,formatted_address,geometry,icon,name,permanently_closed,price_level,user_ratings_total,opening_hours,rating,place_id&locationbias=circle:2000@-33.888584,151.1873473&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM"

    $.ajax({
        url: queryURL,
        method: 'get',
        cache: false,
    }).then(function (list) {

        var placeID = list.candidates[0].place_id;

        var detailList = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeID + "&fields=name,rating,formatted_phone_number,formatted_address,geometry,plus_code,opening_hours,photos,price_level,rating,reviews&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM";

        $.ajax({
            url: detailList,
            method: 'get',
            cache: false,
        }).then(function (detailListResult) {

            console.log(detailListResult);

            var firstImageReference = detailListResult.result.photos[0].photo_reference;

            var firstImageURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + firstImageReference + "&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM"

        });
    });

};