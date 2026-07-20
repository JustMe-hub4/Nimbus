import paho.mqtt.client as mqtt
import psycopg2
import json
from datetime import datetime

# Database connection
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="nimbus",
    user="nimbus",
    password="nimbus_dev_password"
)
cursor = conn.cursor()
print("✅ Connected to TimescaleDB")

def on_connect(client, userdata, flags, rc):
    print(f"✅ Connected to MQTT broker (code {rc})")
    client.subscribe("nimbus/telemetry")
    print("✅ Subscribed to nimbus/telemetry")

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        print(f"📥 Received: {payload}")

        cursor.execute(
            "INSERT INTO telemetry (time, device_id, temperature, humidity) VALUES (NOW(), %s, %s, %s)",
            (
                payload.get("deviceId"),
                payload.get("temperature"),
                payload.get("humidity")
            )
        )
        conn.commit()
        print(f"✅ Stored to TimescaleDB")

    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)
print("🚀 Nimbus MQTT Consumer running...")
client.loop_forever()
