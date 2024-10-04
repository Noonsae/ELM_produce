$(document).ready(function () {
  $.getJSON('./data/member.json', function (data) {    
    // 멤버 카드 클릭했을 때
    $('.card').on('click', function () {    
      const name = $(this).find('.card-text').text(); // 클릭한 멤버 이름 찾기
      const profile = getProfile(name, data); // 클릭한 멤버 이름 === data.name인 데이터 찾기

      // dt / dd 업데이트
      if (profile) {
        $('.photo').css('background-image', `url(${profile.photo})`);
        $('.name').text(profile.name);
        $('.team-card-info dd').eq(0).html(profile.mbti);
        $('.team-card-info dd').eq(1).html(profile.strengths);
        $('.team-card-info dd').eq(2).html(profile.weaknesses);
        $('.team-card-info dd').eq(3).html(profile.hobby);
        $('.team-card-info dd').eq(4).html(makeHTML('blog', profile.blog_url));
        $('.team-card-info dd').eq(5).html(makeHTML('github', profile.github_url));
        $('.team-card-info dd').eq(6).html(profile.keyword);
      }

      $('.overlay').addClass('is-active');
      $('.team-card').addClass('is-active');
      $('body').css('overflow', 'hidden');
    });


    // 모달 닫기 버튼 눌렀을 때
    $('.btn-close').on('click', function () {
      $('.overlay').removeClass('is-active');
      $('.team-card').removeClass('is-active');
      $('body').css('overflow', '');
    });
  });
});

function getProfile(name, data) {
  return data.find(member => member.name === name)
}

function makeHTML(site, url) {
  if (site === 'blog') {
    return `💻 blog : ${url ? `<a href="${url}" target="_blank">${url}</a>` : '😓 존재하지 않습니다!'}`
  }

  if (site === 'github') {
    return `📦 Github : ${url ? `<a href="${url}" target="_blank">${url}</a>` : '😓 존재하지 않습니다!'}`
  }

  return '😓 존재하지 않습니다!';
}