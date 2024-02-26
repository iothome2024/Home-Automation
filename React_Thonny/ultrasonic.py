
import machine
import network
import time
import ujson
from umqtt.simple import MQTTClient

# WiFi configuration
WIFI_SSID = "Secure P"
WIFI_PASSWORD = "Security@Test"

# MQTT configuration
MQTT_BROKER = "192.168.1.181"
MQTT_CLIENT_ID = "esp32_ultrasonic"
MQTT_TOPIC = b"ultrasonic_distance"
#MQTT Setup
def setup_mqtt():
    mqtt_client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER)
    mqtt_client.connect()
    return mqtt_client
# Ultrasonic sensor configuration
TRIGGER_PIN = 5 # GPIO14 for trigger pin
ECHO_PIN = 18    # GPIO12 for echo pin

def setup_wifi():
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.connect(WIFI_SSID, WIFI_PASSWORD)
    while not sta_if.isconnected():
        pass


def setup_ultrasonic_sensor():
    trigger_pin = machine.Pin(TRIGGER_PIN, machine.Pin.OUT)
    echo_pin = machine.Pin(ECHO_PIN, machine.Pin.IN)
    trigger_pin.value(0)
    return trigger_pin, echo_pin

def measure_distance(trigger_pin, echo_pin):
    trigger_pin.value(1)
    time.sleep_us(10)
    trigger_pin.value(0)
    pulse_duration = machine.time_pulse_us(echo_pin, 1, 30000)
    distance_cm = pulse_duration / 58.0
    return distance_cm

def publish_to_mqtt(mqtt_client, distance):
    mqtt_client.publish(MQTT_TOPIC, str(distance))

def main():
    setup_wifi()
    mqtt_client = setup_mqtt()
    trigger_pin, echo_pin = setup_ultrasonic_sensor()

    while True:
        distance = measure_distance(trigger_pin, echo_pin)
        print("Distance:", distance, "cm")
        message = ujson.dumps({'distance' : distance})
        #print(message)
        publish_to_mqtt(mqtt_client, message)

        time.sleep(1)

if __name__ == "__main__":
    main()
