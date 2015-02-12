var io  = require('..');

var app = io();

app.server(io.net);

app.use(function*(next){
    console.log('Connect');
    yield next;
    console.log('Disconnect');
});

app.route('data', function*(next){
    console.log("Receive : " + this.args[0]);
});

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
