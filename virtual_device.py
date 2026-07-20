import paho.mqtt.client as mqtt
import json
import time
import random

client = mqtt.Client()
client.connect("localhost", 1883, 60)

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
