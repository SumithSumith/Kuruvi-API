# Kuruvi API Platform Documentation

## Overview
Kuruvi API Platform is a comprehensive API management solution with integrated AI capabilities through Kuruvi GPT.

## Features

### 1. Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control
- Rate limiting and API key management

### 2. API Management
- API key generation and management
- Usage monitoring and analytics
- Webhook integrations
- IP whitelisting

### 3. Kuruvi GPT Integration
- AI-powered chat interface
- GPT-4 integration
- Customizable response parameters
- Streaming responses

### 4. Security Features
- AWS IAM integration
- Stripe payment processing
- DDoS protection
- Data encryption
- Regular security audits

### 5. Pricing Plans
- Free tier: 5,000 API calls/month
- Pro tier: 100,000 API calls/month (₹2,499/month)
- Enterprise tier: Unlimited calls (₹8,499/month)

## Technical Architecture

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Real-time updates
- Responsive design

### Backend
- Node.js/Express
- AWS DynamoDB
- OpenAI GPT integration
- WebSocket support

### Security
- JWT authentication
- Rate limiting
- IP whitelisting
- CORS protection
- XSS prevention

## API Documentation

### Authentication
\`\`\`
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
\`\`\`

### API Keys
\`\`\`
GET /api/keys
POST /api/keys
DELETE /api/keys/:id
\`\`\`

### Kuruvi GPT
\`\`\`
POST /api/chat
GET /api/chat/history
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Set up environment variables
4. Run development server: \`npm run dev\`

## Environment Variables
Required environment variables:
- AWS credentials
- Stripe API keys
- JWT secret
- OpenAI API key
- Database connection strings

## Security Best Practices
1. Regular key rotation
2. Monitor API usage
3. Set up alerts
4. Enable 2FA
5. Use strong passwords
6. Keep dependencies updated

## Support
For support, contact:
- Email: support@kuruvi.com
- Documentation: docs.kuruvi.com
- GitHub: github.com/kuruvi-api