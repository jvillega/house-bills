var mysql=require('mysql');
var books=require('./bills.js');
var connection=mysql.createConnection(books.config);

exports.GetAllInformation=function(next_month,callback) {
  GetRent(function (err,rent) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    GetDeposit(rent.id,function (err,deposit) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      GetUtilities(next_month,function (err,utilities) {
        if (err) {
          console.log(err);
          callback(false);
          return;
        }

        var utility_ids=[];
        for (var i=0;i<utilities.length;i++) {
          utility_ids.push(utilities[i].id);
        }

        GetTenants(rent.id,function (err,tenants) {
          if (err) {
            console.log(err);
            callback(false);
            return;
          }

          GetRentPayments(rent.id,function (err,rent_payments) {
            if (err) {
              console.log(err);
              callback(false);
              return;
            }

            GetUtilityPayments(utility_ids,function(err,utility_payments) {
              if (err) {
                console.log(err);
                callback(false);
                return;
              }

              callback(false,rent,deposit,utilities,tenants,rent_payments,utility_payments);
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
var GetRent=function(callback) {
  var query='select * from rent where id=1;';

  connection.query(query,function(err,rent) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent[0]); // return first index, can only have one rent per location
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

var GetUtilities=function(next_month,callback) {
  var query='select * from utilities where month='+next_month+';';

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

var GetRentPayments=function(rent_id,callback) {
  var query='select * from rent_payments where rent='+rent_id+';';

  connection.query(query,function(err,rent_payments) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent_payments);
  });
}

var GetUtilityPayments=function(utility_ids,callback) {
  var query='select utilities.name,utility_payments.* from utilities inner join utility_payments on utilities.id=utility_payments.utility where utility=';

  for (var i=0;i<utility_ids.length;i++) {
    if (i===utility_ids.length-1) {
      query+=utility_ids[i]+';';
    } else {
      query+=utility_ids[i]+' or utility=';
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
  var query='update utility_payments set month='+payment_info.month+', day='+payment_info.day+', year='+payment_info.year+', payed='+payment_info.payed+', total='+payment_info.total+' where tenant='+payment_info.tenant+' and utility='+payment_info.utility+' and month='+payment_info.month+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false);
  });
}

var GetUtilityPayment=function(tenant,utility,month,callback) {
  var query='select utilities.name,utility_payments.* from utilities inner join utility_payments on utilities.id=utility_payments.utility where utility_payments.tenant='+tenant+' and utility_payments.utility='+utility+' and utility_payments.month='+month+';';

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
  var query='update rent_payments set month='+payment_info.month+', day='+payment_info.day+', year='+payment_info.year+', payed='+payment_info.payed+', total='+payment_info.total+' where tenant='+payment_info.tenant+' and month='+payment_info.month+';';

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
  var query='select * from rent_payments where tenant='+tenant+' and month='+month+';';

  connection.query(query,function(err,rent_payment) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent_payment[0]); // only need first index
  });
}
