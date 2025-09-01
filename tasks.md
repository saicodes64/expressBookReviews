Here’s your Step-by-Step Plan converted cleanly into Markdown:

# 📚 Backend Book Review App – Step-by-Step Plan

---

## Part A: Fork & Clone the Repository
- Fork the GitHub repository to your own GitHub account.
- Clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME

	•	Explore the folder structure:
	•	index.js → Main app entry point.
	•	router/general.js → Public routes.
	•	router/auth_users.js → Authenticated user routes.
	•	router/booksdb.js → Mock database.

⸻

Part B: Environment Setup
	•	Run npm init -y (if not already done).
	•	Install required packages:

npm install express jsonwebtoken express-session

	•	Start the server:

node index.js

	•	Confirm server is running at http://localhost:5000.
	•	Set up Postman (or Thunder Client in VS Code) to test endpoints later.

⸻

Part C: Basic Public Endpoints (Read-Only)
	•	Implement these in general.js:
	•	GET / → Get all books.
	•	GET /isbn/:isbn → Get book details by ISBN.
	•	GET /author/:author → Get books by author.
	•	GET /title/:title → Get books by title.
	•	GET /review/:isbn → Get reviews for a book.
	•	Test these routes in Postman.

⸻

Part D: User Registration
	•	Complete isValid(username) to check if a username already exists.
	•	Implement POST /register in general.js:
	•	Accept username & password.
	•	Add the user to the users array.
	•	Test user registration using Postman.

⸻

Part E: Authentication with JWT & Sessions
	•	Complete authenticatedUser(username, password) in auth_users.js.
	•	Implement POST /login route:
	•	If valid, generate JWT using jsonwebtoken.
	•	Store JWT in req.session.authorization.
	•	In index.js, complete this middleware:

app.use("/customer/auth/*", function auth(req, res, next) {
    // Verify JWT from session
});

	•	Test login and ensure protected routes require authentication.

⸻

Part F: Authenticated Book Review Features
	•	Implement PUT /auth/review/:isbn in auth_users.js:
	•	Logged-in users can add or update reviews for a book.
	•	Bonus: Implement DELETE /auth/review/:isbn for removing reviews.
	•	Test all review routes in Postman.

⸻

Part G: CRUD Practice with Async/Await & Promises
	•	Refactor routes to use async/await or Promises (even if data is from a static object).
	•	Example challenges:
	•	Use async to get all books.
	•	Use Promises to get books by ISBN/Author/Title.
	•	Retest all endpoints after refactor.
	•	Store secret key in a config file.

⸻

Part H: Testing & Cleanup
	•	Write test scenarios in Postman:
	•	Register → Login → Add Review → Update Review → Delete Review.
	•	Check error handling for invalid users, missing fields, or wrong ISBN.
	•	Clean up logs and add meaningful messages to responses.

⸻

Part I: Advanced Extensions (Optional)
	•	Add logout route (clear session).
	•	Hash passwords using bcrypt.
	•	Replace booksdb.js with a real database (MongoDB).
	•	Write automated tests with Jest/Mocha.
	•	Add error-handling middleware for better API error responses.

⸻

🔑 Quick Visual Flow

A: Fork & Clone → B: Setup → C: Public Routes → D: Registration → 
E: Authentication → F: Reviews → G: Async/Promises → H: Testing → I: Advanced