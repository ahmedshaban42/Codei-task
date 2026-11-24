Codei Task - Courses API
REST API for a small course platform, built with Node.js, Express and MongoDB. Users sign up and confirm their email with an OTP, log in with JWT, and manage courses with image upload to Cloudinary.
Live: https://codei-task.vercel.app
Features
Sign up with validation (Joi): name, email, strong password, confirm password, 11-digit mobile number, gender
Email confirmation with a hashed OTP that expires after 10 minutes (sent with Nodemailer)
Login that returns an access token and a refresh token (JWT)
Mobile numbers are encrypted before they are saved (crypto-js)
Passwords are hashed with bcrypt
Auth and role middleware, with a blacklist model for revoked tokens
Courses CRUD with image upload (Multer + Cloudinary); the old image is deleted when it is replaced or the course is removed
Central error handler and request validation middleware
Tech stack
Node.js, Express 5, MongoDB, Mongoose, JWT, bcrypt, Joi, Multer, Cloudinary, Nodemailer, crypto-js. Deployed on Vercel.
API
Base path examples: `/user` and `/course`.
Method	Endpoint	Auth	Description
POST	`/user/api/signUpUser`	No	Create an account and send the OTP email
PUT	`/user/api/confirmEmail`	No	Confirm the email with the OTP
POST	`/user/api/signInUser`	No	Log in, returns `accesstoken` and `refreshtoken`
POST	`/course/api/addNewCourse`	`accesstoken` header	Add a course (form-data with `image`)
GET	`/course/api/courses`	No	List all courses
GET	`/course/api/courses/:id`	No	Get one course
PUT	`/course/api/courses/:id`	`accesstoken` header	Update a course and optionally its image
DELETE	`/course/api/courses/:id`	`accesstoken` header	Delete a course and its image
A course has: `title`, `description`, `price`, `startDate`, `endDate`, `image`.
Project structure
```
src/
  DB/            connection and Mongoose models (user, course, blacklist)
  modules/       auth-user and course (controller + service)
  middleware/    authentication, validation, multer, error handler
  validators/    Joi schemas
  services/      email sender
  utils/         token, encryption, router setup
```
Run locally
```bash
git clone https://github.com/ahmedshaban42/Codei-task.git
cd Codei-task
npm install
```
Create `src/config/.dev.env` with these variables:
```
PORT=
DB_URL=
SALT=
ENCRYPTED_KEY_PHONE=
USER_EMAIL=
USER_PASS=
JWT_ACCESS_TOKEN_SECRETKEY_LOGIN=
JWT_ACCESS_TOKEN_EXP_LOGIN=
JWT_REFRESH_TOKEN_SECRETKEY_LOGIN=
JWT_REFRESH_TOKEN_EXP_LOGIN=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_FOLDER=
```
Then start it:
```bash
npm run start:dev   # development (uses NODE_ENV=dev)
npm start           # production
```
Author
Ahmed Shaban - github.com/ahmedshaban42
