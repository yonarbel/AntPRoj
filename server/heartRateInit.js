const redis = require('redis');
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
module.exports = {
 

    init() {
    const Ant = require('ant-plus');

    const stick = new Ant.GarminStick2;
    const sensor = new Ant.HeartRateSensor(stick);
    const hrScanner = new Ant.HeartRateScanner(stick);

    if (!stick.open()) {
        console.log(' *** ======  Stick not found! *** =======');
    } else {
        console.log(' *** ======  Stick IS IN THE HOUSE!!!! *** =======');

    }

    stick.on('startup', () => {
        //sensor.attach(0, 0);
        hrScanner.scan();
        //sensor.scan();
    });

    sensor.on('attached', (data) => {
        console.log("Attached!!!")
    });

    sensor.on('detached', (data) => {
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
        client.set('device', data.DeviceID);
        client.set('heartRate', data.ComputedHeartRate);
    });
}
    
}