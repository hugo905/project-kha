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
    e.preventDefault();
    eatery = $("#restaurantSuggestion").val().trim();
    employeeName = $("#employeeName").val().trim();    
    runAPI(eatery);

    database.ref("/option/" + eatery).set({
      eatery: eatery,
      suggester: employeeName
    });

    database.ref("/option/" + eatery + "/voters/").push({
      name: employeeName
    });

      $("#restaurantSuggestion").val("");
      $("#employeeName").val("");
    console.log(eatery)
  });

  //display the options 
  database.ref("/option").on("child_added", function(snapshot){
    displayEatery = snapshot.val().eatery;
    displayEmployee = snapshot.val().suggester;

    optionID = snapshot.val().optionNo;
    displayAddress = snapshot.val().placeId;
    displayPhone = snapshot.val().phone;
    displayRestaurant = snapshot.val().restaurantName;
    displayPriceLevel = snapshot.val().priceLevel;
    displayRating = snapshot.val().rating;

    database.ref("/option/" + displayEatery + "/voters").on("value", function(snapshot){
      voters = snapshot.val();
      
    });

    var newCard = $("<div>");
    var eateryH = $("<h5>" + displayEatery + "</h5>");
    var suggesterP = $("<p>Suggested by: " + displayEmployee + "</p>");
    var voteCount = $("<p>Votes: " + voters + "</p>");

    var noSpaces = displayEatery.replace(/\s/g, "");
    noSpaces = noSpaces.replace("'","");
    $(voteCount).addClass("voteCounter" + noSpaces)

    var voteButton = $("<button type='button ' class='btn btn-primary btn-lg btn-block voteButton' id='suggest'>Vote Now!</button>")
    var voterName = $("<input type='text' class='form-control voterName' id='employeeName' placeholder='Employee Name'>");

    $(voterName).addClass("voterName" + noSpaces)
    
    $(voteButton).attr("OptionID", displayEatery);
    
    $(newCard).append(eateryH, suggesterP, voteCount, voterName, voteButton);
    
    $(newCard).addClass("card");

    $(".card-columns").prepend(newCard);

  });

  //voting function
$("body").on("click", ".voteButton", function(){
  
    thisVote = $(this).attr("OptionID");
    noSpaces = thisVote.replace(/\s/g, '');
    noSpaces = noSpaces.replace("'","");

    thisVoter = $(".voterName" + noSpaces).val().trim();
      
      database.ref("/option/" + thisVote + "/voters/").push({
        name: thisVoter
      })



  //updates the visible vote count
  database.ref("/option/" + thisVote + "/voters").on("value", function(snapshot){
    var voters = snapshot.val();

    $(".voteCounter" + noSpaces).text("Votes: " + Object.keys(voters).length);
    
  });

$(".voterName" + noSpaces).val("");

});
  

