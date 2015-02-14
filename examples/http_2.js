var io  = require('..');
var fs  = require('fs');

var html = fs.readFileSync('./index.html');

var app = io();

app.io(io.http);

app.use(function*(next){
    console.log(this.req.url);
    this.res.write(html);
    this.res.end();
});

app.listen(8301,function(){
    console.log("Listening at 8301...");   
});
