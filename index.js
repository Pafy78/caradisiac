const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var client = require('./connection.js');

const express = require('express');

const app = express();
const port = process.env.PORT || 9292;


async function print () {
    const brands = await getBrands();
    var index = 0;
    brands.forEach(async function(brand){
        const models = await getModels(brand);
        if(models.length != 0){
            models.forEach(async function(model){
                //console.log(model);
                InsertValue(model, index);
                index++;
            });
        }
    });
}
function InsertValue(value, index){
    console.log(value);
    client.index({  
        index: 'caradisiac',
        id: index,
        type: "voiture",
        body: value
    },function(err,resp,status) {
        console.log(err);
    });
}


function GetValue(callback){
    client.search({ 
        index: 'caradisiac',
        type: "voiture", 
        body:{
            "from" : 0, "size" : 100,
            "query" : {
                "range" :{
                    "volume" : {
                        "gte":500
                    }
                }
            },
            
        }
    },function (error, response,status) {
        if (error){
            console.log("search error: "+error)
        }
        else {
            /*console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");*/
            response.hits.hits.forEach(function(hit){
                //console.log(hit);
                callback(hit);
            })
        }
    });
}


app.get('/populate', (req, res) => {
    print();
});

app.get('/suv', (req, res) => {
    res.setHeader('Content-Type', 'json');
    GetValue(function(model){
        res.write(JSON.stringify(model));
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
