radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (receivedNumber == 1) {
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (receivedNumber == 2) {
        pins.digitalWritePin(DigitalPin.P0, 0)
    } else if (receivedNumber == 3) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
})
radio.setGroup(1)
let counter_sensor = 0
led.enable(false)
basic.forever(function () {
    NPNBitKit.DHT11Read(DigitalPin.P3)
    radio.sendString("!1:TEMP:" + NPNBitKit.DHT11Temp() + "#")
    radio.sendString("!1:HUMI:" + NPNBitKit.DHT11Hum() + "#")
    basic.pause(30000)
})
