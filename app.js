// import libraries
var express=require('express');
var ejs=require('ejs');
var bodyParser=require('body-parser');

// import routes
var index=require('./controller/index');
var emma=require('./controller/emma');

// initialize framework
var app=express();
var router=express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// configure template engine
app.set('view_engine','ejs');
app.set('views',__dirname+'/views');

app.use('/',index);
app.use('/emma',emma);

// configure static directory for javascript, css, images, etc.
app.use(express.static('./public'));

app.set('port',3000);
app.listen(app.get('port'));
console.log('Express server listenting on port',app.get('port'));
