// Import Firebase SDK modules using ES6 syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr8Tk3V_qV5MPMKSX3UGaPk0VJ1Yj36HE",
  authDomain: "tiffin-menu-5899d.firebaseapp.com",
  databaseURL: "https://tiffin-menu-5899d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tiffin-menu-5899d",
  storageBucket: "tiffin-menu-5899d.appspot.com",
  messagingSenderId: "799955494909",
  appId: "1:799955494909:web:5a32a89ccad63567599b94",
  measurementId: "G-WLR6PRDWFE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Get a reference to the database
const database = getDatabase(app); // CONNECTS project with firebase
// Reference to the 'reviews' section in the database
let itemsInDB = ref(database, "Tiffin-Service"); // create reference in database


// DOM elements
const form = document.getElementById("review-form");
const getname = document.getElementById("name");
const getreview = document.getElementById("review");
let submit = document.getElementById("submit");
let reviews_list = document.getElementById("reviews-list");

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 4000); // Hide after 3 seconds
}


submit.addEventListener("click", function () {
  const name = getname.value.trim();
  const review = getreview.value.trim();

  // Validate inputs
  if (name && review) {
    // Push the review to Firebase Realtime Database
    push(itemsInDB, {
      name: name,
      review: review,
    });

    console.log(`${name} : ${review} ; pushed successfully!`);
    // clearInputObj();
    form.reset(); // Clear form fields after submission
  }
  // Alert if name or review is missing
  else {
    // Alert if name or review is missing
    if (!name) {
      // alert("Enter Name!!");
      showToast("Enter Some Review!!");
    }
    if (!review) {
      showToast("Enter Some Review!!");
    }
  }
});

// Real-time listener to fetch reviews from Firebase
onValue(itemsInDB, function (snapshot) {
  if (!snapshot.exists()) {
    console.log("No item here....");
    reviews_list.innerHTML = `<h1 class="heading"> No Reviews ✅ </h1>`;
    return; // Exit early if no data
  }

  const reviews = snapshot.val();
  const arrTask = Object.entries(reviews); // Convert to array of [id, value]
  console.log(arrTask);
  // console.log(snapshot.val());

  clearListEle(); // Clear the existing list

  // for (let i = 0; i < arrTask.length; i++) {
  // Loop through the reviews array in reverse order
  for (let i = arrTask.length - 1; i >= 0; i--) {
    const [id, value] = arrTask[i]; // Destructure [id, value]
    console.log("DevCodes value : ", value);
    appendReviewListEle(value);

    // let currentEle = arrTask[i]; // arr of [id,value]
    // console.log("devcodes value ", currentEle[1]);
    // let currentTask_id = currentEle[0];
    // let currentTask_value = currentEle[1];
    // appendReviewListEle(currentEle[1]);
  }
});


// function clearInputObj() {
//   getname.value = null;
//   getreview.value = null;
// }

// Clear the reviews list
function clearListEle() {
  reviews_list.innerHTML = "";
}

// Append review item to the list
function appendReviewListEle(item) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<strong>${item.name}</strong>: ${item.review}`;
  reviews_list.appendChild(listItem);
  console.log(item.name);
}




/**
// local storage

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${review.name}</strong>: ${review.text}`;
            reviewsList.appendChild(listItem);
        });
    }

    // Save review to localStorage
    function saveReview(name, text) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ name, text });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;

        if (name && review) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${name}</strong>: ${review}`;

            reviewsList.appendChild(listItem);

            saveReview(name, review);
            form.reset();
        }
    });

    // Initial load
    loadReviews();
});



 */