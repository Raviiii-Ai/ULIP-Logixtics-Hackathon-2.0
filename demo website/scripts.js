document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully");
});


// Chatbot functionality
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");

// OpenAI GPT API Endpoint
const API_URL = "https://api.openai.com/v1/chat/completions"; // Replace with the OpenAI endpoint
const API_KEY = "your_openai_api_key_here"; // Replace with your OpenAI API key

// Show/Hide Chatbot
chatbotToggle.addEventListener("click", () => {
    chatbotBox.classList.toggle("hidden");
});

chatbotClose.addEventListener("click", () => {
    chatbotBox.classList.add("hidden");
});

// Send message to chatbot
chatbotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    // Display user's message
    displayMessage(userMessage, "user");

    // Clear input field
    chatbotInput.value = "";

    // Send message to OpenAI API
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            }),
        });

        const data = await response.json();
        const chatbotReply = data.choices[0].message.content;

        // Display chatbot's reply
        displayMessage(chatbotReply, "bot");
    } catch (error) {
        console.error("Error with chatbot API:", error);
        displayMessage("Sorry, there was an error. Please try again.", "bot");
    }
});

// Display message in chatbot
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
