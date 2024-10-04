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

  // timestamp를 new Date() 함수를 이용하여 입력
  let doc = {
    visitation_name_input: user_name,
    visitation_text_input: comment,
    timestamp: new Date()
  };

  // 데이터 저장 후 알림창 생성
  await addDoc(collection(db, "ELM_visitation_list"), doc);
  alert("저장되었습니다.");
  window.location.reload();
});

let docs = await getDocs(collection(db, "ELM_visitation_list"));
docs.forEach((doc) => {
  let row = doc.data();
  let user_name = row["visitation_name_input"];
  let comment = row["visitation_text_input"];

  let temp_html = `
    <div class="visitation_posted">
      <p>${user_name}</p>
      <p>${comment}</p>      
      <p>작성일시
      <br>
      : ${Date().toLocaleString()}</p>
    </div>
    `;
  $("#visitation_board").append(temp_html);
});
