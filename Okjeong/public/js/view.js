// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAL9zK57h0F_pG7unbzmi-b5UvzmxqvLwM",
  authDomain: "okjeongqna-5e05d.firebaseapp.com",
  projectId: "okjeongqna-5e05d",
  storageBucket: "okjeongqna-5e05d.firebasestorage.app",
  messagingSenderId: "645465839319",
  appId: "1:645465839319:web:d7e8a928a9acb999e10292"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

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
            loadPost(); // Firestore 데이터 가져오기
        } else {
            console.log("로그인 필요");
            alert("로그인이 필요합니다.");
            location.href = "../board/login.html";
        }
    });
});

// URL에서 게시글 ID 가져오기
const params = new URLSearchParams(location.search);
const postId = params.get("id");

if (!postId) {
  alert("잘못된 접근입니다.");
  location.href = "../board/list.html";
}

const loadPost = async () => {
  try {
    const postRef = doc(db, "boards", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      alert("게시글을 찾을 수 없습니다.");
      location.href = "../board/list.html";
      return;
    }

    const post = postSnap.data();

    // 조회수 증가
    await updateDoc(postRef, { views: post.views + 1 });

    // 데이터 출력
    document.getElementById("subject").innerText = post.subject;
    document.getElementById("writer").innerText = (currentUser.email === "okjeong@highschool.ok" || post.writer === "옥정고 학생회") ? post.writer : "익명";
    document.getElementById("date").innerText = post.date;
    document.getElementById("content").innerText = post.content;
  } catch (error) {
    console.error("게시글 불러오기 오류: ", error);
  }
};

// 삭제 버튼 핸들러
const deletePost = async () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await deleteDoc(doc(db, "boards", postId));
      alert("게시글이 삭제되었습니다.");
      location.href = "../board/list.html";
    } catch (error) {
      console.error("게시글 삭제 오류: ", error);
    }
  }
};

// 수정 버튼 핸들러
const modifyPost = () => {
  location.href = `../board/modify.html?id=${postId}`;
};

document.getElementById("modify").addEventListener("click", modifyPost)
document.addEventListener("DOMContentLoaded", loadPost);
document.getElementById("delete").addEventListener("click", deletePost);