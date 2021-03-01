const express = require('express');
const bodyParser = require('body-parser');
const config = require('app-config');
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect(config.db.url, 
{ 
	useCreateIndex: true, 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(()=> console.log('DB connected successfully.')
).catch(err => console.log('DB connection failed ' + err)
);
// This will allow all the routes to be accessed anywhere on the web
//app.use(cors())

const allowlist = [''];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
    //let isExtensionAllowed = req.path.endsWith('.jpg');

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));

app.use(helmet());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    res.status(404).send('Service Not Found 404');
    err.status = 404;
    next(err);
});

const server = app.listen(port, () => console.log('Server is up and running'));
