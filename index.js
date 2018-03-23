var client = require('./connection.js');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//SearchValue();


function SearchValue(callback){
    client.search({ 
        index: 'caradisiac',
        type: "voiture"
    },function (error, response,status) {
        if (error){
            console.log("search error: "+error)
        }
        else {
            console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");
            response.hits.hits.forEach(function(hit){
                console.log(hit);
                callback(hit);
            })
        }
    });
}



app.get('/api/all', (req, res) => {
    SearchValue(function(model){
        res.write(model);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
