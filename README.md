# NextBuy - AI-Driven E-commerce Platform

_A full-stack e-commerce platform powered by AI for an enhanced shopping experience._

---

## Overview

**NextBuy** is an innovative e-commerce platform built to revolutionize online shopping. With AI-powered features like personalized product recommendations, an intelligent chatbot, image-based product search, and demand forecasting, NextBuy offers a seamless and futuristic shopping experience for users and robust management tools for admins.

- **Website Name**: NextBuy
- **Website URL**: [NextBuy - E-commerce Platform](https://next-buy-five.vercel.app) _(Update with live URL after deployment)_
- **Repository**: You're here!

---

## Features

### User-Facing Features

- **Home Page**: Discover featured products and AI-driven recommendations.
- **Product Listings**: Browse products with filters and search functionality.
- **Product Details**: View detailed product info, reviews, and ratings.
- **AI Image Search**: Upload an image to find matching products.
- **Shopping Cart**: Add, remove, and manage items before checkout.
- **Checkout**: Secure payment processing with Stripe or SSL Commerz.
- **Order Confirmation**: Receive instant order success feedback.
- **User Profile**: Manage account details, view order history, and update settings.
- **AI Chatbot**: Get real-time shopping assistance powered by OpenAI.

### Admin Dashboard

- **Dashboard Overview**: Monitor sales, users, and trending products.
- **Product Management**: Add, update, or delete products.
- **Order Management**: Track and update order statuses.
- **User Management**: View and manage registered users.
- **AI Analytics**: Access demand forecasting and trends with AI insights.
- **Chatbot Logs**: Review AI chatbot interactions.

---

## Tech Stack

| **Component**      | **Technology**            |
| ------------------ | ------------------------- |
| Frontend & Backend | Next.js                   |
| Styling            | Tailwind CSS, ShadCN      |
| Database           | MongoDB (Mongoose)        |
| AI Integration     | OpenAI API, TensorFlow.js |
| Payments           | Stripe or SSL Commerz     |

---

## Project Structure

```
ai-ecommerce/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Header, Footer, Sidebar
│   │   ├── ui/          # Buttons, Inputs (ShadCN)
│   ├── features/        # Redux slices (cart, product, user)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (API, auth, MongoDB)
│   ├── models/          # Mongoose schemas (product, order, user)
│   ├── pages/           # Next.js page routes
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── auth/        # Login, Register pages
│   ├── pages/api/       # Backend API routes
│   ├── providers/       # Redux store, Theme provider
│   ├── styles/          # Tailwind & global styles
│   ├── utils/           # Helper functions
│   ├── middleware.ts    # Authentication middleware
├── config/              # Project configurations
├── tailwind.config.js   # Tailwind CSS config
├── next.config.js       # Next.js config
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript config
```

---

## API Endpoints

### User API Routes

| **Method** | **Endpoint**           | **Description**             |
| ---------- | ---------------------- | --------------------------- |
| GET        | `/api/products`        | Fetch all products          |
| GET        | `/api/products/:id`    | Fetch product details       |
| POST       | `/api/cart`            | Add product to cart         |
| DELETE     | `/api/cart/:id`        | Remove item from cart       |
| POST       | `/api/checkout`        | Process payment (Stripe)    |
| POST       | `/api/image-search`    | AI-powered image matching   |
| POST       | `/api/chat`            | AI chatbot interaction      |
| POST       | `/api/recommendations` | Generate AI recommendations |
| GET        | `/api/orders`          | Retrieve order history      |
| POST       | `/api/orders`          | Save new order details      |

### Admin API Routes

| **Method** | **Endpoint**              | **Description**             |
| ---------- | ------------------------- | --------------------------- |
| GET        | `/api/admin/products`     | Fetch all products          |
| POST       | `/api/admin/products`     | Add a new product           |
| PUT        | `/api/admin/products/:id` | Update product details      |
| DELETE     | `/api/admin/products/:id` | Remove a product            |
| GET        | `/api/admin/orders`       | Fetch all orders            |
| PUT        | `/api/admin/orders/:id`   | Update order status         |
| GET        | `/api/admin/users`        | Fetch all users             |
| DELETE     | `/api/admin/users/:id`    | Remove a user               |
| GET        | `/api/admin/analytics`    | Fetch AI demand forecasting |
| GET        | `/api/admin/chat-logs`    | Fetch chatbot logs          |

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- API keys for OpenAI, Stripe (or SSL Commerz), and TensorFlow.js

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arifhassansky/nextBuy.git
   cd nextBuy
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables (create `.env.local`):

   ```
    # FORNTEND ENV
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=*******************
    NEXT_PUBLIC_API_URL=http://localhost:3000
    NEXT_PUBLIC_IMAGEBB_API=******************************
    NEXT_PUBLIC_MONGODB_URI=******************************

    # BACKEND ENV
    DB_USER=******************************
    DB_PASSWORD=******************************
    NEXTAUTH_URL=http://localhost:3000/
    JWT_SECRET=******************************
    NEXTAUTH_SECRET=******************************
    GOOGLE_CLIENT_SECRET=******************************
    GOOGLE_CLIENT_ID=******************************
    GEMINI_API_KEY=******************************
    GITHUB_ID=******************************
    GITHUB_SECRET=******************************
    STRIPE_SECRET_KEY=******************************
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Implementation Plan

1. **Project Setup**: Initialize Next.js, install dependencies, configure Tailwind CSS.
2. **Backend Setup**: Connect MongoDB, define Mongoose models, create API routes.
3. **Frontend Development**: Build UI with ShadCN, integrate NextAuth.js, develop AI features.
4. **Payments & Deployment**: Add Stripe for payments, deploy to Vercel with MongoDB Atlas.

---

## Team

### Work Distribution

- **Frontend**: Himel Mia, Salenkin Imran, Ayesha Ferdous
- **Backend**: Md Ranju, Md. Arif Hassan

---

## Deployment

- **Platform**: Vercel (Frontend & Backend)
- **Database**: MongoDB Atlas
- **Live URL**: _(Add after deployment)_

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ by the NextBuy Team | Last Updated: April 09, 2025_
