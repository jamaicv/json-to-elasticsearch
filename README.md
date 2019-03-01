# json-to-elasticsearch

Simple node script to import a json file into elasticsearch.

## Installation

Clone this repository, then just go into downloaded folder and run following command :<br/>
```
npm install
```

## Usage

This script requires some parameters to be functional. It needs to be run as following :<br/>
```
node app.js -f your_file.json -i index_name -t type
```

Note : json file must contain an array of objects.
