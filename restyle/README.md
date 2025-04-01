# ReStyle Fashion Store

A modern e-commerce platform for sustainable fashion built with:

- **Frontend**: Pug templates with Tailwind CSS
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT
- **DevOps**: Docker, GitHub Actions CI/CD

## Features

- User authentication (login/register)
- Product catalog with filtering
- Shopping cart functionality
- User points system
- Responsive design
- Admin dashboard

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Docker (optional)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```bash
cp .env.example .env
```
4. Initialize database:
```bash
npm run db:init
```

### Running Locally
```bash
npm start
# or for development
npm run dev
```

### Running with Docker
```bash
docker-compose up
```

## Testing
```bash
npm test
```

## CI/CD Pipeline
The project includes GitHub Actions workflow for:
- Running tests on push/pull requests
- Building and deploying Docker images

## Project Structure
```
restyle/
├── models/         # Database models
├── routes/         # API routes
├── views/          # Pug templates
├── middlewares/    # Express middlewares
├── test/           # Test files
├── server.js       # Main application file
└── initDB.js       # Database initialization
```

## License
MIT