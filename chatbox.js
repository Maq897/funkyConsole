import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, push } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBscCU3A9p3n2aWBcICWD5u5Tcq4ehc0A8",
  authDomain: "mytimehub-c6c16.firebaseapp.com",
  databaseURL: "https://mytimehub-c6c16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mytimehub-c6c16",
  storageBucket: "mytimehub-c6c16.appspot.com",
  messagingSenderId: "308856274342",
  appId: "1:308856274342:web:c715308c6c0f098b42a367",
  measurementId: "G-E6VCP01975"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
console.log('%c-Chatbox script loaded-\n-Chatbox.js', 
  'color: white; background-color: green; font-weight: bold; font-size: 50px; padding: 7px; border: none; border-radius: 5px')
// UI Setup
const chatBox = document.createElement('div');
chatBox.id = 'chatBoxDiv';
document.body.appendChild(chatBox);
const input = document.createElement('input');
input.id = 'InpEl';
input.type = 'text';
input.placeholder = 'Press ENTER to chat!';
document.body.appendChild(input);

window.onload = () => {
  localStorage.removeItem('player-name')
  chatBox.style.display = 'none' 
  input.style.display = 'none'
}
// Message Renderer
const renderMessage = (sender, text) => {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message';
  msgDiv.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msgDiv);

  const br = document.createElement('br');
  chatBox.appendChild(br);
};

// Load Messages
const loadMessages = async () => {
  const snapshot = await get(ref(db, 'chat/'));
  if (snapshot.exists()) {
    const messages = snapshot.val();
    Object.values(messages).forEach(msg => {
      const [sender, text] = msg.split(' | ');
      renderMessage(sender, text);
    });
  } else {
    console.log("No messages found");
  }
};

// Send Message
const sendMessage = async (text) => {
  const playerName = localStorage.getItem('player-name') || 'Anonymous';
  const message = `${playerName} | ${text}`;
  await push(ref(db, 'chat/'), message);
  renderMessage(playerName, text);
};

// Auth and Init
signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(err => console.error("Auth error:", err));

onAuthStateChanged(auth, user => {
    console.log(user)
});

// Input Listener
input.addEventListener('keydown', (e) => {
  if (localStorage.getItem('player-name') && e.key === 'Enter' && input.value.trim() ) {
    sendMessage(input.value.trim());
    input.value = '';
  }
});
window.addEventListener('keydown', e => {
  if (e.key === ('|')) {
    input.style.display = input.style.display === 'none' ? 'block' : 'none'
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  }
})
const chooseAcc = async (acc_name) => {
  console.log('ChooseAcc running..')
  const AllowedUser = await get(ref(db, `AllowedUsers/${acc_name}`))
  if (AllowedUser.exists()) {
    const pwd = AllowedUser.val()
    const enteredPwd = prompt(`Enter the password for ${acc_name}`)

    if (pwd === `pwd=${enteredPwd}` && typeof pwd === 'string') {

      console.log('Correct pwd, continuing setting item to localStorage')
      alert('Correct Password')
      localStorage.setItem('player-name', acc_name)
      loadMessages()
    } else {
      alert('Incorrect password, reload to try again.')
      localStorage.removeItem('player-name')
      input.style.display = input.style.display === 'none' ? 'block' : 'none'
      chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
    }
  } else {
    console.log('Does not exist')
  }
}
const login = () => {
  const accChoosery = prompt('Enter the name of your account: ')
  chooseAcc(accChoosery)
}
login()