$(document).ready(function () {
  $('button.payed').click(function (event) {
    event.preventDefault();

    var $parent=$(this).parent();
    var date=new Date();
    var payload={
      tenant: $(this).attr('data-tenant'),
      utility: $(this).attr('data-utility'),
      type: $(this).attr('data-type'),
      month: (date.getMonth()+1).toString(),
      day: date.getDate().toString(),
      year: date.getFullYear().toString(),
      payed: true,
      total: $(this).attr('data-total')
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
