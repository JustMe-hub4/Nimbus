import paho.mqtt.client as mqtt
import json
import time
import random
import os

MQTT_HOST = os.environ.get("MQTT_HOST", "localhost")

while True:
    try:
        client = mqtt.Client()
        client.connect(MQTT_HOST, 1883, 60)
        print("🌡️  Virtual Device 001 — Online")
        print("📡 Sending telemetry every 5 seconds...")
        while True:
            payload = {
                "deviceId": "virtual-001",
                "temperature": round(random.uniform(18, 35), 2),
                "humidity": round(random.uniform(40, 85), 2),
                "pressure": round(random.uniform(1008, 1025), 2)
            }
            client.publish("nimbus/telemetry", json.dumps(payload))
            print(f"📤 Sent: {payload}")
            time.sleep(5)
    except Exception as e:
        print(f"⏳ Waiting for MQTT broker... {e}")
        time.sleep(3)
