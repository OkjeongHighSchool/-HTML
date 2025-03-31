// Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyAL9zK57h0F_pG7unbzmi-b5UvzmxqvLwM",
    authDomain: "okjeongqna-5e05d.firebaseapp.com",
    projectId: "okjeongqna-5e05d",
    storageBucket: "okjeongqna-5e05d.firebasestorage.app",
    messagingSenderId: "645465839319",
    appId: "1:645465839319:web:d7e8a928a9acb999e10292"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Auth와 Firestore 가져오기
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// Firebase가 완전히 초기화된 후 실행
document.addEventListener("DOMContentLoaded", () => {

    // 로그인 여부 확인 후 실행
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("로그인된 사용자:", user.email);
            currentUser = user;
            renderTable(); // Firestore 데이터 가져오기
        } else {
            console.log("로그인 필요");
            alert("로그인이 필요합니다.");
            location.href = "../board/login.html";
        }
    });
});

// Firestore 데이터 가져오기 함수
const renderTable = async () => {
    const tbody = document.querySelector("tbody");
    let newRows = "";

    try {
        const querySnapshot = await getDocs(collection(db, "boards"));
        const boards = [];

        querySnapshot.forEach((doc) => {
            boards.push({ id: doc.id, ...doc.data() });
        });

        // 날짜순 정렬
        boards.sort((a, b) => new Date(b.date) - new Date(a.date));

        boards.forEach((item, i) => {
            
            // 익명 처리
            const displayWriter = (currentUser.email === "okjeong@highschool.ok" || item.writer ==="옥정고 학생회") // 관리자 계정 or 학생회글 이면 닉 공개
                ? item.writer 
                :(item.writer === currentUser.email) // 본인 이면 본인이라고 나오기
                    ? `<strong>본인</strong>`
                    : "익명"

            // 공개 / 비공개
            const viewLink = item.public || (currentUser.email === item.writer || currentUser.email === "okjeong@highschool.ok") 
                ? `../board/view.html?id=${item.id}`
                : "javascript:void(0);"; // 접근 불가 시 이동 방지

            const onClickEvent = item.public || (currentUser.email === item.writer || currentUser.email === "okjeong@highschool.ok")
                ? ""
                : `onclick="alert('비공개 개시글 입니다.'); return false;"`;

            newRows += `
            <tr>
                <td>${i + 1}</td>
                <td><a href="${viewLink}" ${onClickEvent}>${item.subject}</a></td>
                <td>${displayWriter}</td>
                <td>${item.date}</td>
                <td>${item.views}</td>
            </tr>`;
        });

        tbody.innerHTML = newRows;
    } catch (error) {
        console.error("데이터 가져오기 실패:", error);
    }
};
