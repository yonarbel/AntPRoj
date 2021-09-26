const express = require('express');
const redis = require('redis');

const Ant = require('ant-plus');
const stick = new Ant.GarminStick2;
const sensor = new Ant.HeartRateSensor(stick);
const hrScanner = new Ant.HeartRateScanner(stick);

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('heartRate', 0);

app.get('/', (req, res) => {

    client.get('heartRate', (err, heartRate) => {
        res.send('Hear Rate: ' + heartRate);
    });

});

if (!stick.open()) {
    console.log(' *** ======  Stick not found! *** =======');
}else{
    console.log(' *** ======  Stick IS IN THE HOUSE!!!! *** =======');
}

stick.on('startup',  () => {
    //sensor.attach(0, 0);
    hrScanner.scan();
    //sensor.scan();
});

sensor.on('attached',  (data) => {
   console.log("Attached!!!")
});

sensor.on('detached',  (data) => {
   console.log("DEATTACHED!!!")
});
/*sensor.on('hbData',  (data) => {
    console.log("Device ID ", data);
    console.log("Heartrate", data.ComputedHeartRate);
});*/

hrScanner.on('attached', data => {

console.log('Hr Scanner Attached');
});

hrScanner.on('hbData', data => {
    console.log(`id: ${data.DeviceID}`);
    console.log(`HeartRate: ${data.ComputedHeartRate}`);
    client.set('device', data.DeviceID );
    client.set('heartRate', data.ComputedHeartRate);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
