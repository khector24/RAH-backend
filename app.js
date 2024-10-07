require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const port = 3000;

const cognito = new AWS.CognitoIdentityServiceProvider();

const userPoolId = process.env.COGNITO_USER_POOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;
const region = process.env.AWS_REGION;

const deliveriesRoutes = require('./routes/deliveries');
const driversRoutes = require('./routes/drivers')

app.use('/deliveries', deliveriesRoutes)
app.use('/drivers', driversRoutes)

app.get('/', (req, res) => (
    res.send("Hello World!")
));

app.get('/sign-up', (req, res) => (
    res.send('sign-up to be a manager')
));

app.get('/login', (req, res) => (
    res.send('Please login to use the site')
));






app.listen(port, () => (
    console.log(`Listening on port ${3000}`)
));