# Chat_Bot_-Backend

Clone the repo


git clone <repository-url>


cd Socket-io/server


Install dependencies


npm install


Run the backend


node index.js


Runs on http://localhost:3001 by default.

Ensure the frontend is running



The backend allows CORS requests from http://localhost:5173 (default frontend port).


Update CORS settings in server/index.js if needed


Deployment Link - https://staging.dj8uiibthvivs.amplifyapp.com/


 How It Works


1️⃣ User enters their name & room ID


2️⃣ User joins the chat room & loads previous messages from localStorage 


3️⃣ User sends a message → it appears instantly



4️⃣ Server receives the message & sends it back to all users in the room


5️⃣ Server messages appear with "Server" as the sender



✔ User joins a room → loads chat history


✔ User sends a message → server echoes the same message back


✔ Message is stored in localStorage and reloaded when rejoining





