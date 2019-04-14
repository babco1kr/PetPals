$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $("#users-account").attr("data-id", data.id);
    // sessionStorage.setItem("UserId", data.id);
    $("#placeHolder").attr("data-id", data.id);
    $("#placeHolder").attr("data-name", data.name);
  });
});
