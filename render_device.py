import psycopg2
import json
import time
import random

conn = psycopg2.connect(
    "postgresql://nimbus_qtlj_user:JFaEFRVyvQ2pJlSAycHdYWRD6vfBzM95@dpg-d9fbvcfavr4c73bu1tcg-a.virginia-postgres.render.com/nimbus_qtlj",
    sslmode='require'
)
cursor = conn.cursor()
print("✅ Connected to Render database")
print("📡 Sending telemetry every 10 seconds...")

while True:
    payload = (
        "virtual-001",
        round(random.uniform(18, 35), 2),
        round(random.uniform(40, 85), 2)
    )
    cursor.execute(
        "INSERT INTO telemetry (time, device_id, temperature, humidity) VALUES (NOW(), %s, %s, %s)",
        payload
    )
    conn.commit()
    print(f"📤 Sent: temp={payload[1]}°C humidity={payload[2]}%")
    time.sleep(10)
