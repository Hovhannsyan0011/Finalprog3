var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

Grass = require("./grass.js");
Xotaker = require("./xotaker.js");
Gishatich = require("./gishatich.js");
Tang = require("./tang.js");
Arj = require("./arj.js");
random = require("./random.js");

grassArr = [];
xotakerArr = [];
GishatichArr = [];
TangArr = [];
arjArr = [];
grassHashiv = 0;

var n = 30;
var m = 30;

function fillMatrix(n, m) {
    var mx = []
    for (var i = 0; i < n; i++) {
        mx.push([])
        for (var j = 0; j < m; j++) {
            mx[i].push(Math.round(Math.random() * 5))
        }
    }
    return mx;
}



matrix = fillMatrix(n, m);
function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y)
                xotakerArr.push(xt)
            }
            else if (matrix[y][x] == 3) {
                var gsh = new Gishatich(x, y)
                GishatichArr.push(gsh)
            }
            else if (matrix[y][x] == 4) {
                var mr = new Tang(x, y)
                TangArr.push(mr)
            }
            else if (matrix[y][x] == 5) {
                var end = new Arj(x, y)
                arjArr.push(end)
            }
        }
    }
}
creatingObjects();

function drawserver() {


    for (var i in grassArr) {
        grassArr[i].mult()
    }


    for (var i in xotakerArr) {
        xotakerArr[i].eat()
        xotakerArr[i].move()
        xotakerArr[i].mult()
        xotakerArr[i].die()
    }
    for (var i in GishatichArr) {
        GishatichArr[i].eat()
        GishatichArr[i].move()
        GishatichArr[i].mult()
        GishatichArr[i].die()
    }
    for (var i in TangArr) {
        TangArr[i].eat()
        TangArr[i].move()
        TangArr[i].mult()
        TangArr[i].die()
    }

    for (var i in arjArr) {
        arjArr[i].eat()
        arjArr[i].move()
        arjArr[i].mult()
        arjArr[i].die()
    }
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    io.sockets.emit("data", sendData);

}
setInterval(drawserver, 1000);