$(document).ready(function() {
  //Needed for select drop down to work
  $("select").formSelect();

  //Call to check if currenct user has any pending requests and updates the page
  $.get("/api/requests").then(function(data) {
    var requestNumber = data.length;
    $("#requests").text("(" + requestNumber + ") Requests");
  });

  // Allows filter for pet type and location
  $("#selectpetbtn").on("click", function(event) {
    event.stopImmediatePropagation();
    var pet = $("#animal")
      .find(":selected")
      .val();
    var location = $("#zipCodeSearch")
      .val()
      .trim();
    console.log(pet);
    window.location.href = "/search/" + pet + "/" + location;
  });

  // Calls the route for the current users page
  $("#users-account").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");

    window.location.href = "/user/" + id;
  });

  $("#requests").on("click", function(event) {
    event.preventDefault();
    var id = $("#users-account").data("id");

    window.location.href = "/requests/" + id;
  });

  // Adds pet to the pets table
  $("#petInsert").on("submit", function(event) {
    event.stopImmediatePropagation();
    //Validate here
    var newPet = {
      petName: $("#petName")
        .val()
        .trim(),
      petType: $("#petType")
        .find(":selected")
        .val(),
      pictureLink: $("#petPhoto")
        .val()
        .trim(),
      location: $("#zipCode")
        .val()
        .trim(),
      price: $("#price")
        .val()
        .trim(),
      body: $("#body")
        .val()
        .trim()
    };
    $.ajax("/api/pets", {
      type: "POST",
      data: newPet
    }).then(function() {
      console.log("Pet added");
      location.reload();
    });
  });

  // Call for selecting pet to sit
  $("#selectPet").on("click", function(event) {
    event.stopImmediatePropagation();
    var id = $(this).data("id");
    var user = $("#placeHolder").data("id");
    var name = $("#placeHolder").data("name");
    $.get("/apis/pet_info/" + id + "/" + user + "/" + name).then(function() {
      location.reload();
    });
  });

  // Call for denying a sitting request
  $("#deny").on("click", function(event) {
    event.stopImmediatePropagation();

    var id = $(this).data("id");
    $.get("/api/deny/" + id).then(function() {
      console.log("Working");
    });
  });
});
