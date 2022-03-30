function open_button () {
    if (NPNBitKit.Button(DigitalPin.P6)) {
        // dong co RC 
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (receivedNumber == 1) {
        // dong co RC
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (receivedNumber == 2) {
        NPNLCD.on()
    } else if (receivedNumber == 3) {
        NPNLCD.off()
    } else if (receivedNumber == 4) {
        NPNBitKit.Buzzer(DigitalPin.P4, true)
    } else if (receivedNumber == 5) {
        NPNBitKit.Buzzer(DigitalPin.P4, false)
    }
})
function LCD () {
    NPNLCD.clear()
    NPNLCD.ShowString("people in room", 0, 0)
    NPNLCD.ShowNumber(count_people, 0, 1)
}
function IN_IR1 () {
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        while (NPNBitKit.ButtonDoorOpen(DigitalPin.P5)) {
            while (flag == 0) {
                if (pins.digitalReadPin(DigitalPin.P3) == 0) {
                    flag += flag + 1
                    count_people += count_people + 1
                    if (count_people > 10) {
                        NPNBitKit.Buzzer(DigitalPin.P4, true)
                    } else if (count_people <= 10) {
                        radio.sendString("!1:PEOPLE:" + count_people + "#")
                        radio.sendString("!1:INPEOPLE:1#")
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
                    NPNBitKit.Buzzer(DigitalPin.P4, false)
                    radio.sendString("!1:PEOPLE:" + count_people + "#")
                    radio.sendString("!1:OUTPEOPLE:1#")
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
NPNLCD.LcdInit()
NPNLCD.ShowString("Xin chao", 0, 0)
basic.forever(function () {
    LCD()
    open_button()
    IN_IR1()
    OUT_IR2()
})
