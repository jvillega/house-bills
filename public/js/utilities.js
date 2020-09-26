$(document).ready(function () {
  $('#locations_dropdown').change(function (event) {
    event.preventDefault();

    var payload={
      type: 'locations',
      rent: $('#locations_dropdown').val()
    };

    $.ajax({
      url: "/emma/utilities",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('.add_container, #form_utilities, #form_utility_name, #form_utility_amount').remove();
        $(data.responseText).insertAfter('#form_locations');
      }
    });
  });

  $('form').on('click', '#add_utility', function(event) {
    event.preventDefault();

    var payload={
      type:'new',
    }

    $.ajax({
      url: "/emma/utilities",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_utility_name, div.add_container_utility_bill, #form_year, span.month_title, #form_utility_amount, #form_utility_month, #form_utility_day, #form_utility_year, #form_update').remove();
        $(data.responseText).insertAfter('#form_utilities');
      }
    });
  });

  $('form').on('change', '#utilities_dropdown', function(event) {
    event.preventDefault();

    var payload={
      type:'utilities',
      utility:$('#utilities_dropdown').val()
    }

    $.ajax({
      url: "/emma/utilities",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('#form_utility_name, #form_year, #form_utility_name_add, #form_utility_amount, #form_utility_month, #form_utility_day, #form_utility_year, #form_update').remove();
        $(data.responseText).insertAfter('#form_utilities');
      }
    });
  });

  $('form').on('change', '#year_dropdown', function(event) {
    event.preventDefault();

    var payload={
      type:'year',
      utility: $('#utilities_dropdown').val(),
      year: $('#year_dropdown').val()
    }

    $.ajax({
      url: "/emma/utilities",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $('div.add_container_utility_bill, span.month_title, #form_utility_amount, #form_utility_month, #form_utility_day, #form_utility_year, #form_update').remove();
        $(data.responseText).insertAfter('#form_year');
      }
    });
  });

  $('form').on('click', '#add', function(event) {
    event.preventDefault();

    var payload={
      type:'add',
    }

    $.ajax({
      url: "/emma/utilities",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $(data.responseText).insertAfter('#form_utilities');
      }
    });
  });
});
