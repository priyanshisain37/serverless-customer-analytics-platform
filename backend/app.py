from flask import Flask
from flask_cors import CORS
import boto3
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# DynamoDB Connection
dynamodb = boto3.resource(
    "dynamodb",
    region_name="ap-south-1"
)

table = dynamodb.Table("products")

# S3 Connection
s3 = boto3.client("s3")
BUCKET_NAME = "customer-analytics-logs-priyanshi"


# -------------------------
# Save Event to S3
# -------------------------

def save_event(event):
    filename = f"logs/{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}.json"

    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=filename,
        Body=json.dumps(event),
        ContentType="application/json"
    )


# -------------------------
# Home
# -------------------------

@app.route("/")
def home():
    return {"message": "Backend is running successfully"}


# -------------------------
# Get Products
# -------------------------

@app.route("/products")
def products():
    response = table.scan()
    return response["Items"]


# -------------------------
# Track Product View
# -------------------------

@app.route("/track-view/<product_id>")
def track_view(product_id):

    event = {
        "event_type": "product_view",
        "product_id": product_id,
        "timestamp": datetime.now().isoformat()
    }

    save_event(event)

    return {
        "message": "Event logged successfully"
    }


# -------------------------
# Total Views
# -------------------------

@app.route("/total-views")
def total_views():

    response = s3.list_objects_v2(
        Bucket=BUCKET_NAME,
        Prefix="logs/"
    )

    total = 0

    if "Contents" in response:
        for obj in response["Contents"]:

            if obj["Key"].endswith(".json"):
                total += 1

    return {
        "total_views": total
    }


# -------------------------
# Active Events Today
# -------------------------

@app.route("/active-events")
def active_events():

    response = s3.list_objects_v2(
        Bucket=BUCKET_NAME,
        Prefix="logs/"
    )

    today = datetime.now().date()

    total = 0

    if "Contents" in response:

        for obj in response["Contents"]:

            if obj["Key"].endswith(".json"):

                file_object = s3.get_object(
                    Bucket=BUCKET_NAME,
                    Key=obj["Key"]
                )

                file_content = file_object["Body"].read().decode("utf-8")

                event = json.loads(file_content)

                timestamp = event.get("timestamp")

                if timestamp:

                    event_date = datetime.fromisoformat(
                        timestamp
                    ).date()

                    if event_date == today:
                        total += 1

    return {
        "active_events": total
    }


# -------------------------
# Recent Events
# -------------------------

@app.route("/recent-events")
def recent_events():

    response = s3.list_objects_v2(
        Bucket=BUCKET_NAME,
        Prefix="logs/"
    )

    events = []

    if "Contents" in response:

        for obj in response["Contents"]:

            if obj["Key"].endswith(".json"):

                file_object = s3.get_object(
                    Bucket=BUCKET_NAME,
                    Key=obj["Key"]
                )

                file_content = file_object["Body"].read().decode("utf-8")

                event = json.loads(file_content)

                events.append(event)

    events.sort(
        key=lambda x: x.get("timestamp", ""),
        reverse=True
    )

    return events[:10]


# -------------------------
# Product-wise Views
# -------------------------

@app.route("/product-views")
def product_views():

    response = s3.list_objects_v2(
        Bucket=BUCKET_NAME,
        Prefix="logs/"
    )

    views = {}

    if "Contents" in response:

        for obj in response["Contents"]:

            if obj["Key"].endswith(".json"):

                file_data = s3.get_object(
                    Bucket=BUCKET_NAME,
                    Key=obj["Key"]
                )

                event = json.loads(
                    file_data["Body"].read().decode("utf-8")
                )

                product_id = event.get("product_id")

                if product_id:

                    views[product_id] = (
                        views.get(product_id, 0) + 1
                    )

    return views


# -------------------------
# Run Flask
# -------------------------

if __name__ == "__main__":
    app.run(debug=True)
