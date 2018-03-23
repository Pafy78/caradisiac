var es = require('elasticsearch')
// Set ElasticSearch location and port
var client = new es.Client({
    host : 'localhost:9200'
});

module.exports = client; 