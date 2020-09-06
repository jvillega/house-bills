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

exports.GetTenantsByRent=function(callback) {
  query='';

  connection.query(query,function(err,tenant) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    callback(false,tenant);
  });
}
