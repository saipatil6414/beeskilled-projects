import json
import boto3
import uuid
from datetime import datetime, timezone


dynamodb = boto3.resource("dynamodb")

table = dynamodb.Table("BeeSkilledContacts")


def lambda_handler(event, context):

    try:

        name = event.get("name")
        email = event.get("email")
        message = event.get("message")


        if not name or not email or not message:

            return {

                "statusCode": 400,

                "headers": {

                    "Content-Type":
                        "application/json",

                    "Access-Control-Allow-Origin":
                        "*"

                },

                "body": json.dumps({

                    "message":
                        "All fields are required"

                })

            }


        contact_id =
            str(uuid.uuid4())


        item = {

            "id":
                contact_id,

            "name":
                name,

            "email":
                email,

            "message":
                message,

            "createdAt":
                datetime.now(
                    timezone.utc
                ).isoformat()

        }


        table.put_item(
            Item=item
        )


        return {

            "statusCode": 200,

            "headers": {

                "Content-Type":
                    "application/json",

                "Access-Control-Allow-Origin":
                    "*"

            },

            "body": json.dumps({

                "message":
                    "Contact form submitted successfully",

                "id":
                    contact_id

            })

        }


    except Exception as e:

        print(
            "ERROR:",
            str(e)
        )


        return {

            "statusCode": 500,

            "headers": {

                "Content-Type":
                    "application/json",

                "Access-Control-Allow-Origin":
                    "*"

            },

            "body": json.dumps({

                "message":
                    "Internal server error",

                "error":
                    str(e)

            })

        }