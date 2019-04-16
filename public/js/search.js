$(document).ready(function() {
  // Grabs the data of the address bar
  var window = $(location).attr("href");
  // Splits the window variable at every / for use later
  var values = window.split("/");

  var currentPage = parseInt(values[4]) + 1;
  var limit = currentPage + 5;

  // Forms the page buttons at the bottom of the search page
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
});
