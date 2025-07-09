// 📦 Step 1: Create a box (HTTP message) to send to the backend (Request)
const xhr = new XMLHttpRequest();

// 👂 Step 2: Set up an ear (event listener) to listen for the response from the backend
// 📨 When the response arrives, run this function to show it in the console
xhr.addEventListener("load", () => {
  console.log(xhr.response); // 📩 Show the response message (data from the backend)
});

// 🛠️ Step 3: Prepare the request
// 📝 "GET" means we’re asking for information
// 🌐 The URL is where we’re sending the request (the backend server address)
xhr.open("GET", "https://supersimplebackend.dev");

// 🚀 Step 4: Send the request through the internet to the backend server
xhr.send(); // ✈️ This sends out the message we created

// Ya rabb , help me
// Completed Q2 - 04-July-2025 - 2 months behind , arrghh
