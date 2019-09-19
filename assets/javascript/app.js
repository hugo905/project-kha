  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAO_Gz79glGQcOnEg5cs4vi4sN3VQ5dYvM",
    authDomain: "lunchmocracy.firebaseapp.com",
    databaseURL: "https://lunchmocracy.firebaseio.com",
    projectId: "lunchmocracy",
    storageBucket: "",
    messagingSenderId: "264715414255",
    appId: "1:264715414255:web:6a32965e17f1d93f47491a"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  
  var eatery;
  var employeeName;
  var optionNumber;
  var displayEatery;
  var displayEmployee;

  var placeId;
  var address;
  var phone;
  var restaurantName;
  var priceLevel;
  var rating;
  var image;

  var voters;
  var votes;
  var voterCheck;
  var thisVote;
  var noSpaces;

  //on submit click
  $("#suggestSubmit").on("click", function(e){  
    e.preventDefault();
    
    eatery = $("#restaurantSuggestion").val().trim();
    employeeName = $("#employeeName").val().trim().toLowerCase(); 

    if (eatery == ""){
      $("#restaurantSuggestion").addClass("is-invalid")
    }else if (employeeName == ""){
      $("#employeeName").addClass("is-invalid")
    }else{
    
      var loading = "<div class='loader'></div>"
      $(".container-fluid").prepend(loading);
      $(".container-fluid").addClass('overlay');
        
      runAPI(eatery);

        $("#restaurantSuggestion").val("");
        $("#employeeName").val("");
        $("#restaurantSuggestion").removeClass("is-invalid");
        $("#employeeName").removeClass("is-invalid");

        suggestClick();
  }
  });

  //display the options 
  database.ref("/option").on("child_added", function(snapshot){
    fireBaseID = snapshot.key;
    displayEatery = snapshot.val().eatery;
    displayEmployee = snapshot.val().suggester;

    optionID = snapshot.val().optionNo;
    displayAddress = snapshot.val().address;
    displayPhone = snapshot.val().phone;
    displayRestaurant = snapshot.val().restaurantName;
    displayPriceLevel = snapshot.val().priceLevel;
    displayRating = snapshot.val().rating;
    displayImage = snapshot.val().image;

    database.ref("/option/" + fireBaseID + "/voters").once("value", function(snapshot){
      votes = snapshot.numChildren();
    });
    
    var lookupAddress = displayAddress.replace("/",",");
    var newCard = $("<div>");
    var imageBanner = "<img src=" + displayImage + " >";
    var eateryH = $("<h3>" + displayRestaurant + "</h3>");
    var addressCard = $("<a href='https://www.google.com/maps/place/"+ lookupAddress + "'target='_blank'>" + displayAddress + "</a>");
    var priceCard = $("<p>Price: " + displayPriceLevel + "</p>");
    var ratingCard = $("<p>Rating: " + displayRating + "</p>");
    var suggesterP = $("<p>Suggested by: " + displayEmployee + "</p>");
    var voteCount = $("<p id='voteDisplay'>Votes: " + votes + "</p>");

    $(voteCount).attr("data-id", fireBaseID);

    var voteButton = $("<button type='button ' class='btn btn-primary btn-lg btn-block voteButton' id='suggest'>Vote Now!</button>")
    var voterName = $("<input type='text' class='form-control voterName' id='employeeName' placeholder='Employee Name'>");

    $(voterName).attr("data-id", fireBaseID)
    
    $(voteButton).attr("data-id", fireBaseID);
    
    $(newCard).append(imageBanner, eateryH, suggesterP, addressCard, priceCard, ratingCard, voteCount, voterName, voteButton);
    
    $(newCard).addClass("card cardstyle");

    $(".card-columns").prepend(newCard);
    hideLoad();
    
  });

  //voting function
$("body").on("click", ".voteButton", function(){
  
    var thisVote = $(this).attr("data-id");
   
    var thisVoter = $(".voterName[data-id=" + thisVote + "]").val().trim().toLowerCase();

    if(thisVoter == ""){
      $(".voterName[data-id=" + thisVote + "]").addClass("is-invalid")
    
    }else{
      database.ref("/option/" + thisVote + "/voters").once("value", function(snapshot){
        votes = snapshot.numChildren();
      
        $.each(snapshot.val(), function (index, value){
        var nameList = value;
        voterCheck = nameList.includes(thisVoter);
        
        if (voterCheck)
          return false;

      })
    });

    if (voterCheck){
      $(".voterName[data-id=" + thisVote + "]").val("You've already voted")

    }else{
      database.ref("/option/" + thisVote + "/voters").once("value", function(snapshot){
        votes = snapshot.numChildren();
     
    database.ref("/option/" + thisVote + "/voters/name" + votes).set(thisVoter);      
    });

    database.ref("/option/" + thisVote + "/voters").once("value", function(snapshot){
      votes = snapshot.numChildren();
      $("#voteDisplay[data-id=" + thisVote + "]").text("Votes: " + votes)
      $(".voterName[data-id=" + thisVote + "]").val("");
      $(".voterName[data-id=" + thisVote + "]").removeClass("is-invalid")
    });
  }
}

});

function hideLoad() {
  $(".loader").remove();
  $(".container-fluid").removeClass("overlay")
}

