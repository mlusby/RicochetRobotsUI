var AWS = require("aws-sdk");

AWS.config.update({
      region: "us-west-2"
});

var dynamodb = new AWS.DynamoDB();

var table = "Puzzles";

var params = {
    TableName: 'Puzzles',
    KeySchema: [
        {
            AttributeName: 'key',
            KeyType: 'HASH'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: "key",
            AttributeType: "S"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

console.log("Creating Movies table..");
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
