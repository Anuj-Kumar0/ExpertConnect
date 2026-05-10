# ExpertConnect

A full-stack MERN application that allows users to browse experts, book sessions, and receive real-time slot updates using Socket.io.

-Live Link: https://expert-connect-mu.vercel.app/ (Please wait for around 45 seconds to let the backend start)

## Features

- Expert listing with:
  - Search
  - Category filter
  - Pagination

- Expert detail page:
  - Available slots grouped by date
  - Real-time slot updates

- Booking system:
  - Session booking form
  - Validation
  - Success/error handling

- My Bookings page:
  - Fetch bookings using email
  - Booking status management

- Real-time communication using Socket.io

- Prevents double booking using:
  - MongoDB compound unique indexes
  - Backend validation

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io

## Folder Structure

```bash
backend/
frontend/
```

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=get_your_Mongo_atlas_URI
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## API Endpoints

### Experts

```http
GET /api/experts
GET /api/experts/:id
```

### Bookings

```http
POST /api/bookings
GET /api/bookings?email=
PATCH /api/bookings/:id/status
GET /api/bookings/expert/:expertId
```

## Key Engineering Concepts

### Real-Time Updates
Socket.io is used to instantly update booked slots across all connected clients.

### Double Booking Prevention
MongoDB compound unique indexes prevent multiple users from booking the same expert, date, and slot simultaneously.

### Pagination
Server-side pagination implemented using query parameters.

## Future Improvements

- Authentication & Authorization
- Admin dashboard
- Payment integration
- Email notifications
- Calendar integration

##Deployments

-Backend deployed on Render - https://expertconnect-jsud.onrender.com/
-Frontend deployed on Vercel - https://expert-connect-mu.vercel.app/