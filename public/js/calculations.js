function create_utilities_object() {
  // create JSON object for utilities
  var utilities='{';
  $('div.utility').each(function (index) {
    var utility_name=$(this).find('span.utility_name_value').text();
    var utility_amount=$(this).find('span.utility_amount_value').text();
    var utility_due=$(this).find('span.utility_due_date_value').text();
    utilities+='"'+utility_name+'":{"amount":'+utility_amount+',"due":"'+utility_due+'"}';
    if (index!==$('div.utility').length-1) {
      utilities+=',';
    }
  });
  utilities+='}';

  return JSON.parse(utilities);
}

// calculate rent price for each tenant
function rent_calc(rent) {
  $('div.rent_payment.not_payed').each(function (index) {
    var percentage=Number('.'+$(this).find('span.rent_payment_percentage_value').text().replace(/%/g,''));
    $(this).find('span.rent_payment_total_value').text(percentage*rent);
    $(this).find('button').attr('data-total',percentage*rent);
  });
}

// calculate utility price for each tenant
function utility_calc(utilities) {
  $('div.utility_payment.not_payed').each(function (index) {
    var utility_name=$(this).find('span.utility_payment_name_value').text();
    var percentage=Number('.'+$(this).find('span.utility_payment_percentage_value').text().replace(/%/g,''));
    $(this).find('span.utility_payment_total_value').text(percentage*utilities[utility_name].amount);
    $(this).find('button').attr('data-total',percentage*utilities[utility_name].amount);
  });
}

$(document).ready(function () {
  var rent=Number($('#rent_total').text()); // rent total
  var deposit=Number($('#deposit_amount').text()); // deposit total
  var utilities=create_utilities_object();
  rent_calc(rent);
  utility_calc(utilities);
});
