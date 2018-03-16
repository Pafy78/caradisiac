/*const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var json_elastic = new Array();

async function print (callback) {
    const brands = await getBrands();
    var count = 0;
    brands.forEach(async function(brand){
        const models = await getModels(brand);
        if(models.length != 0){
            json_elastic = json_elastic.concat(models);
        }
        count++;
        console.log(count + "/" + brands.length);
        callback();
    });
}

print(function(){
    console.log(json_elastic);
});*/

// Declare required packages
var _ = require('underscore')
var es = require('elasticsearch')
// Set ElasticSearch location and port
var client = new es.Client({
    host : 'localhost:9200'
});

// sample JSON data
var xjson = "{\"samplealert\":" + "    [" + "        {\"aid\" : 1,\"alertid\":\"Nothing\",\"action\":\"Action no. 1\"}," + "        {\"aid\" : 2,\"alertid\":\"Alarm\",\"action\":\"Action no. 2\"}" + "    ]" + "}";

// Function to convert string to JSON format
 function readJson (data) {
    var obj = JSON.parse(data);
    return(obj)
 };

// Contain JSON data to "tmpjson"
var tmpjson = readJson(xjson);
// Extract property of "samplealert" to "finaljson"
var finaljson = tmpjson.samplealert;

// Find number of document of "finaljson"
var xloop = _.size(finaljson);

// Declare variable to contain body of JSON data for loading to ElasticSearch
var br = [];

// Function to create body for loading to ElasticSearch
function create_bulk (bulk_request) {
    var obj
 
for (i = 0; i < xloop; i++) {
    obj = finaljson[i]
    // Insert header of record
    bulk_request.push({index: {_index: 'jsindex', _type: 'jstype', _id: i+1}});
    bulk_request.push(obj);    
                            }
    return bulk_request;
  };
  
// Call function to get body for loading
create_bulk(br); 

// Standard function of ElasticSearch to use bulk command
client.bulk(
{
    body : br
}, function (err, resp) {
  console.log(err);
});