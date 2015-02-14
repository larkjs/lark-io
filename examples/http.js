var io  = require('..');

var app = io();

app.io(io.http);

app.use(function*(next){
    console.log(this.req.url);
    this.res.write('How are you');
    this.res.end();
});

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
