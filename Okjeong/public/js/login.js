let id = $('#id');
let pw = $('#pw');
let btn = $('#btn');

$(btn).on('click',function() {
    if($(id).val =="") {
        $(id).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning')
        },1500);
    }
    else if($(pw).val() =="") {
        $(pw).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning')
        },1500);
    }
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL9zK57h0F_pG7unbzmi-b5UvzmxqvLwM",
  authDomain: "okjeongqna-5e05d.firebaseapp.com",
  projectId: "okjeongqna-5e05d",
  storageBucket: "okjeongqna-5e05d.firebasestorage.app",
  messagingSenderId: "645465839319",
  appId: "1:645465839319:web:d7e8a928a9acb999e10292"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";


$('#btn').on('click',function(e) {
  e.preventDefault();
  let email = $(id).val()
  let password = $(pw).val()
  signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
     location.href = `../board/Introduction.html`;
     console.log('로그인성공')
     // ...
 })
 .catch((error) => {
    alert("아이디 혹은 비밀번호가 틀렸습니다.")
     console.log('로그인실패')
     const errorCode = error.code;
     const errorMessage = error.message;
 
 });
})
