$(document).ready(function() {
  $("select").formSelect();

  $("#selectpetbtn").on("click", function(event) {
    event.preventDefault();
    var pet = $("#animal")
      .find(":selected")
      .val();
    console.log(pet);
    $.ajax("/search/" + pet, {
      type: "GET"
    }).then(function() {
      console.log("petviews");
      // Reload the page to get the updated list
      location.reload();
    });
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
        .val()
        .trim(),
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
        .trim(),
      UserId: $("#email").attr("data-id")
    };
    console.log(newPet);
    $.ajax("/api/pets", {
      type: "POST",
      data: newPet
    }).then(function() {
      console.log("Pet added");
      location.reload();
    });
  });
});
