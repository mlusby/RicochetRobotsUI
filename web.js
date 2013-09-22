var express = require("express");
var http = require("http");
var app = express();
app.use(express.logger());
app.use(express.static('public'));

var hbs = require('hbs');	//Hooray Handlebars!

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.get('/', function(req, res) {
   res.render('index', {});
});

var port = process.env.PORT || 5000 ;
app.listen(port, function() {
	console.log("Listening on " + port);
});
