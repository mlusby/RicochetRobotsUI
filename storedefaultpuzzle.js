var AWS = require("aws-sdk");
var hash = require("object-hash");

AWS.config.update({
      region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var boardLayout = '{'+
    '"blueRobot" : [3,1],'+
    '"redRobot" : [1,2],'+
    '"yellowRobot" : [3,4],'+
    '"greenRobot" : [5,6],'+
    '"board" : ['+
        '9,1,1,3,9,1,1,1,1,5,3,9,1,1,1,3,'+
        '8,0,0,0,0,2,12,0,0,3,8,0,0,0,0,2,'+
        '8,4,0,0,0,0,1,0,0,0,0,6,8,0,0,2,'+
        '8,3,8,0,0,4,0,0,0,0,0,1,0,0,0,6,'+
        '8,0,0,0,2,9,0,0,0,0,0,0,0,0,0,3,'+
        '8,0,6,8,0,0,0,0,0,0,0,0,2,12,0,2,'+
        '12,0,1,0,0,0,0,4,4,0,4,0,0,1,0,2,'+
        '9,0,0,0,0,0,2,9,3,10,9,0,0,0,0,2,'+
        '8,0,0,0,0,0,2,12,6,8,0,0,4,0,0,2,'+
        '8,4,0,2,12,0,0,1,1,0,0,0,3,8,0,6,'+
        '8,3,8,0,1,0,0,0,2,12,0,0,0,0,0,3,'+
        '12,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,'+
        '9,0,0,0,0,0,4,0,0,0,0,0,0,0,0,2,'+
        '8,0,0,0,0,2,9,0,0,4,0,0,0,0,6,10,'+
        '8,0,6,8,0,0,0,0,2,9,0,0,0,0,1,2,'+
        '12,4,5,6,12,4,4,4,4,4,6,12,4,4,4,6'+
    ']'+
'}';

var table = "Puzzles";

var key = hash(boardLayout);

var params = {};
params.TableName = table;
params.Item = {};
params.Item.key = key;
params.Item.layout = boardLayout;

console.log("Adding a new puzzle...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
