$(document).ready(function() {
  //Call to check if currenct user has any pending requests and updates the page
  $.get("/api/requests").then(function(data) {
    var requestNumber = data.length;
    $("#requests").text("(" + requestNumber + ") Requests");
  });
});
