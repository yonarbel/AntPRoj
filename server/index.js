const express = require('express');
const redis = require('redis');
const usersData = require('./users');
const cors = require('cors');

const heartRateInit = require('./heartRateInit')


const app = express();
const expressWs = require('express-ws')(app);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

/*
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('heartRate', 0);
*/
heartRateInit.init(app);

app.get('/', (req, res) => {
    res.send('Hello');
/*
    client.get('heartRate', (err, heartRate) => {
        res.send('Hear Rate: ' + heartRate);
    });
*/
});



app.get('/users', (req, res) => {
        res.send(usersData);
});




app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log("Users Are", usersData);
});
