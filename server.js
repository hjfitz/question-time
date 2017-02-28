var express = require('express')
var app = express()
var count = 0;
var pages = __dirname + '/web/'
app.post('/inc', function(req, res, next) { 
  count = count + 1;
  res.json({ "count": count })
})
app.get('/inc', function(req,res,next) {
  res.json({ "count":count})
})
app.use('/', function(req, res, next) { console.log(new Date(), req.method, req.url); next(); });
app.use('/', express.static(pages, { extensions: ['html'] }));
app.listen(1337)
