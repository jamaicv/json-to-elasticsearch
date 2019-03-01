/**
  * HOW TO USE :
  * node app.js -f your_file.json -i index_name -t type
  *
  * /!\ JSON file must contain an array of objects
  *
 **/

const elasticsearch = require('elasticsearch');
const ArgsChecker = require('./ArgsChecker');
const fs = require('fs');

const checker = new ArgsChecker();

var filename = '';
var indexname = '';
var type = '';

// Fetching arguments [ALL REQUIRED !]
process.argv.forEach(function (val, index, array) {
  if (val == '-f') {
    filename = process.argv[index + 1];
  } else if (val == '-i') {
    indexname = process.argv[index + 1];
  } else if (val == '-t') {
    type = process.argv[index + 1];
  } else {
    console.error('Invalid parameter given.')
    process.exit();
  }
});

// Checking arguments value
if (checker.checkFile(filename) && checker.checkArg(indexname, 'index') && checker.checkArg(type, 'type')) {
  fs.readFile(__dirname + '/' + filename, function (err, data) {
    if (err) {
      console.log(err);
      process.exit();
    }

    // Connecting to elasticsearch
    var client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'info'
    });

    // Parsing json file
    jsonData = JSON.parse(data);
    var importData = [];
    for (var i = 0; i < jsonData.length; i++) {
      let header = {index: {_index: indexname, _type: type, _id: i + 1}};
      let entry = jsonData[i];
      delete entry._id
      importData.push(header);
      importData.push(entry);
    }

    // Putting data into elasticsearch
    client.bulk({
      body: importData,
      refresh: "wait_for"
    }, function(err, resp) {
      if (err) {
        console.error(err);
      } else {
        console.log('JSon file successfully uploaded.');
        client.close();
      }
    });
  });
}
