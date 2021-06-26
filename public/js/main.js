console.log("Client Side Js  Loaded");

const locations = document.querySelector("input");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted");
  const address = locations.value;

  fetch("http://localhost:3000/weather?address=" + address).then((res) => {
    res.json().then((data) => {
      console.log(data);
      const weatherForm = document.getElementById("result");
      const brand = document.getElementById("brandName");

      if (!data.err) {
        weatherForm.innerHTML = data.location.fullName;
        brand.innerHTML = data.weather[0].name;
      } else {
        weatherForm.innerHTML = data.err;
        brand.innerHTML = "";
      }
    });
  });
});
