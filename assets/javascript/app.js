

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

  var address;
  var phone;
  var restaurantName;
  var priceLevel;
  var rating;

  //on submit click
  $("#suggestSubmit").on("click", function(e){
    e.preventDefault();
   eatery = $("#restaurantSuggestion").val().trim();
   employeeName = $("#employeeName").val().trim();    
   runAPI(eatery);

    //saving options up to database 
      database.ref("/option").push({
        eatery: eatery,
        suggester: employeeName,
        voterName: employeeName
      });

  });

  //display the options 
  database.ref("/option").on("child_added", function(snapshot){
    displayEatery = snapshot.val().eatery;
    displayEmployee = snapshot.val().suggester;
    optionID = snapshot.val().optionNo;
    //votes??

    var newCard = $("<div>");
    var eateryH = $("<h5>" + displayEatery + "</h5>");
    var suggesterP = $("<p>Suggested by: " + displayEmployee + "</p>");
    var voteCount = $("<p>Votes: " + "votes??" + "</p>");

    var voteButton = $("<button type='button' class='btn btn-primary btn-lg btn-block' id='suggest'>Vote Now!</button>")
    
    $(newCard).append(eateryH, suggesterP, voteCount, voteButton);
    $(newCard).attr("OptionID", optionID);
    $(newCard).addClass("card");

    $(".suggestionResults").prepend(newCard);

  });






