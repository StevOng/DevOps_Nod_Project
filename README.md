# DevOps_Nod_Project
Membuat Website Face Detection yang dapat mengekstrak informasi seperti ekspresi muka, estimasi umur, serta prediksi jenis kelamin berdasarkan analisis fitur pada wajah.

## Installation and Setup
Follow these steps to run the application on your local machine:

Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/StevOng/DevOps_Nod_Project.git
```

Navigate into the project directory:

```bash
cd DevOps_Nod_Project
```

Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

Set Up the Database

- Ensure your MySQL server is running.
- Update the database configuration in the ./models/model.js file according to your MySQL setup (database name, username, password, host, etc.).
Run the Application

After installing the dependencies and setting up the database, run the application with:

```bash
node index.js
```

Alternatively, if you have nodemon installed for auto-reloading:

```bash
nodemon index.js
```

Access the Application

Open your browser and navigate to:

```bash
http://localhost:3000
```

The application will be running on port 3000 by default.
