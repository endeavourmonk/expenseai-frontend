# ExpensAI - Intelligent Expense Management System

![Project License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6.svg)

ExpensAI is a full-stack expense management platform with AI-powered insights, featuring robust backend services and a modern React-based frontend.

## 📌 Features

### Backend Services

- JWT-based authentication with Google OAuth
- AI-powered expense categorization (OpenAI/DeepSeek)
- Redis caching for performance optimization
- Algolia integration for search capabilities
- Prisma ORM with PostgreSQL support
- Winston logging with file rotation
- Rate limiting and request validation
- Swagger/OpenAPI documentation

### Frontend

- Modern React 19 with Vite
- Shadcn UI component library
- Tailwind CSS with custom theming
- Responsive layout system
- JWT-based session management
- Chart visualization for financial data
- Internationalization support
- Accessibility (a11y) compliant

## 🛠 Tech Stack

**Backend**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)

**Frontend**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)

**AI & Services**  
![OpenAI](https://img.shields.io/badge/-OpenAI-412991?logo=openai&logoColor=white)
![Algolia](https://img.shields.io/badge/-Algolia-5468FF?logo=algolia&logoColor=white)
![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white)

## 🚀 Installation

### Prerequisites

- Node.js 18.x+
- PostgreSQL 15+
- Redis 7+
- PNPM 8.x+

```bash
# Clone repository
git clone https://github.com/your-org/expensiai.git
cd expensiai
```

### Backend Setup

```bash
cd expensiai-backend
pnpm install

# Configure environment
cp .env.example .env
# Update .env with your credentials

# Database setup
npx prisma generate
npx prisma migrate dev

# Start development server
pnpm dev
```

### Frontend Setup

```bash
cd expensiai-frontend
pnpm install
pnpm dev
```

## ⚙ Configuration

### Environment Variables

Backend (`.env`):

```ini
# Core
NODE_ENV=production
PORT=3000
JWT_SECRET=your_jwt_secret

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/expensiai"

# AI Services
DEEPSEEK_R1_API_KEY=your_api_key
ALGOLIA_APP_ID=your_algolia_id
ALGOLIA_API_KEY=your_algolia_key

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_pass
```

## 📦 Production Deployment

### Docker Setup

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
```

### Deployment Platforms

- **Backend**: Docker Swarm/Kubernetes with Redis/PostgreSQL clusters
- **Frontend**: Vercel/Netlify with CDN caching
- **Database**: AWS RDS PostgreSQL with read replicas
- **Storage**: S3-compatible storage for media files

## 📄 API Documentation

Access Swagger UI at `/api-docs` after starting the backend:

```yaml
openapi: 3.0.0
info:
  title: ExpensAI API
  version: 1.0.0
servers:
  - url: http://localhost:3000/api
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E testing
pnpm test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feat/your-feature`
5. Open pull request

**Code Standards:**

- TypeScript strict mode
- ESLint + Prettier enforced
- Conventional commits
- 80% test coverage required

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

## 🔒 Security

Report vulnerabilities to security@yourdomain.com  
Key security features:

- JWT encryption with HS512
- Environment variable encryption
- SQL injection protection
- Rate limiting (100 req/min)
- CSP headers enabled
- Regular dependency audits

## 🌐 Architecture

```mermaid
graph TD
    A[Client] --> B[NGINX]
    B --> C[Frontend]
    B --> D[API Gateway]
    D --> E[Auth Service]
    D --> F[Expense Service]
    D --> G[AI Service]
    E --> H[(PostgreSQL)]
    F --> H
    G --> I[(Redis)]
    G --> J[AI Providers]
```

---

> **Note**: For detailed contributor guidelines and project roadmap, see [CONTRIBUTING.md](CONTRIBUTING.md)
