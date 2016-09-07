var AWS = require("aws-sdk");

AWS.config.update({
      region: "us-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

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
                                    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                                        }
});
