var io = require('..');

var app1 = io();
var app2 = io();

app1.io(io.net);
app2.io(io.net);

app1.use(function*(next){
    console.log('App 1 connected');
    yield next;
    console.log('App 1 disconnected');
});

app2.use(function*(next){
    console.log('App 2 connected');
    yield next;
    console.log('App 2 disconnected');
});

app1.route('data', function*(next){
    console.log("APP1:" + this.args[0]);
    yield next;
});

app2.route('data', function*(next){
    console.log("APP2:" + this.args[0]);
    yield next;
});

app1.attach(app2);

app1.listen(8300);
