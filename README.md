
# Bi_Cycle_Store

A backend API for managing a bicycle store, built with TypeScript, Express, and MongoDB. This project includes features such as product management, order processing, and schema validation using Zod.

---

## 🚀 Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for handling HTTP requests.
- **TypeScript**: Typed superset of JavaScript for better development experience.
- **Mongoose**: ODM library for MongoDB to handle database interactions.

### Development Tools
- **ts-node-dev**: Development server for running TypeScript files with hot-reloading.
- **TypeScript**: For static typing.
- **Zod**: Schema validation and type safety for request data.
- **ESLint**: Linting tool for maintaining code quality.
- **Prettier**: Code formatting for consistent style.

---

## ⚙️ Features

- Manage products in the store.
- Process and validate orders.
- Validate request data with Zod.
- Asynchronous error handling.
- Easily extensible with TypeScript.

---

## 🛠 Prerequisites

Make sure you have the following installed on your machine:
1. **Node.js** (v18 or higher)
2. **npm** (v8 or higher)
3. **MongoDB** (running locally or on a remote server)

---

## 🔧 Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bi_cycle_store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Access the server at:
   ```
   http://localhost:5000
   ```

---

## 🚧 Scripts

- **Start the development server**:  
  ```bash
  npm start
  ```
- **Build the project**:  
  ```bash
  npm run build
  ```
- **Lint the code**:  
  ```bash
  npm run lint
  ```
- **Fix lint errors**:  
  ```bash
  npm run lint:fix
  ```
