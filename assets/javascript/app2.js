function runAPI (eatery) {
    
   
    var kw = eatery;
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + kw + "&inputtype=textquery&place_id&fields=photos,formatted_address,geometry,icon,name,permanently_closed,price_level,user_ratings_total,opening_hours,rating,place_id&locationbias=circle:2000@-33.888584,151.1873473&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM"

    $.ajax({
        url: queryURL,
        method: 'get',
        cache: false,
    }).then(function (list) {

        var placeID = list.candidates[0].place_id;

        // API for images
        var detailList = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeID + "&fields=name,rating,formatted_phone_number,formatted_address,geometry,plus_code,opening_hours,photos,price_level,rating,reviews,place_id&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM";

        $.ajax({
            url: detailList,
            method: 'get',
            cache: false,
        }).then(function (detailListResult) {

            var firstImageReference = detailListResult.result.photos[0].photo_reference;
            var firstImageURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + firstImageReference + "&key=AIzaSyATo66aR1XW_0vPRGB6CjsrCBDjaYi9ZUM";
            console.log(detailListResult);

            firebaseID = database.ref("/option/").push().key;

            database.ref("/option/" + firebaseID).update({
                eatery: eatery,
                suggester: employeeName,
                placeId: detailListResult.result.place_id,
                address: detailListResult.result.formatted_address,
                phone: detailListResult.result.formatted_phone_number,
                restaurantName: detailListResult.result.name,
                priceLevel: detailListResult.result.price_level,
                rating: detailListResult.result.rating,
                image: firstImageURL,
                '/voters/name0': employeeName
              });

        });
    });

};