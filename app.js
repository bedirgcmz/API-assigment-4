// DOm elements
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const resultContainer = document.querySelector(".result-container");
const showMoreBtn = document.querySelector(".show-more");
const totaltAndWievs = document.querySelector(".totalt-and-wievs");

// Variables
let page = 1;
let userValue;
let count = 0;
let totaltResult = 0;
const accesKey = "J9Nua5aORT05UcKcu_GC02cjhpuka1HsY__REAEVKhc";
const secretKey = "ETwU7kN5asdKGbOew52YpUrGq6Aa24tcpBtqbQqiRK8";
const API_unsplash = `https://api.unsplash.com/search/photos`;

// Getting data funtion
const getData = async () => {
  try {
    userValue = searchInput.value;
    const url = API_unsplash + `?page=${page}&query=${userValue}&client_id=${accesKey}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length > 0) {
      if (count == 0) {
        resultContainer.innerHTML = "";
        console.log("girdim");
      }
      showResult(data.results);
      count++;
      page++;
      totaltResult += data.results.length;
      totaltAndWievs.style.display = "block";
      totaltAndWievs.innerHTML = `${totaltResult} / ${data.total} wievs`;
      showMoreBtn.disabled = false;
      showMoreBtn.innerText = "Show More";
      showMoreBtn.style.backgroundColor = "#ffb5a7";
      console.log(data.total);
      console.log(totaltResult);
      if (data.total == totaltResult) {
        showMoreBtn.disabled = true;
        showMoreBtn.innerText = "It's over, there's no more!";
        showMoreBtn.style.backgroundColor = "#ecebeb";
      }
    } else {
      resultContainer.innerHTML = `<p class="dont-find-img" >Sorry, We couldn't find any results with this search.</p>`;
      count = 0;
      showMoreBtn.style.display = "none";
      totaltAndWievs.style.display = "none";
    }
  } catch (error) {
    resultContainer.innerHTML = `<p class="dont-find-img" >Obbs, something went wrong.</p>
    <p class="dont-find-img" >Check the console to review the error.</p>
    `;
    console.log(error);
  }

  if (page > 1) {
    showMoreBtn.style.display = "inline-block";
  }
};

const showResult = (pData) => {
  const htmlArray = pData.map((image, index) => {
    return `
          <div key=${index} class="card">
            <img
              class="card-img"
              src="${image.urls.regular}"
              alt="${image.alt_description}"
            />
            <div class="card-body">
              <p class="img-description"><b>Definition:</b> ${image.alt_description}</p>
            </div>
            <div class="card-footer">
              <p class="img-owner"><b>Image creator:</b> ${image.user.name}</p>
              <p class="img-owner-insta"><b>Instagram username:</b>  ${
                image.user.instagram_username ? image.user.instagram_username : "No username"
              }</p>
              <p class="img-owner-total-photos"><b>Total images of ${image.user.first_name}:</b>  ${
      image.user.total_photos
    }</p>
              <p class="img-info"><b>This image likes:</b>  ${image.likes}</p>
            </div>
          </div>
        `;
  });
  resultContainer.innerHTML += htmlArray.join("");
  console.log("sonus fonk calsiti");
};

searchBtn.addEventListener("click", () => {
  resultContainer.innerHTML = "";
  getData();
  page = 1;
  totaltResult = 0;
});
showMoreBtn.addEventListener("click", () => {
  getData();
});
