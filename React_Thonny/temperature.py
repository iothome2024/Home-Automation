import dht
import machine
import time

# Define the pin where the DHT11 data pin is connected
dht_pin = 5  # Change this to the appropriate pin on your board

# Create a DHT object
dht_sensor = dht.DHT11(machine.Pin(dht_pin))

while True:
    try:
        # Trigger a measurement and wait for the result
        dht_sensor.measure()
        
        # Read temperature and humidity
        temperature = dht_sensor.temperature()
        humidity = dht_sensor.humidity()

        # Print the temperature and humidity
        print("Temperature: {:.2f} °C".format(temperature))
        print("Humidity: {:.2f} %".format(humidity))

    except Exception as e:
        print("Error reading from DHT11:", e)

    # Wait for some time before taking the next reading
    time.sleep(100)  # Adjust this value as needed
