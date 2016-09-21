var express = require("express");
var AWS = require("aws-sdk");
var http = require("http");
var app = express();
app.use(express.logger());
app.use(express.static('public'));

var hbs = require('hbs');   //Hooray Handlebars!
AWS.config.update({
        accessKeyId: "AccessKeyId",
        secretAccessKey: "SecretAccessKey",
        region: "us-west-2"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());


app.get('/', function(req, res) {

        
        var table = "Puzzles";
            var key = "2dc9e6432ce8b9c159120b4e178dad01859ad428";
                var params = {};
                    params.TableName = table;
                        params.Key = {};
                            params.Key.key = key;
                                docClient.get(params, function(err, data) {
                                            if (err) {
                                                                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                                                                                            } else {
                                                                                                   res.render('index', {'puzzle': JSON.stringify(data, null, 2)});
                                                                                                                                           }
                                                });
});

app.get('/test/:id', function(req, res) {
      res.render('test',{"id": req.params.id});  
});

var port = process.env.PORT || 5000 ;
app.listen(port, function() {
        console.log("Listening on " + port);
});
