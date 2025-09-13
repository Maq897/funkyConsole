import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, push } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Config
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

// UI Setup
const chatBox = document.createElement('div');
chatBox.id = 'chatBoxDiv';
chatBox.style.display = 'none';
document.body.appendChild(chatBox);

const input = document.createElement('input');
input.id = 'InpEl';
input.type = 'text';
input.placeholder = 'Press ENTER to chat!';
input.style.display = 'none';
document.body.appendChild(input);

// Message Renderer
const renderMessage = (sender, text) => {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message';
  msgDiv.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
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
  }
};

// Send Message
const sendMessage = async (text) => {
  const playerName = localStorage.getItem('player-name') || 'Anonymous';
  const message = `${playerName} | ${text}`;
  await push(ref(db, 'chat/'), message);
  renderMessage(playerName, text);
};

// Auth
signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch(err => console.error("Auth error:", err));

onAuthStateChanged(auth, user => console.log(user));

// Input Listener
input.addEventListener('keydown', (e) => {
  if (localStorage.getItem('player-name') && e.key === 'Enter' && input.value.trim()) {
    sendMessage(input.value.trim());
    input.value = '';
  }
});

window.addEventListener('keydown', e => {
  if (e.key === '|') {
    input.style.display = input.style.display === 'none' ? 'block' : 'none';
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  }
});

// Modal Prompt Replacement
const showPasswordPrompt = (acc_name) => {
  const modal = document.createElement('div');
  modal.id = 'pwdModal';
  modal.innerHTML = `
    <div style="background:#222; color:white; padding:20px; border-radius:10px; position:fixed; top:30%; left:35%; z-index:9999;">
      <label>Enter password for <b>${acc_name}</b>:</label><br>
      <input type="password" id="pwdInput" style="margin-top:10px;" /><br>
      <button id="pwdSubmit" style="margin-top:10px;">Submit</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('pwdSubmit').onclick = async () => {
    const enteredPwd = document.getElementById('pwdInput').value;
    const AllowedUser = await get(ref(db, `AllowedUsers/${acc_name}`));
    if (AllowedUser.exists()) {
      const pwd = AllowedUser.val();
      if (pwd === `pwd=${enteredPwd}`) {
        alert('Correct Password');
        localStorage.setItem('player-name', acc_name);
        chatBox.style.display = 'flex';
        input.style.display = 'block';
        loadMessages();
        modal.remove();
      } else {
        alert('Incorrect password');
        localStorage.removeItem('player-name');
        modal.remove();
      }
    } else {
      alert('Account not found');
      modal.remove();
    }
  };
};

// Login Flow
const login = () => {
  const accName = prompt('Enter your account name:');
  if (accName) showPasswordPrompt(accName);
};

window.onload = () => {
  localStorage.removeItem('player-name');
  login();
};
