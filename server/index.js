import express from "express"
// import readFile from np

const app = express();

const PORT = 8080;

app.get("/", (request, response) => {
    console.log("lmao")
    return response.status(234).send("HELLOWORLD");
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});


// var http = require('http');
// var {readFile} = require('fs');

// http.createServer(function (req, res) {
//     readFile('index.html', function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         return res.end();
//       });
// }).listen(8080);