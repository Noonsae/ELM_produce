// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// DB 필드에 맞는 데이터값을 스트링으로 가지고 오기

let docs = await getDocs(collection(db, "ELM_visitation_list"));


docs.forEach((doc) => {
  let row = doc.data();
  let user_name = row["visitation_name_input"];
  let comment = row["visitation_text_input"];
  let Y = row["year"];
  let Mth = row["month"];
  let D = row["day"];
  let H = row["hour"];
  let Min = row["minute"];

  let temp_html = `
    <div class="visitation_posted">
      <p>${user_name}</p>
      <br>
      <p>${comment}</p>
      <br>
      <br>      
      <p>${Y}년 ${Mth}월 ${D}일 ${H}시 ${Min}분</p>
    </div>
    `;
  $("#visitation_board").append(temp_html);
});
