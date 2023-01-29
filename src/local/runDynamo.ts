/* eslint-disable  */
import { config } from "dotenv";
config();
import { DynamoDB } from "aws-sdk";
import DynamoDbLocal from "dynamodb-local";
import { TABLE_NAME } from "../config/constants";
const dynamoLocalPort = 8000;

const dynamo = new DynamoDB({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  endpoint: process.env.DYNAMO_ENDPOINT!,
});

async function main() {
  console.info("launching dynamo");
  const child = await DynamoDbLocal.launch(
    dynamoLocalPort,
    null,
    [],
    false,
    true
  );

  console.info("should have created table");
  await dynamo
    .createTable({
      TableName: TABLE_NAME,
      KeySchema: [
        {
          AttributeName: "pk",
          KeyType: "HASH",
        },
        {
          AttributeName: "sk",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "pk",
          AttributeType: "S",
        },
        {
          AttributeName: "sk",
          AttributeType: "S",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    })
    .promise()
    .catch(async (err) => {
      console.error(err);
      await DynamoDbLocal.stopChild(child);
    });

  console.info("done creating table");
}

main();
