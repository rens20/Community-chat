let messages = [];

function sendMessage() {
  let messageInput = document.querySelector(".msger-input");
  let message = messageInput.value;

  if (message !== "") {
    let currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let messageObject = {
      message: message,
      time: currentTime,
    };

    messages.push(messageObject);

    // Save messages to localStorage
    localStorage.setItem("messages", JSON.stringify(messages));

    displayMessages(); // Update the displayed messages
    messageInput.value = ""; // Clear the input field
  }
}

function displayMessages() {
  let messageContainer = document.querySelector(".msger-chat");
  messageContainer.innerHTML = ""; // Clear the message container

  messages.forEach((messageObject) => {
    let messageHTML = `
            <div class="msg right-msg">
              <div
                class="msg-bubble"
              >
                <div class="msg-info">
                  <div class="msg-info-name">User</div>
                  <div class="msg-info-time">${messageObject.time}</div>
                </div>

                <div class="msg-text">
                  ${messageObject.message}
                </div>
              </div>
            </div>
          `;

    messageContainer.insertAdjacentHTML("beforeend", messageHTML);
  });
}

// Function to load messages from localStorage on page load
function loadMessages() {
  let storedMessages = localStorage.getItem("messages");
  if (storedMessages) {
    messages = JSON.parse(storedMessages);
    displayMessages();
  }
}

// Event listener for the send button
document
  .querySelector(".msger-send-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    sendMessage();
  });

// Load messages on page load
window.addEventListener("load", loadMessages);
