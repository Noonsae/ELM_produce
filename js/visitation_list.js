// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, orderBy, query} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyBbrl3EHaBQvrgBUdORJl6Y5SEzKVvyEHY",
  authDomain: "sparta-735f6.firebaseapp.com",
  projectId: "sparta-735f6",
  storageBucket: "sparta-735f6.appspot.com",
  messagingSenderId: "85843305390",
  appId: "1:85843305390:web:37d7e2b8a12babb101de3f",
  measurementId: "G-ZKTL84DMXB",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// posting_btn을 클릭했을 때,
$("#posting_btn").click(async function () {
  // 입력창에 들어온 value값을 DB에 업데이트
  let user_name = $("#visitation_name_input").val();
  let comment = $("#visitation_text_input").val();

  // Date의 년,월,일,시,분 정보만 입력
  let doc = {
    visitation_name_input: user_name,
    visitation_text_input: comment,
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    timestamp: new Date(),
  };

  // 데이터 저장 후 알림창 생성
  await addDoc(collection(db, "ELM_visitation_list"), doc);
  alert("저장되었습니다.");
  window.location.reload();
});

// Firestore에서 데이터를 가져오는 함수
async function fetchData() {
  // Firestore에서 컬렉션을 가져오고 timestamp 기준으로 내림차순 정렬
  const q = query(collection(db, "ELM_visitation_list"), orderBy("timestamp", "desc"));

  try {
    const docs = await getDocs(q);

    // 가져온 데이터를 배열로 저장
    const postsList = docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 데이터를 기반으로 HTML 생성
    displayPosts(postsList);  // postsList 배열을 HTML로 표시하는 함수 호출
  } catch (error) {
    console.error("문서 가져오기 실패: ", error);
  }
}

// HTML을 생성하여 표시하는 함수
function displayPosts(postsList) {
  const visitationBoard = document.getElementById("visitation_board");

  // 기존 콘텐츠 초기화
  visitationBoard.innerHTML = '';

  // postsList 배열을 순회하면서 각 게시글의 HTML을 생성
  postsList.forEach(post => {
    let Y = post["year"];
    let Mth = post["month"];
    let D = post["day"];
    let H = post["hour"];
    let Min = post["minute"];
    let user_name = post["visitation_name_input"];
    let comment = post["visitation_text_input"];

    // HTML 생성
    let temp_html = 
      `<div class="visitation_posted">
        <p>${user_name}</p>
        <br>
        <p>${comment}</p>
        <br>
        <br>      
        <p>${Y}년 ${Mth}월 ${D}일 ${H}시 ${Min}분</p>
      </div>`
    ;

    // 생성된 HTML을 DOM에 추가
    visitationBoard.innerHTML += temp_html;
  });
}

// 페이지가 로드될 때 게시글을 불러오기
fetchData();