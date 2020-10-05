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
        $('#form_first_name,#form_last_name,#form_submit').remove();
        $(data.responseText).insertAfter('#form_tenants');
      }
    });
  });

  $('form').on('click', '#new', function(event) {
    event.preventDefault();

    var payload={
      type: 'new'
    }

    $.ajax({
      url: "/emma/tenants",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#tenants_dropdown').val('');
        $('#form_first_name,#form_last_name,#form_submit').remove();
        $(data.responseText).insertAfter('#form_tenants');
      }
    });
  });

  $('form').on('click', '#add', function(event) {
    event.preventDefault();

    var payload={
      type:'add',
      rent:$('#locations_dropdown').val(),
      first_name:$('#first_name').val(),
      last_name:$('#last_name').val()
    }

    console.log(payload);

    $.ajax({
      url: "/emma/tenants",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_submit');
      }
    });
  });
});
