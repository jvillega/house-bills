var express=require('express');
var router=express.Router();
var bills_functions=require('../models/bills_functions');

// index get route
router.get('/',function(req,res) {
  var next_month=new Date().getMonth()+2; // add two to get next month

  bills_functions.GetAllInformation(1,next_month,function (err,rent_info,deposit,utilities,tenants,rent_payments) {
    res.render('index.ejs',{rent_info:rent_info,deposit:deposit,utilities:utilities,tenants:tenants,rent_payments:rent_payments});
  });
});

// index post route
router.post('/',function(req,res,err) {
  if (req.body.type==='rent') {
    bills_functions.UpdateRentPayment(req.body,function(err,rent_payment) {
      res.render('snippets/rent_payment.ejs',{rent_payment:rent_payment});
    });
  } else {
    bills_functions.UpdateUtilityPayment(req.body,function(err,utility_payment) {
      res.render('snippets/utility_payment.ejs',{utility_payment:utility_payment});
    });
  }
});

module.exports=router;
