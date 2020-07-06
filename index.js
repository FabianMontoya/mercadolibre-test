const express = require('express');
const app = express();
const compression = require('compression');
var helmet = require('helmet');

//settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(compression());
app.use(helmet());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});


//Routes
app.use('/api/coupon', require('./routes/coupon'))

app.use((req, res) => {
  res.status(404).send({code: 404, error: true, message: "The URL " + req.originalUrl + ' not found in this server, please verify.'})
});

// Starting the server
app.listen(app.get('port'), () =>{
  console.log("Server on port ", app.get('port'));
})


//exports.app = functions.https.onRequest(app);
