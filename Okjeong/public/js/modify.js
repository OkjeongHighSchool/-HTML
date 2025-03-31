// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const db = getFirestore(app);

const auth = getAuth(app);
document.addEventListener("DOMContentLoaded", () => {

    // 로그인 여부 확인 후 실행
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("로그인된 사용자:", user.email);
        } else {
            console.log("로그인 필요");
            alert("로그인이 필요합니다.");
            location.href = "../board/login.html";
        }
    });
});
const modifyHandler = async (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const content = e.target.content.value;
  const publicSwitch = document.getElementById("publicSwitch").checked;
  const id = new URLSearchParams(location.search).get("id");

  try {
    const docRef = doc(db, "boards", id);
    await updateDoc(docRef, {
      subject,
      content,
      date: new Date().toISOString().split("T")[0],
      public: publicSwitch
    });

    location.href = `../board/view.html?id=${id}`;
  } catch (e) {
    alert("글 수정 중 오류 발생: " + e.message);
    console.error(e);
  }
};

document.querySelector("#modifyFrm").addEventListener("submit", modifyHandler);
