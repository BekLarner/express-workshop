var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require ('fs');
var fileName = __dirname + '/data/posts.json';

function makeTimestamp(){
    return Math.floor(Date.now() / 1000);
}

app.use(express.static("public"));
app.use(formidable());

app.get('/get-posts', function(req, res){
    fs.readFile(fileName, function (error, file) {
        var parsedFile = JSON.parse(file);
        res.json(parsedFile);
    });
});

app.post('/create-post', function (req, res){
    // console.log('/create-post');
    // console.log('req.fields', req.fields);
    fs.readFile(fileName, function (error, file) {
        var parsedFile = JSON.parse(file);
        
        console.log('parsedFile 1', parsedFile);
        
        parsedFile[makeTimestamp()] = req.fields.blogpost;
        
        var newFile = JSON.stringify(parsedFile);
        
        fs.writeFile(fileName, newFile, function (error) {
            console.log('parsedFile 2', parsedFile);
        });
        
    });
});



app.listen(8080, function () {
    console.log('Server is listening on the port 8080.  Ready to accept requests!');
});

