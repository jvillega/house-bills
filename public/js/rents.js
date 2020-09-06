$(document).ready(function () {
  $('#rents_dropdown').change(function (event) {
    event.preventDefault();
    var payload={
      id: $(this).val()
    };

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#formRents');
      }
    });
  });
});
