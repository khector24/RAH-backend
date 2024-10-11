# Rainbow Ace Hardware Delivery Scheduler - Back-End

This is the back-end API for the Rainbow Ace Hardware Delivery Scheduler. It's built using Node.js, Express, and AWS DynamoDB to manage drivers, managers, and delivery schedules. This is a private internal service designed to be used with a front-end application for the Rainbow Ace Hardware team.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- AWS account (with DynamoDB)
- IAM credentials with access to DynamoDB
- Front-end application (to be connected later)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/rah-backend.git
   cd rah-backend

2. Install dependencies:
    ``bash
    npm install

3. Set up environment variables by creating a .env file:
    ``bash
    AWS_ACCESS_KEY_ID=your_access_key_id
    AWS_SECRET_ACCESS_KEY=your_secret_access_key
    AWS_DEFAULT_REGION=your_aws_region
    JWT_SECRET=your_jwt_secret

4. Start the server:
    ``bash
    npm start

## Usage

This API is intended for use with a private internal front-end system. The following routes manage driver and manager data. Make requests using Postman, curl, or the front-end once integrated.

### Key API Routes

#### Drivers
- **GET /drivers** - Retrieve all drivers (JWT protected)
- **POST /drivers** - Add a new driver (JWT protected)
- **GET /drivers/:id** - Get a driver by ID (JWT protected)
- **PUT /drivers/:id/edit** - Update driver details (JWT protected)
- **DELETE /drivers/:id** - Delete a driver (JWT protected)

#### Managers
- **GET /managers** - Retrieve all managers (JWT protected)
- **POST /managers** - Add a new manager (includes validation)
- **POST /managers/login** - Log in and receive JWT token

### Authentication

This API uses JWT for authentication. Include the token in the `Authorization` header like so:
```makefile
Authorization: Bearer <your_token>

### Error Handling

The API provides clear error messages and HTTP status codes:

- **400**: Validation issues
- **401**: Unauthorized access
- **404**: Resource not found
- **500**: Internal server error

### Notes

- This back-end will connect to a front-end system for internal use only.
- AWS DynamoDB is used for all data storage.
- Passwords are hashed using bcrypt for security.

### License

This project is private and internal to Rainbow Ace Hardware.

