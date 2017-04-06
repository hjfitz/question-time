const 
    express      = require('express'),
    questionTime = express(),
    pages        = __dirname + '/web/',
    RateLimit    = require('express-rate-limit')
;

var count = 0

var limiter = new RateLimit({
    windowMs: 2*60*1000,
    max: 10,
    delayMs: 0
})

questionTime.use('/inc', limiter)

// basic API

questionTime.patch('/inc', (req, res) => {
    count++
    res.json({'count':count})
})

questionTime.get('/inc', (req,res) => {
    res.json({'count':count})
})

questionTime.use('/', (req, res, next) => { 
    console.log(new Date(), req.method, req.url) 
    next() 
})


questionTime.use('/', express.static(pages, { extensions: ['html'] }))

questionTime.listen(1337)
