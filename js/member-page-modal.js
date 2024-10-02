$(document).ready(function () {
  // 멤버 카드 클릭했을 때
  $('.card').on('click', function () {
    $('.overlay').addClass('is-active');
    $('.team-card').addClass('is-active');
  });

  // 멤버 카드 모달 닫기 버튼 눌렀을 때
  $('.close-btn').on('click', function () {
    $('.overlay').removeClass('is-active');
    $('.team-card').removeClass('is-active');
  });
});