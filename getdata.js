const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var client = require('./connection.js');

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

print();

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