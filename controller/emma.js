var express=require('express');
var router=express.Router();
var emma_functions=require('../models/emma_functions');

// emma get route
router.get('/',function(req,res) {
  res.render('emma/emma.ejs');
});

// rent get route
router.get('/rents',function(req,res) {
  emma_functions.GetRents(function(err,rents) {
    res.render('emma/rents.ejs',{rents:rents});
  });
});

// rents post route
router.post('/rents',function(req,res) {
  if (req.body.type===undefined) {
    emma_functions.GetRent(req.body.id,function(err,rent) {
      res.render('emma/snippets/rent_form.ejs',{rent:rent});
    });
  }
});

// tenants get route
router.get('/tenants',function(req,res) {
  emma_functions.GetRents(function(err,rents) {
    res.render('emma/tenants.ejs',{rents:rents});
  });
});

// tenants post route
router.post('/tenants',function(req,res) {
  emma_functions.GetTenantsByRent(req.body.rent,function(err,tenants) {
    res.render('emma/snippets/tenants_form.ejs',{tenants:tenants});
  });
});

// utilities get route
router.get('/utilities',function(req,res) {
  res.render('emma/utilities.ejs');
});

// rent-payments get route
router.get('/rent-payments',function(req,res) {
  res.render('emma/rent_payments.ejs');
});

// utility-payments get route
router.get('/utility-payments',function(req,res) {
  res.render('emma/utility_payments.ejs');
});

module.exports=router;
