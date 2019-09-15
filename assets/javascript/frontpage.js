//HEADER BRAND
$("h1").on("click", function frontPage() {
    $(".suggestVote").removeClass("hide");
    $(".votingArea").addClass("hide");
    $(".suggestionForm").addClass("hide");
});

//SUGGEST!
$("#suggest").on("click", function suggestClick() {
    $(".suggestionForm").removeClass("hide");
    $(".suggestVote").addClass("hide");
});

//SUGGEST > SUGGEST SUBMIT!
$("#suggestSubmit").on("click", function suggestClick() {
    $(".suggestionForm").addClass("hide");
    $(".votingArea").removeClass("hide");
});

//VOTE NOW!
$("#voteNow").on("click", function voteClick() {
    $(".votingArea").removeClass("hide");
    $(".suggestVote").addClass("hide");
});

//VOTE NOW > DONT LIKE? SUGGEST!
$("#suggest2").on("click", function frontPage() {
    $(".suggestVote").addClass("hide");
    $(".votingArea").addClass("hide");
    $(".suggestionForm").removeClass("hide");
});