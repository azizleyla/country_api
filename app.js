const form = document.querySelector("#form");
const card = document.querySelector(".card");
const country = document.querySelector(".form_control");

form.addEventListener("submit", getCountry);
//render Country
function renderCountry(countries) {
  let emp = [];
  card.classList.remove("hide");
  countries.map(country => {
    const html = `
        <div class="card-single">
          <div class="card-img">
              <img src="${country.flag}" class="img" alt="">
          </div>
          <div class="card-body">
              <h5 class="card-title">${country.name}</h5>
          </div>
          <ul class="list-group">
              <li class="list-group-item">Paytaxt: ${country.capital}</li>
              <li class="list-group-item">Əhali sayı: ${country.population}</li>
              <li class="list-group-item">Dil: ${country.languages[0].nativeName}</li>
              <li class="list-group-item">Valyuta: ${country.currencies[0].name} ${country.currencies[0].symbol}
              <li class="list-group-item">Vaxt zonası: ${country.timezones[0]}</li>
          </ul>
    
          <a href="#" class="card-btn delete">Sil</a>
          <a href="#" class="card-btn info">Əlavə məlumat</a>
          
        </div>
    `;

    card.insertAdjacentHTML("afterbegin", html);
    setItemtoLS(country);
    const deleteBtn = card.querySelector(".card-btn");
    console.log(emp);
    deleteBtn.addEventListener("click", function (e) {
      e.target.previousElementSibling.parentElement.remove();
      console.log(
        deleteFromLS(
          e.target.previousElementSibling.previousElementSibling.children[0]
            .textContent
        )
      );
    });
  });

  setDefault();
}
function showErrorMessage() {
  const p = document.createElement("p");
  p.textContent = "Sorry we didn't found any result";
  p.classList.add("error");
  form.insertAdjacentElement("beforeend", p);
  setTimeout(() => {
    p.remove();
  }, 3000);
}
async function getCountry(e) {
  e.preventDefault();
  try {
    const country = document.querySelector(".form_control").value;
    const response = await fetch(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    const data = await response.json();
    renderCountry(data);
  } catch (err) {
    showErrorMessage();
  }
}
function setDefault() {
  const input = (document.querySelector(".form_control").value = "");
}
//get Item from LS
function getItemFromLS() {
  return localStorage.getItem("countries")
    ? JSON.parse(localStorage.getItem("countries"))
    : [];
}
function setItemtoLS(country) {
  countries = getItemFromLS();
  countries.push(country);
  localStorage.setItem("countries", JSON.stringify(countries));
}
//deleteFromLS
function deleteFromLS(name) {
  countries = getItemFromLS();
  countries.forEach((country, index) => {
    if (country.name === name) {
      countries.splice(index, 1);
    }
  });
  localStorage.setItem("countries", JSON.stringify(countries));
}
