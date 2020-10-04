var mysql=require('mysql');
var books=require('./bills.js');
var connection=mysql.createConnection(books.config);

exports.GetAllInformation=function(rent_id,next_month,callback) {
  GetRent(rent_id,next_month,function (err,rent_info) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    var rbill_id=rent_info.rbill_id;

    GetDeposit(rent_id,function (err,deposit) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      GetUtilities(rent_id,next_month,function (err,utilities) {
        if (err) {
          console.log(err);
          callback(false);
          return;
        }

        var utility_bills=[];
        for (var i=0;i<utilities.length;i++) {
          utility_bills.push(utilities[i].ubill_id);
        }

        console.log(utility_bills)

        GetTenants(rent_id,function (err,tenants) {
          if (err) {
            console.log(err);
            callback(false);
            return;
          }

          GetRentPayments(rent_id,next_month,rbill_id,function (err,rent_payments) {
            if (err) {
              console.log(err);
              callback(false);
              return;
            }

            GetUtilityPayments(utility_bills,next_month,function(err,utility_payments) {
              if (err) {
                console.log(err);
                callback(false);
                return;
              }

              callback(false,rent_info,deposit,utilities,tenants,rent_payments,utility_payments);
            });
          });
        });
      });
    });
  });
}

exports.UpdateUtilityPayment=function(payment_info,callback) {
  UpdateUtilityPayment(payment_info,function (err,rent) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    GetUtilityPayment(payment_info.tenant,payment_info.utility,payment_info.month,function(err,utility_payment) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      callback(false,utility_payment);
    });
  });
}

exports.UpdateRentPayment=function(payment_info,callback) {
  UpdateRentPayment(payment_info,function (err,rent) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    GetRentPayment(payment_info.tenant,payment_info.month,function(err,rent_payment) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      callback(false,rent_payment);
    });
  });
}

// HELPERS
var GetRent=function(rent_id,next_month,callback) {
  var query='select rent.*,address.*,rent_bills.* from rent inner join address on rent.id=address.rent inner join rent_bills on rent.id=rent_bills.rent where rent.id='+rent_id+' and rent_bills.rbill_month='+next_month+';';

  connection.query(query,function(err,rent_info) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent_info[0]); // return first index, can only have one rent and address per location
  });
}

var GetDeposit=function(rent_id,callback) {
  var query='select * from deposit where rent='+rent_id+';';

  connection.query(query,function(err,deposit) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,deposit[0]); // return first index, only interested in rents deposit
  });
}

var GetUtilities=function(rent_id,next_month,callback) {
  var query='select utilities.*,utility_bills.* from utilities inner join utility_bills on utilities.id=utility_bills.utility where utilities.rent='+rent_id+' and utility_bills.ubill_month='+next_month+' order by utilities.id asc;';

  connection.query(query,function(err,utilities) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,utilities);
  });
}

var GetTenants=function(rent_id,callback) {
  var query='select * from tenants where rent='+rent_id+';';

  connection.query(query,function(err,tenants) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,tenants);
  });
}

var GetRentPayments=function(rent_id,next_month,rbill_id,callback) {
  var query='select * from rent_payments where rbill='+rbill_id+';';

  connection.query(query,function(err,rent_payments) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent_payments);
  });
}

var GetUtilityPayments=function(utility_bills,next_month,callback) {
  var query='select * from utility_payments where ';

  for (var i=0;i<utility_bills.length;i++) {
    if (i===utility_bills.length-1) {
      query+='upayment_bill='+utility_bills[i]+';';
    } else {
      query+='upayment_bill='+utility_bills[i]+' or ';
    }
  }

  connection.query(query,function(err,utility_payments) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,utility_payments);
  });
}

var UpdateUtilityPayment=function(payment_info,callback) {
  var query='update utility_payments set upayment_month='+payment_info.month+', upayment_day='+payment_info.day+', upayment_year='+payment_info.year+', upayment_payed='+payment_info.payed+', upayment_total='+payment_info.total+' where tenant='+payment_info.tenant+' and utility='+payment_info.utility+' and upayment_month='+payment_info.month+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false);
  });
}

var GetUtilityPayment=function(tenant,utility_bills,month,callback) {
  console.log(utility_bills)
  var query='select utilities.name, utility_payments.* from utilities inner join utility_payments on utilities.id=utility_payments.utility where utility_payments.tenant='+tenant+' and utility_payments.utility='+utility+' and utility_payments.month='+month+';';

  connection.query(query,function(err,utility_payment) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,utility_payment[0]); // only need first index
  });
}

var UpdateRentPayment=function(payment_info,callback) {
  var query='update rent_payments set rpayment_month='+payment_info.month+', rpayment_day='+payment_info.day+', rpayment_year='+payment_info.year+', rpayment_payed='+payment_info.payed+', rpayment_total='+payment_info.total+' where tenant='+payment_info.tenant+' and rpayment_month='+payment_info.month+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false);
  });
}

var GetRentPayment=function(tenant,month,callback) {
  var query='select * from rent_payments where tenant='+tenant+' and rpayment_month='+month+';';

  connection.query(query,function(err,rent_payment) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent_payment[0]); // only need first index
  });
}
