$(document).ready(function () {
  $('#locations_dropdown').change(function (event) {
    event.preventDefault();

    var payload={
      type: 'get',
      id: $(this).val()
    };

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_total,#form_day,#form_address,#form_city,#form_state,#form_zip,#form_deposit,#form_remaining_deposit,#form_submit').remove();
        $(data.responseText).insertAfter('#form_locations');
        $('#submit').attr('data-type','update'); // add data attribute type to submit button
      }
    });
  });

  $('#add_rent').click(function (event) {
    event.preventDefault();

    var payload={
      type:'blank'
    };

    $.ajax({
      url: "/emma/rents",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_total,#form_day,#form_address,#form_city,#form_state,#form_zip,#form_deposit,#form_remaining_deposit,#form_submit').remove();
        $('#rents_dropdown').val('');
        $(data.responseText).insertAfter('#form_locations');
        $('#submit').attr('data-type','add'); // add data attribute type to submit button
      }
    });
  });

  $('form').on('click', '#submit', function(event) {
    event.preventDefault();

    var payload={
      type: $('#submit').attr('data-type'),
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

    console.log(payload);

    $.ajax({
      url: "/emma/rents",
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
