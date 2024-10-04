$(document).ready(function () {
  let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let temp = data["temp"];
      $("#aa2").text(temp);
    });
});
