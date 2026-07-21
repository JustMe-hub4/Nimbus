import paho.mqtt.client as mqtt
import psycopg2
import json
import os
import time

DB_HOST = os.environ.get("DB_HOST", "localhost")
MQTT_HOST = os.environ.get("MQTT_HOST", "localhost")

def connect_db():
    while True:
        try:
            conn = psycopg2.connect(
                host=DB_HOST,
                port=5432,
                database="nimbus",
                user="nimbus",
                password="nimbus_dev_password"
            )
            print("✅ Connected to TimescaleDB")
            return conn
        except Exception as e:
            print(f"⏳ Waiting for database... {e}")
            time.sleep(3)

conn = connect_db()
cursor = conn.cursor()

def on_connect(client, userdata, flags, rc):
    print(f"✅ Connected to MQTT broker")
    client.subscribe("nimbus/telemetry")
    print("✅ Subscribed to nimbus/telemetry")

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        print(f"📥 Received: {payload}")
        cursor.execute(
            "INSERT INTO telemetry (time, device_id, temperature, humidity) VALUES (NOW(), %s, %s, %s)",
            (payload.get("deviceId"), payload.get("temperature"), payload.get("humidity"))
        )
        conn.commit()
        print(f"✅ Stored to TimescaleDB")
    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

while True:
    try:
        client.connect(MQTT_HOST, 1883, 60)
        print("🚀 Nimbus MQTT Consumer running...")
        client.loop_forever()
    except Exception as e:
        print(f"⏳ Waiting for MQTT broker... {e}")
        time.sleep(3)
