$(document).ready(function() {
  //Needed for select drop down to work
  $("select").formSelect();

  // Allows filter for pet type and location
  $("#selectpetbtn").on("click", function(event) {
    event.stopImmediatePropagation();
    var pet = $("#animal")
      .find(":selected")
      .val();
    var location = $("#zipCodeSearch")
      .val()
      .trim();
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
      location.reload();
    });
  });

  // Call for selecting pet to sit
  $(".selectPet").on("click", function(event) {
    event.stopImmediatePropagation();
    var id = $(this).data("id");
    var user = $("#placeHolder").data("id");
    var name = $("#placeHolder").data("name");
    $.get("/apis/pet_info/" + id + "/" + user + "/" + name).then(function() {
      location.reload();
    });
  });

  // Call for denying a sitting request
  $(".deny").on("click", function(event) {
    event.stopImmediatePropagation();

    var id = $(this).data("id");
    $.get("/api/deny/" + id).then(function() {
      location.reload();
    });
  });
  // Call for Approving a Sitting request
  $(".approve").on("click", function(event) {
    event.stopImmediatePropagation();
    var id = $(this).data("id");
    $.get("/api/approve/" + id).then(function() {
      location.reload();
    });
  });

  // Removes requests info for approved sits on the requests page
  $(".endSit").on("click", function(event) {
    event.stopImmediatePropagation();
    var id = $(this).data("id");
    console.log("THIS ID: " + id);
    $.ajax("/api/complete/" + id, {
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  });
});
