$(document).ready(function () {
  $('#locations_dropdown').change(function (event) {
    event.preventDefault();

    var payload={
      type: 'rent',
      id: $(this).val()
    };

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_total,#form_day,#form_address,#form_city,#form_state,#form_zip,#form_deposit,#form_remaining_deposit,#form_update,#form_add,#form_delete,#form_update').remove();
        $(data.responseText).insertAfter('#form_locations');
      }
    });
  });

  $('#new').click(function (event) {
    event.preventDefault();

    var payload={
      type:'new'
    };

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_total,#form_day,#form_address,#form_city,#form_state,#form_zip,#form_deposit,#form_remaining_deposit,#form_update,#form_delete,#form_add').remove();
        $('#locations_dropdown').val('');
        $(data.responseText).insertAfter('#form_locations');
      }
    });
  });

  $('form').on('click', '#update', function(event) {
    event.preventDefault();

    var payload={
      type: 'update',
      id: $('#locations_dropdown').val(),
      total: $('#total').val(),
      day: $('#day').val(),
      address: $('#address').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      zip: $('#zip').val(),
      deposit: $('#deposit').val(),
      remaining_deposit: $('#remaining_deposit').val()
    }

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_update');
      }
    });
  });

  $('form').on('click', '#delete', function(event) {
    event.preventDefault();

    var payload={
      type: 'delete',
      rent: $('#locations_dropdown').val()
    }

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_update');
      }
    });
  });
  $('form').on('click', '#add', function(event) {
    event.preventDefault();

    var payload={
      type: 'add',
      id: $('#locations_dropdown').val(),
      total: $('#total').val(),
      day: $('#day').val(),
      address: $('#address').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      zip: $('#zip').val(),
      deposit: $('#deposit').val(),
      remaining_deposit: $('#remaining_deposit').val()
    }

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_add');
      }
    });
  });
});
