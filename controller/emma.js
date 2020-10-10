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
  if (req.body.type==='rent') {
    emma_functions.GetRent(req.body.id,function(err,rent) {
      res.render('emma/snippets/rent_form.ejs',{rent:rent});
    });
  } else if (req.body.type==='new') {
    res.render('emma/snippets/rent_form.ejs',{rent:undefined});
  } else if (req.body.type==='update') {
    emma_functions.UpdateRent(req.body,function(err) {
      res.render('emma/snippets/message.ejs',{message:'Successful'});
    });
  } else if (req.body.type==='delete') {
    emma_functions.DeleteRent(req.body,function (err) {
      res.render('emma/snippets/message.ejs',{message:'Successful'});
    });
  } else if (req.body.type==='add') {
    emma_functions.AddRent(req.body,function(err) {
      res.render('emma/snippets/message.ejs',{message:'Successful'});
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
  if (req.body.type==='locations') {
    emma_functions.GetTenantsByRent(req.body.rent,function(err,tenants) {
      res.render('emma/snippets/tenants_dropdown.ejs',{tenants:tenants});
    });
  } else if (req.body.type==='tenant') {
    emma_functions.GetTenantByID(req.body,function (err,rents,tenant) {
      res.render('emma/snippets/tenants_form.ejs',{tenant:tenant});
    });
  } else if (req.body.type==='new') {
    res.render('emma/snippets/tenants_form.ejs',{tenant:undefined});
  } else if (req.body.type==='add') {
    emma_functions.AddTenant(req.body,function (err) {
      res.render('emma/snippets/message.ejs',{message:'Successful'});
    });
  } else if (req.body.type==='delete') {
    emma_functions.DeleteTenant(req.body,function (err) {
      res.render('emma/snippets/message.ejs',{message:'Successful'});
    });
  } else if (req.body.type==='update') {
    emma_functions.UpdateTenant(req.body,function (err) {
      res.render('emma/snippets/message.ejs',{message:'Succesful'});
    });
  }
});

// utilities get route
router.get('/utilities',function(req,res) {
  emma_functions.GetRents(function(err,rents) {
    res.render('emma/utilities.ejs',{rents:rents});
  });
});

// utilities post routes
router.post('/utilities',function(req,res) {
  if (req.body.type==='locations') {
    emma_functions.GetUtilitiesByRent(req.body.rent,function(err,utilities) {
      res.render('emma/snippets/utilities_form.ejs',{utilities:utilities});
    });
  } else if (req.body.type==='utilities') {
    emma_functions.GetUtilityByID(req.body.utility,function(err,utility_info) {
      res.render('emma/snippets/utility_form.ejs',{utility_info:utility_info});
    });
  } else if (req.body.type==='year') {
    emma_functions.GetUtilityBillsByUtilityAndYear(req.body,function(err,utility_year_info) {
      res.render('emma/snippets/utility_bills.ejs',{utility_year_info:utility_year_info});
    });
  } else if (req.body.type==='new') {
    res.render('emma/snippets/utility_bills.ejs',{utility_year_info:undefined});
  }
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
