var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
let cors = require('cors');
var bodyParser = require('body-parser');
var users = require('./routes/users');

let mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds255258.mlab.com:55258/dlworkshop');

var app = express();


 //app.use(cors());
app.options('*', cors());
// app.use(function (req, res, next) {
// res.setHeader('Access-Control-Allow-Origin', "*");
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// res.setHeader('Access-Control-Allow-Headers', 'application/json');
// res.setHeader('Access-Control-Allow-Credentials', true);
// next();
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//console.log(db);

 //view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', users);



app.listen(app.get('port'),()=>{
	console.log('Server running on port 5000' + app.get('port'));
})
