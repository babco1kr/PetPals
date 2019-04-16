$(document).ready(function() {
  var window = $(location).attr("href");
  console.log(window);
  var values = window.split("/");
  console.log(values);

  var currentPage = parseInt(values[4]) + 1;
  console.log(currentPage);
  var limit = currentPage + 5;
  for (i = currentPage; i < limit; i++) {
    var li = $("<li>");
    var a = $("<a>");
    a.attr(
      "href",
      "/" + values[3] + "/" + i + "/" + values[5] + "/" + values[6]
    );
    li.text(i);
    li.addClass("waves-effect page btn");
    a.append(li);
    $("#pages").append(a);
}

  //   $(".page").on("click", function(event) {
  //     event.preventDefault();
  //     var page = $(this).data("id");
  //     console.log(page);
  //     console.log(values[3] + "/" + page + "/" + values[5] + "/" + values[6]);
  //     var address = ("/" + values[3] + "/" + page + "/" + values[5] + "/" + values[6]).toString();
  //     console.log(address);
  //     window.location.href = address;
  //   });
});
