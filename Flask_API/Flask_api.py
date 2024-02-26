from flask import Flask, jsonify, request
from influxdb_client import InfluxDBClient, Point
from flask_cors import CORS
from flask_mqtt import Mqtt

app = Flask(__name__)
CORS(app)

app.config['MQTT_BROKER_URL'] = '192.168.1.181'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_TOPIC'] = 'message'

mqtt = Mqtt(app)

#Replace these values with your InfluxDB credentials
INFLUXDB_URL = "http://localhost:8086"
INFLUXDB_TOKEN = "y5mCpNcDJPtDc964QJgeCBkQ4yy_xqmRHw2oVKCv8ZsNRoj3JTdVeJZwT2X7K01BefanYjHCQigBfnlYCf7TQw=="
INFLUXDB_ORG = "sai_ramisetti"
INFLUXDB_BUCKET = "ultrasonic"
INFLUXDB_BUCKET2 = "weather"
INFLUXDB_BUCKET3 = "airquality"


client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)

@app.route('/', methods=['GET'])
def query_data():
    query = 'from(bucket:"{}") |> range(start: -inf )'.format(INFLUXDB_BUCKET)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/temperature', methods=['GET'])
def query_temp_data():
    query = 'from(bucket:"{}") |> range(start: -inf) |> filter(fn: (r) =>  r["_field"] == "temperature")'.format(INFLUXDB_BUCKET2)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/airquality', methods=['GET'])
def query_air_data():
    query = 'from(bucket:"{}") |> range(start: -inf) |> limit(n: 100)'.format(INFLUXDB_BUCKET3)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/led', methods=['POST'])
def toggle_led():
    try:
        data = request.get_json()
        status = data.get('status', '0')  # Default to '0' if 'status' is not provided

        # Publish the status to the MQTT topic
        mqtt.publish(app.config['MQTT_TOPIC'], status)

        return jsonify({"success": True, "message": f"LED status set to {status}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)

