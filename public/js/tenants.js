$(document).ready(function () {
  $('#locations_dropdown').change(function (event) {
    event.preventDefault();

    var payload={
      type: 'locations',
      rent: $('#locations_dropdown').val()
    };

    $.ajax({
      url: "/emma/tenants",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_locations');
      }
    });
  });

  $('form').on('change', '#tenants_dropdown', function(event) {
    event.preventDefault();

    var payload={
      type: 'tenant',
      rent: $('#locations_dropdown').val(),
      tenant: $('#tenants_dropdown').val()
    }

    $.ajax({
      url: "/emma/tenants",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_tenants');
      }
    });
  });
});
