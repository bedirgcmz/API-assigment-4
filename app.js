// DOM elements
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const resultContainer = document.querySelector(".result-container");
const showMoreBtn = document.querySelector(".show-more");
const totaltAndWievs = document.querySelector(".totalt-and-wievs");
const modal = document.querySelector(".modal-img");
const hightImg = document.querySelector(".hight-img");
const closeModal = document.querySelector(".close-modal");

// Variables
let page = 1;
let userValue;
let count = 0;
let totaltResult = 0;
const accesKey = "J9Nua5aORT05UcKcu_GC02cjhpuka1HsY__REAEVKhc";
const API_unsplash = `https://api.unsplash.com/search/photos`;

// Function that brings data with Search and Show More buttons
const getData = async () => {
  try {
    userValue = searchInput.value;
    const url = API_unsplash + `?page=${page}&query=${userValue}&client_id=${accesKey}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length > 0) {
      showResult(data.results);
      count++;
      page++;
      totaltResult += data.results.length;
      totaltAndWievs.style.display = "block";
      totaltAndWievs.innerHTML = `${totaltResult} / ${data.total} wievs`;
      showMoreBtn.disabled = false;
      showMoreBtn.innerText = "Show More";
      showMoreBtn.style.backgroundColor = "#ffb5a7";
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

// Function that prints incoming data into html elements
const showResult = (pData) => {
  console.log(typeof pData);
  const htmlArray = pData.map((image, index) => {
    console.log(image.id);
    return `
          <div key=${index} class="card">
            <img
              class="card-img"
              src="${image.urls.regular}"
              alt="${image.alt_description}"
              onclick="displayHighImg('${image.id}')"
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
};

// Search button handle click
searchBtn.addEventListener("click", () => {
  resultContainer.innerHTML = "";
  getData();
  page = 1;
  totaltResult = 0;
});

// Show More button handle click
showMoreBtn.addEventListener("click", () => {
  getData();
});

// Function that opens the image within the model when the image is clicked
const displayHighImg = (pId) => {
  const url = `https://api.unsplash.com/photos/${pId}?client_id=${accesKey}`;

  const getImg = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        hightImg.src = `${data.urls.regular}`;
        modal.style.display = "block";
      }
      console.log(data.urls);
    } catch (error) {
      modal.innerHTML = `<p>Obss! Something went wrong.</p>`;
    }
  };
  getImg();
};

// Function that closes the modal structure
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.addEventListener("click", () => {
  modal.style.display = "none";
});
