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
  var thisVote;
  var noSpaces;

  //on submit click
  $("#suggestSubmit").on("click", function(e){  
    
    var loading = "<div class='loader'></div>"
    $(".container-fluid").prepend(loading);
    $(".container-fluid").addClass('overlay');

    e.preventDefault();
    eatery = $("#restaurantSuggestion").val().trim();
    employeeName = $("#employeeName").val().trim();    
    runAPI(eatery);

      $("#restaurantSuggestion").val("");
      $("#employeeName").val("");
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

    // database.ref("/option/" + fireBaseID).push({
    //   name: employeeName
    // });

    var newCard = $("<div>");
    var imageBanner = "<img src=" + displayImage + " >";
    var eateryH = $("<h3>" + displayRestaurant + "</h3>");
    var addressCard = $("<p>Address: " + displayAddress + "</p>");
    var priceCard = $("<p>Price: " + displayPriceLevel + "</p>");
    var ratingCard = $("<p>Rating: " + displayRating + "</p>");
    var suggesterP = $("<p>Suggested by: " + displayEmployee + "</p>");
    var voteCount = $("<p id='voteDisplay'>Votes: " + voters + "</p>");

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
    console.log(thisVote);
    //var noSpaces = thisVote.replace(/\s/g, '');
    // noSpaces = noSpaces.replace("'","");

    var thisVoter = $(".voterName[data-id=" + thisVote + "]").val().trim();
      console.log(thisVoter);
      database.ref("/option/" + thisVote + "/voters/").push({
        name: thisVoter
      });



  //updates the visible vote count
  database.ref("/option/" + thisVote + "/voters").on("value", function(snapshot){
    var voters = snapshot.val();
    $("#voteDisplay[data-id=" + thisVote + "]").text("Votes: " + Object.keys(voters).length);
    
    console.log(voters.length)
  });

$(".voterName[data-id=" + thisVote + "]").val("");

});

function hideLoad() {
  $(".loader").css("display", "none");
  $(".overlay").css("display", "none");
}








