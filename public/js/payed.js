$(document).ready(function () {
  $('button.payed').click(function (event) {
    event.preventDefault();

    var $parent=$(this).parent();
    var date=new Date();
    var payload={
      tenant: $(this).attr('data-tenant'),
      rent: $(this).attr('data-rent-id'),
      type: $(this).attr('data-type'),
      bill: $(this).attr('data-bill'),
      month: (date.getMonth()+1).toString(),
      day: date.getDate().toString(),
      year: date.getFullYear().toString(),
      payed: true,
      total: $(this).attr('data-total'),
      percentage: $parent.find('span[class*=percentage]').text().replace(/%/g,''),
      utility: $(this).attr('data-utility')
    }

    $.ajax({
      url: "/",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(payload),
      complete: function(data) {
        $parent.html(data.responseText);
      }
    });
  });
});
