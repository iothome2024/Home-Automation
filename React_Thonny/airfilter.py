from machine import ADC, Pin, PWM
import network
import time
import utime
import ujson
from umqtt.simple import MQTTClient

timestamp = utime.time()
time_tuple = utime.localtime(timestamp)
formatted_date = "{:02d}/{:02d}/{:04d} {:02d}:{:02d}:{:02d}".format(time_tuple[2], time_tuple[1], time_tuple[0], time_tuple[3], time_tuple[4], time_tuple[5])

# Create an ADC object
adc = ADC(Pin(34))

# Create a PWM object
pwm = PWM(Pin(2))  # Use the correct pin number for your setup

# Function to read dust density from GP2Y10 sensor
# WiFi configuration
WIFI_SSID = "Secure P"
WIFI_PASSWORD = "Security@Test"

def setup_wifi():
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.connect(WIFI_SSID, WIFI_PASSWORD)
    while not sta_if.isconnected():
        pass

# MQTT configuration
MQTT_BROKER = "192.168.1.181"
MQTT_CLIENT_ID = "airquality"
MQTT_TOPIC = b"airquality"
#MQTT Setup
def setup_mqtt():
    mqtt_client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER)
    mqtt_client.connect()
    return mqtt_client

def read_dust_density():
    voltage = adc.read() * 3.3 / 4095
    dust_density = max(0, 0.17 * voltage - 0.1) * 1000  # Convert from mg/m3 to µg/m3
    return dust_density

def publish_to_mqtt(mqtt_client, dust_density):
    mqtt_client.publish(MQTT_TOPIC, str(dust_density))
    
def main():
    setup_wifi()
    mqtt_client = setup_mqtt()
    
    while True:
        dust_density = read_dust_density()
        print("Air Quality Index: ", dust_density, "µg/m3")
    
        message = ujson.dumps({
                               'airquality' : dust_density
                               })
        print(message)
        publish_to_mqtt(mqtt_client, message)

    # Map dust density to PWM duty cycle
        duty_cycle = int(dust_density * 1023 / 100)  # Adjust this calculation as needed
        duty_cycle = min(1023, duty_cycle)  # Ensure duty cycle does not exceed 1023

        pwm.duty(duty_cycle)
    
    

    # Display whether the dust level is good or bad
        if dust_density <= 50:  # Convert 10 mg/m3 to µg/m3
            print("Dust level is good.")
        elif dust_density > 50   and dust_density <= 150:
            print("Dust level is moderate.")
        else:
            print("Dust level is unhealthy.")

        time.sleep(3)

    
if __name__ == "__main__":
    main()

    
