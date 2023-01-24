// Import the GPT-3 chatbot function from the Python file
import { generateChatbotResponse } from './gpt3_chatbot_example.py';

// Import the itinerary component
import { createItinerary } from './itinerary_template_square.js';

// Import the Node.js/Express.js backend
import { createServer } from './backend.js';

// Import login
import { login } from './login.js';


// Create the server
createServer();

// Create the chatbot
const chatbot = document.querySelector('#chatbot');
chatbot.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the user's message
    const message = document.querySelector('#message').value;

    // Generate a response from the chatbot
    const response = generateChatbotResponse(message);

    // Display the response
    const chatbotResponse = document.querySelector('#chatbot-response');
    chatbotResponse.textContent = response;
});

// Create the itinerary component
const itineraryButton = document.querySelector('#create-itinerary');
itineraryButton.addEventListener('click', () => {
    createItinerary();
});

//Login button event listener
const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', () => {
    login();
});

// links to a GPT-3 chatbot function in a Python file, a JS itinerary component file, and a Node.js/Express.js 
//backend to create a basic layout for your travel website:

//This is an example of how the basic structure of your script.js file should look like , 
//you need to import the correct files, the correct path to your files, 
//and correct naming conventions and functions.Please also note that this example is using the import syntax, 
//which is a modern JavaScript feature that may not be supported by all browsers. 
//If you need to support older browsers, you will need to use a tool like Babel to transpile your code.