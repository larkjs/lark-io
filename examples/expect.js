var io = require('io');

var app   = io();
var ws_app = io();

app.io(io.http);
app.io(io.socketio);

app.use(...);
ws_app.use(...);

app.attach(ws_app);

app.listen(...);
