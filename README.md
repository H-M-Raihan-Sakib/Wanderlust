# 🏡 Wanderlust - Listing & Booking Platform

Wanderlust is a full-stack web application inspired by Airbnb. Users can explore listings, create and manage properties, and leave reviews. The app includes authentication, session management, and a clean UI for a smooth user experience.

## 🚀 Features

* 🔐 User Authentication (Signup/Login/Logout)
* 🏠 Create, Edit, and Delete Listings
* ⭐ Add and Manage Reviews
* 📸 Image support for listings
* 🧭 RESTful routing
* 💬 Flash messages for feedback
* 🔒 Secure session storage with MongoDB
* 🗺️ Map integration using Mapbox

## 🛠️ Tech Stack

* Frontend: EJS, Bootstrap, CSS
* Backend: Node.js, Express.js
* Database: MongoDB Atlas, Mongoose
* Authentication: Passport.js
* Session Store: connect-mongo

## 📂 Project Structure

/models → Mongoose schemas
/routes → Express routes
/views → EJS templates
/public → Static assets
/utils → Error handling utilities

## ⚙️ Installation

git clone https://github.com/H-M-Raihan-Sakib/wanderlust.git
cd wanderlust
npm install

## 🔑 Environment Variables

Create a `.env` file and add:

ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token

## ▶️ Run the App

nodemon app.js

Visit: http://localhost:8080

## 🌐 Future Improvements

* Booking system
* Payment integration
* Advanced search & filters
* User profiles

## 👨‍💻 Author
* H.M. Raihan Sakib
* LinkedIn : https://www.linkedin.com/in/h-m-raihan-sakib/


