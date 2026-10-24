# SIT313 Secure Frontend Applications — P5 Newsletter

**Student:** [Your name]  
**Student ID:** [Your student ID]  
**GitLab repository:** [Paste your Task P5 repository URL]  
**Video demonstration:** [Paste your Panopto/YouTube link]

## 1. Introduction
The purpose of this task was to implement a newsletter subscription feature in the React-based DEV@Deakin web platform. Users can enter their details and email address to subscribe. The React frontend sends an HTTP request to an ExpressJS backend, which validates the request and uses Mailjet to send a welcome email.

## 2. Implementation
The newsletter form was added to the existing DEV@Deakin homepage. The frontend uses the JavaScript `fetch()` function to send a POST request to `/api/subscribe`. The backend validates the email address, checks for duplicate subscriptions during the current server session, and sends a welcome email through Mailjet. The application uses HTTP status codes and `try...catch` error handling. The frontend displays a success or error message according to the response.

## 3. Screenshots and Testing

### 3.1 Homepage and Newsletter Form
[Insert your screenshot showing the DEV@Deakin homepage and newsletter form.]

### 3.2 Successful Subscription
[Insert your screenshot showing the success message after a real successful subscription.]

### 3.3 Terminal Email API Response
[Insert your backend terminal screenshot showing `Mailjet Status:` and the actual status returned by Mailjet.]

### 3.4 Validation and Error Handling
[Insert a screenshot showing the invalid-email message or duplicate-subscription response.]

### 3.5 Repository
[Insert a screenshot of the Task P5 GitLab repository, with Internal visibility if possible.]

## 4. GitLab Repository
Repository URL: [Paste your Task P5 GitLab URL]

## 5. Video Demonstration
Video URL: [Paste your Panopto or YouTube URL]

## 6. Conclusion
This task helped me understand how a React frontend communicates with an ExpressJS backend using HTTP requests. I practised validating user input, handling successful and failed requests, integrating an Email API, and displaying clear feedback to users. The completed feature demonstrates the newsletter subscription process from submitting an email address to receiving a response from the backend.
