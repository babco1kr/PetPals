$(document).ready(function() {
  var pet = $("#animal")
    .find(":selected")
    .val();
  $.ajax("/search/" + pet, {
    type: "GET"
  }).then(function() {
    console.log("petviews");
    // Reload the page to get the updated list
    location.reload();
  });
});

// user-account on click funcition
$('#user-account').click(function(){
    //do something
  });
  
