// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

// Firebase config (YOUR SAME CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyCrm-dyIq-PD1KGC3zuf4x1SrviJCfw34U",
  authDomain: "mobileprogramming-32f6e.firebaseapp.com",
  databaseURL: "https://mobileprogramming-32f6e-default-rtdb.firebaseio.com",
  projectId: "mobileprogramming-32f6e",
  storageBucket: "mobileprogramming-32f6e.firebasestorage.app",
  messagingSenderId: "901517173209",
  appId: "1:901517173209:web:f93a62c4470366747239c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// FORM SUBMIT HANDLER
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const userId = document.getElementById("userId").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  writeUserData(userId, firstName, lastName, email, address, phone);
});

// FUNCTION TO SAVE DATA USING USER ID
function writeUserData(userId, firstName, lastName, email, address, phone) {

  set(ref(database, 'users/' + userId), {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    phone: phone
  })
  .then(() => {
    alert("✅ Data saved successfully!");
    document.getElementById("contactForm").reset();
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("❌ Failed to save data");
  });
}