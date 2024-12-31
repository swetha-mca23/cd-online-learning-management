# cd-online-learning-management

<h2> Installation</h2>
<h4>Follow these steps to set up online learning portal  on your local machine:</h4>

1) Clone the repository: 
git clone https://github.com/swetha-mca23/cd-online-learning-management
2) Install dependencies: 
Navigate to the client directory and install frontend dependencies:
<div>
cd client
npm install
</div>

Next, open a new terminal tab, navigate to the server directory and install backend dependencies:
<div>
cd server
npm install
npm init
</div>

3)Set up Environment Variables:
Create a .env file in both the client and server directories and define the following variables in the .env file:

4)Run the Backend Server:
Navigate to the server directory and run:
nodemon index.js

5)Run the Frontend folder:

Navigate to the client directory and run:
npm start

After running this command, the project will start running locally at http://localhost:3000

<h2>Technologies Used</h2>

React.js: Frontend library for building the user interface.
Node.js: JavaScript runtime environment for running server-side code.
Express.js: Backend framework for handling HTTP requests and response.
MongoDB: Database for storing users datas.
JWT (JSON Web Tokens): Used for user authentication and authorization.

<h2>Features</h2>

1) User Management

*Student and instructor registration.
*User authentication and role-based access control.

2) Course Management

* Create, update, and delete courses.
* Assign instructors to courses.
  Content Delivery

3) Upload and manage course materials (videos, PDFs, quizzes, etc.).
4) Interactive learning modules.
5) Create and manage  assignments.
6) Track student progress.
7) Generate detailed reports on course performance.


<h2>Overview</h2>

The Online Learning Management System (LMS) is a comprehensive platform designed to facilitate online education. 
It provides tools for managing courses, students, instructors, and assignments while offering an engaging user experience for learners and educators.



