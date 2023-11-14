// static/styles/script.js

// ########## active reports sidenav ########
function showContent(url, link) {
  // Remove active class from all links
  var links = document.querySelectorAll('.sidebar a');
  links.forEach(function(link) {
    link.classList.remove('active');
  });

  // Set active class to the clicked link
  link.classList.add('active');

  // Your code to load and display the content
  // ...
  fetch(url)
  .then(response => response.text())
  .then(content => {
    document.getElementById("content-placeholder").innerHTML = content;
  })
  .catch(error => console.log(error));
}



//#######toggle button#####

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleButton = document.querySelector('.toggle-button');
  
  sidebar.classList.toggle('collapsed');
  
  if (sidebar.classList.contains('collapsed')) {
    toggleButton.style.left = '20px';
  } else {
    toggleButton.style.left = '150px';
    toggleButton.style.borde='2px solid rgb(31, 31, 31)';
  }
}



//##### accept and decline button functionality 

function handleAccept(button) {
  const tr = button.closest('tr');

  tr.querySelector('.accept-button').classList.add('Adeeper');
  tr.querySelector('.accept-button').textContent = 'Accepted';
  tr.querySelector('.decline-button').classList.add('hide');
  tr.querySelector('.accept-button').disabled = true;
  tr.querySelector('.decline-button').disabled = true;
  tr.querySelector('.view-file-button').disabled = true;
  tr.querySelector('.view-file-button').textContent = 'Viewed';
}

function handleDecline(button) {
  const tr = button.closest('tr');

  tr.querySelector('.decline-button').classList.add('Ddeeper');
  tr.querySelector('.decline-button').textContent = 'Declined';
  tr.querySelector('.accept-button').classList.add('hide');
  tr.querySelector('.accept-button').disabled = true;
  tr.querySelector('.decline-button').disabled = true;
  tr.querySelector('.view-file-button').disabled = true;
  tr.querySelector('.view-file-button').textContent = 'Viewed';
}

function viewFile(button) {
  const tr = button.closest('tr');

  // Fetch the file content
  fetch('simpleFile')
    .then(response => response.text())
    .then(content => {
      // Display the prompt and get user input
      const userInput = prompt('File Content:\n\n' + content + '\n\nDo you accept?', 'Accept');

      // Process user input
      if (userInput && userInput.toLowerCase() === 'accept') {
        // User accepted
        alert('You accepted the file content.');
        // Do something else with the accepted content
        handleAccept(button);
      } else {
        // User declined or canceled
        alert('You declined the file content.');
        // Do something else or exit
        handleDecline(button);
      }

      button.textContent = 'Viewed';
      button.disabled = true;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


// ##############help##########
function generateAnswer(faqNumber) {
  const answerContainer = document.createElement('div');
  answerContainer.classList.add('message');

  const sender = document.createElement('div');
  sender.classList.add('message-sender');
  sender.textContent = 'Bot';
  answerContainer.appendChild(sender);

  const answer = document.createElement('div');
  answer.classList.add('message-content');

  switch (faqNumber) {
    case 1:
      answer.textContent = 'To create an account, click on the "Sign Up" button and fill out the registration form.';
      break;
    case 2:
      answer.textContent = 'We accept various payment methods including credit cards, PayPal, and bank transfers.';
      break;
    case 3:
      answer.textContent = 'You can track your order by logging into your account and navigating to the "Order History" section.';
      break;
    default:
      answer.textContent = 'Sorry, I don\'t have an answer for that question.';
  }

  answerContainer.appendChild(answer);
  document.querySelector('.chat-messages').appendChild(answerContainer);
}


