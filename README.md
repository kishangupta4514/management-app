# Management App

A full-stack web application for managing project data, client information, user inquiries, and newsletter subscriptions. This app features a landing page for public users and an admin panel for managing data entries.

---

## Working

This full-stack application includes a landing page displaying projects, client testimonials, a contact form, and a newsletter subscription. The admin panel allows management of projects, client information, viewing contact form submissions, and tracking newsletter subscribers, with data stored in MongoDB and handled via a backend API. 

## Admin Credentials
 For Admin login , you have to redirect to this link https://management-app-wheat.vercel.app/login
- **Email**: `test@gmail.com`
- **Password**: `test123`


---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [API Documentation](#api-documentation)
5. [Deployment](#deployment)
6. [Future Enhancements](#future-enhancements)

---

## Features

- **Landing Page**:
  - **Our Projects Section**: Displays a list of projects.
  - **Happy Clients Section**: Shows client details.
  - **Contact Form**: Collects inquiries from users.
  - **Newsletter Subscription**: Allows users to subscribe with their email.

- **Admin Panel**:
  - **Project Management**: Admin can add, view, and delete projects.
  - **Client Management**: Admin can add, view, edit, and delete client details.
  - **Contact Submissions**: Admin view of contact form responses.
  - **Newsletter Subscribers**: Admin view of all subscribed emails.

---

## Tech Stack

- **Backend**: Appwrite (database, image storage, and authentication) and Express.
- **Frontend**: React (UI components) with Tailwind CSS (styling)
- **Deployment**:
  - Backend: [Render](https://render.com)
  - Frontend: [Vercel](https://vercel.com)

---

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/kishangupta4514/management-app.git
    ```
    

2. Install the project dependencies & run Frontend:
    ```
    cd web
    npm install
    npm run dev
    ```
    
    

3. Install the project dependencies & run the server:
    ```
    cd backend
    npm install
    node main.js
    ```
    
    

4. Visit http://localhost:3000 to access the app.

---

## API Documentaion

## Authentication
- **Admin Login**: `/admin/login` - `{ email, password }`

## Clients API
- **Create Client**: `/clients` - `{ name, description, designation, image (file) }`
- **Get All Clients**: `/clients` - `[]`
- **Get Client by ID**: `/clients/:id` - `{ name, description, designation, imgUrl }`
- **Update Client**: `/clients/:id` - `{ name, description, designation, imgUrl (optional: file) }`
- **Delete Client**: `/clients/:id` - `{ message: "Client deleted successfully" }`

## Projects API
- **Create Project**: `/projects` - `{ name, description, location, image (file) }`
- **Get All Projects**: `/projects` - `[]`
- **Get Project by ID**: `/projects/:id` - `{ name, description, location, imgUrl }`
- **Update Project**: `/projects/:id` - `{ name, description, location, imgUrl (optional: file) }`
- **Delete Project**: `/projects/:id` - `{ message: "Project deleted successfully" }`

## Subscriptions API
- **Create Subscription**: `/subscriptions` - `{ clientId, planName, startDate, endDate }`

## Contact Form API
- **Create Contact Form Response**: `/contact-form` - `{ fullName, email, mobile, location }`
- **Get All Contact Form Responses**: `/get-contact-forms` - `[]`
- **Get Contact Form Response by ID**: `/contact-form/:id` - `{ fullName, email, mobile, location }`
- **Subscribe to Newsletter**: `/subscribe` - `{ email }`
- **Get All Subscribed Emails**: `/get-subscriptions` - `[]`

## Admin Routes
- **Verify Admin Token**: `/verify` - `{}` (returns status 200 on success)

---

## Deployment

- **Backend Deployment**:
  - **Platform**: The backend is hosted on Render, with secure connections and environment variables configured.
  - **Appwrite Instance**: Ensure Appwrite is running on a cloud instance or local server with public access to necessary collections.
  - **Automatic Deployment**: Render auto-deploys each time you push a new commit to the backend repository.

- **Frontend Deployment**:
  - **Platform**: The frontend is hosted on Vercel, which provides auto-deployments from GitHub with preview URLs for each branch.
  - **Environment Configuration**: Ensure that API URLs and project IDs are set in Vercel to connect React with Appwrite.
  - **Live Updates**: Each new commit will trigger a build and deployment, ensuring the latest updates are always live.

---

## Future Enhancements

- **Role-Based Access Control**:
  - Implement role-based access within Appwrite to support multiple admin levels and restrict actions based on roles.
  - For example, you might allow only certain users to delete or update entries, while others may only view data.

- **Enhanced Data Analytics**:
  - Add analytics and reporting features to provide admins with insights on user engagement, popular projects, and other metrics.

- **Optimized Caching and Performance**:
  - Use caching mechanisms, such as browser caching or a CDN, to speed up data loading on the frontend.
  - Optimize image storage and retrieval from Appwrite to reduce page load times.

- **Additional Admin Features**:
  - Allow bulk uploads of project and client data.
  - Implement a search and filter function in the admin panel to make it easier to manage large datasets.

 ---
 ## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.