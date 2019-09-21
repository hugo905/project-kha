//HEADER BRAND
$("h1").on("click", function frontPage() {
    $(".suggestVote").removeClass("hide");
    $(".votingArea").addClass("hide");
    $(".suggestionForm").addClass("hide");
    $("#alreadySuggested").addClass("hide");
});

//SUGGEST!
$("#suggest").on("click", function suggestClick() {
    $(".suggestionForm").removeClass("hide");
    $(".suggestVote").addClass("hide");
    $("#alreadySuggested").addClass("hide");
});

//SUGGEST > SUGGEST SUBMIT!
function suggestClick() {
    $(".suggestionForm").addClass("hide");
    $(".votingArea").removeClass("hide");
    $("#alreadySuggested").addClass("hide");
};

//VOTE NOW!
$("#voteNow").on("click", function voteClick() {
    $(".votingArea").removeClass("hide");
    $(".suggestVote").addClass("hide");
    $("#alreadySuggested").addClass("hide");
});

//VOTE NOW > DONT LIKE? SUGGEST!
$("#suggest2").on("click", function frontPage() {
    $(".suggestVote").addClass("hide");
    $(".votingArea").addClass("hide");
    $(".suggestionForm").removeClass("hide");
    $("#alreadySuggested").addClass("hide");
});