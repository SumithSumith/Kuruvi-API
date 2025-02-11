import { DynamoDB } from 'aws-sdk';

// AWS Configuration
export const awsConfig = {
  region: process.env.AWS_REGION || 'your-region',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  dynamodb: {
    endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  }
};

// Initialize DynamoDB client
export const dynamoDb = new DynamoDB.DocumentClient({
  ...awsConfig,
  apiVersion: '2012-08-10',
});