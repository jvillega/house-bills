var mysql=require('mysql');
var books=require('./bills.js');
var connection=mysql.createConnection(books.config);

exports.GetRents=function(callback) {
  var query='select rent.id, address.street_address, address.city, address.state, address.zip_code from rent inner join address on rent.id=address.rent;';

  connection.query(query,function(err,rents) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rents);
  });
}

exports.GetRent=function(rent,callback) {
  var query='select rent.rent_total,rent.day,address.street_address,address.city,address.state,address.zip_code,deposit.deposit_total,deposit.remainder from rent inner join address on rent.id=address.rent inner join deposit on rent.id=deposit.rent where rent.id='+rent+';';


  connection.query(query,function(err,rent) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,rent[0]); // only one index so return it
  });
}

exports.GetTenantsByRent=function(rent,callback) {
  query='select * from tenants where rent='+rent+';';

  connection.query(query,function(err,tenant) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,tenant);
  });
}

exports.AddRent=function(rent_info,callback) {
  AddRent(rent_info.total,rent_info.day,function (err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    GetLastRent(function (err,last_rent_id) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      AddAddress(last_rent_id,rent_info.address,rent_info.city,rent_info.state,rent_info.zip,function (err) {
        if (err) {
          console.log(err);
          callback(true);
          return;
        }

        AddDeposit(last_rent_id,rent_info.deposit,rent_info.remaining_deposit,function (err) {
          if (err) {
            console.log(err);
            callback(true);
            return;
          }
          callback(false)
        });
      });
    })
  })
}

exports.UpdateRent=function (rent_info,callback) {
  UpdateRent(rent_info.id,rent_info.total,rent_info.day,function (err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    UpdateAddress(rent_info.id,rent_info.address,rent_info.city,rent_info.state,rent_info.zip,function (err) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      UpdateDeposit(rent_info.id,rent_info.deposit,rent_info.remaining_deposit,function (err) {
        if (err) {
          console.log(err);
          callback(true);
          return;
        }
        callback(false);
      });
    });
  });
}

exports.GetTenantByID=function(tenant_info,callback) {
  GetRents(function (err,rents) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    GetTenantByID(tenant_info.tenant,function (err,tenant) {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      callback(false,rents,tenant);
    });
  });
}

exports.GetUtilitiesByRent=function(rent_id,callback) {
  var query='select * from utilities where rent='+rent_id+';';

  connection.query(query,function(err,utilities) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false,utilities);
  });
}

exports.GetUtilityByID=function(utility_id,callback) {
  var query='select utilities.rent,utilities.name,utility_bills.amount,utility_bills.month,utility_bills.day,utility_bills.year from utilities inner join utility_bills on utilities.id=utility_bills.utility where utilities.id='+utility_id+';';

  connection.query(query,function(err,utility_info) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false,utility_info); // only care about first index
  });
}

exports.GetUtilityBillsByUtilityAndYear=function(utility_info,callback) {
  var query='select * from utility_bills where utility='+utility_info.utility+' and year='+utility_info.year+';';

  connection.query(query,function (err,utility_bills) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false,utility_bills);
  })
}

// HELPERS
var AddRent=function(rent_total,day,callback) {
  query='insert into rent (rent_total,day) values ('+rent_total+','+day+');';

  connection.query(query,function (err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false);
  });
}

var GetLastRent=function(callback) {
  var query='select max(id) from rent;'

  connection.query(query,function (err,last_rent_id) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,last_rent_id[0]['max(id)'])
  });
}

var AddAddress=function(last_rent_id,address,city,state,zip,callback) {
  var query='insert into address value (\''+last_rent_id+'\',\''+address+'\',\''+city+'\',\''+state+'\',\''+zip+'\');';

  connection.query(query,function(err){
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false);
  });
}

var AddDeposit=function(last_rent_id,deposit,remainder,callback) {
  var query='insert into deposit values ('+last_rent_id+','+deposit+','+remainder+');';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false);
  });
}

var UpdateRent=function(rent_id,rent_total,day,callback) {
  var query='update rent set rent_total='+rent_total+', day='+day+' where id='+rent_id+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false);
  });
}

var UpdateAddress=function(rent_id,address,city,state,zip,callback) {
  var query='update address set street_address=\''+address+'\', city=\''+city+'\', state=\''+state+'\', zip_code=\''+zip+'\' where rent='+rent_id+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false);
  });
}

var UpdateDeposit=function(rent_id,deposit_total,remainder,callback) {
  var query='update deposit set deposit_total='+deposit_total+', remainder='+remainder+' where rent='+rent_id+';';

  connection.query(query,function(err) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false);
  });
}

var GetRents=function(callback) {
  var query='select rent.id, address.street_address, address.city, address.state, address.zip_code from rent inner join address on rent.id=address.rent;';

  connection.query(query,function(err,rents) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    callback(false,rents);
  });
}

var GetTenantByID=function(tenant_id,callback) {
  var query='select * from tenants where id='+tenant_id+';';

  connection.query(query,function(err,tenant) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,tenant[0]);
  });
}
