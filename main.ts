function open_button () {
    if (NPNBitKit.Button(DigitalPin.P6)) {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
}
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
function IN_IR1 () {
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        while (NPNBitKit.ButtonDoorOpen(DigitalPin.P5)) {
            while (flag == 0) {
                if (pins.digitalReadPin(DigitalPin.P3) == 0) {
                    flag += flag + 1
                    count_people += count_people + 1
                    if (count_people > 10) {
                        NPNBitKit.Buzzer(DigitalPin.P4, true)
                    }
                }
            }
            flag = 0
        }
    }
}
function OUT_IR2 () {
    if (pins.digitalReadPin(DigitalPin.P3) == 0) {
        while (NPNBitKit.ButtonDoorOpen(DigitalPin.P5)) {
            while (flag == 0) {
                if (pins.digitalReadPin(DigitalPin.P2) == 0) {
                    flag += flag + 1
                    count_people += count_people - 1
                    if (count_people <= 10) {
                        NPNBitKit.Buzzer(DigitalPin.P4, false)
                    }
                }
            }
            flag = 0
        }
    }
}
let count_people = 0
let flag = 0
radio.setGroup(1)
flag = 0
count_people = 0
basic.forever(function () {
    basic.pause(30000)
})
