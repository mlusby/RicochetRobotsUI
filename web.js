var express = require("express");
var AWS = require("aws-sdk");
var http = require("http");
var app = express();
app.use(express.logger());
app.use(express.static('public'));

var hbs = require('hbs');   //Hooray Handlebars!
AWS.config.update({
    region: "us-west-2"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());


app.get('/', function(req, res) {
    var key = "6cb44b029b4b55fb2b03eda4ec5f96f4da010e07";
    renderPuzzle(key, res);
});

app.get('/puzzle/:key', function(req, res) {
    renderPuzzle(req.params.key, res);
});

function renderPuzzle(key, res) {
    var table = "Puzzles";
    var params = {
        "TableName": table,
        "Key": {
            "key": key
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            if (data && data.Item && data.Item.layout){
                res.render('index', {'puzzle': data.Item.layout});
            } else {
                var errMsg = "Unable to read key: " + key;
                console.error(errMsg);
                res.status(500).send(errMsg);
            }
        }
    });
}

app.get('/test/:id', function(req, res) {
    res.render('test',{"id": req.params.id});  
});

var port = process.env.PORT || 5000 ;
app.listen(port, function() {
        console.log("Listening on " + port);
});
