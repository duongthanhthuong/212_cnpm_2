def on_received_number(receivedNumber):
    if receivedNumber == 0:
        pins.digital_write_pin(DigitalPin.P1, 0)
    elif receivedNumber == 1:
        pins.digital_write_pin(DigitalPin.P1, 1)
    elif receivedNumber == 2:
        pins.digital_write_pin(DigitalPin.P0, 0)
    elif receivedNumber == 3:
        pins.digital_write_pin(DigitalPin.P0, 1)
radio.on_received_number(on_received_number)

def IN_IR1():
    global flag, count_people
    if pins.digital_read_pin(DigitalPin.P2) == 0:
        while NPNBitKit.button_door_open(DigitalPin.P5):
            while flag == 0:
                if pins.digital_read_pin(DigitalPin.P3) == 0:
                    flag += flag + 1
                    count_people += count_people + 1
            flag = 0
def OUT_IR2():
    global flag, count_people
    if pins.digital_read_pin(DigitalPin.P3) == 0:
        while NPNBitKit.button_door_open(DigitalPin.P5):
            while 0 == 0:
                if pins.digital_read_pin(DigitalPin.P2) == 0:
                    flag += flag + 1
                    count_people += count_people + 1
count_people = 0
flag = 0
radio.set_group(1)
flag = 0
count_people = 0

def on_forever():
    basic.pause(30000)
basic.forever(on_forever)
