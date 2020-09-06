$(document).ready(function () {
  $('#rents-dropdown').change(function (event) {
    event.preventDefault();

    var payload={
      rent: Number($('#rents-dropdown').val())
    };

    $.ajax({
      url: "/emma/tenants",
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
