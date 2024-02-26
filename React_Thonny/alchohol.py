from machine import Pin
import time

# Define the GPIO pin connected to the digital output of the sensor
SENSOR_PIN = 2 # Replace with the GPIO pin you have connected the sensor to

# Configure the pin as an input
sensor = Pin(SENSOR_PIN, Pin.IN)

def read_sensor():
    try:
        while True:
            # Read digital value from the sensor
            digital_value = sensor.value()
            
            # Print the digital value
            print("Digital Value: {}".format(digital_value))
            
            # Wait for a moment before reading again
            time.sleep(5)

    except KeyboardInterrupt:
        print("Program terminated.")

if __name__ == "__main__":
    read_sensor()