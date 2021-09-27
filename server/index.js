const express = require('express');
const redis = require('redis');
const Ant = require('ant-plus');
const usersData = require('./users');
const cors = require('cors');

const heartRateInit = require('./heartRateInit')

const stick = new Ant.GarminStick2;
const sensor = new Ant.HeartRateSensor(stick);
const hrScanner = new Ant.HeartRateScanner(stick);



const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


const client = redis.createClient({
    host: 'localhost',
    port: 6379
});
client.set('heartRate', 0);
heartRateInit.init();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    client.get('heartRate', (err, heartRate) => {
        res.send('Hear Rate: ' + heartRate);
    });

});

app.get('/users', (req, res) => {
        res.send(usersData);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log("Users Are", usersData);
});
