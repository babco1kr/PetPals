$(document).ready(function() {
  $("select").formSelect();

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

  $("#users-account").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");

    window.location.href = "/user/" + id;
  });

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

  $("#selectPet").on("click", function(event) {
    event.stopImmediatePropagation();
    var id = $(this).data("id");
    var user = $("#placeHolder").data("id");
    var name = $("#placeHolder").data("name");
    $.get("/apis/pet_info/" + id + "/" + user + "/" + name).then(function() {
      location.reload();
    });
  });
});
