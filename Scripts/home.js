import { StarIcons , fetching , changeMood , favouriteDrawer } from './myScript.js';
const topicsContainer = document.querySelector(".topics-found");
const loading = document.querySelector(".loading-section");
const searchResult = document.querySelector(".search-result");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort");
const filterSelect = document.getElementById("filter");
const topicsUrl = "https://tap-web-1.herokuapp.com/topics/list";
let ListData = [];
changeMood();
favouriteDrawer();
//Display the Card
function displayCard(data) {
  let tabindex = 7;
  if (!Array.isArray(data) || data.length === 0) {
    topicsContainer.innerHTML = "<p>No web topics found.</p>";
    searchResult.innerHTML = "";
    loading.style.display = "none";
    return;
  }
  searchResult.innerHTML = `"${data.length}" Web Topics Found`;
  topicsContainer.innerHTML = "";
  data.forEach((topicData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const starIcons = StarIcons(topicData.rating);
    card.innerHTML = `
                <div class="img-container" tabindex=${tabindex}>
                    <img class="card-img" src="./assets/${topicData.image}" alt="card image">
                </div>
                <div class="card-info">
                    <h2 class="card-title">${topicData.category}</h2>
                    <p class="card-name">${topicData.topic}</p>
                    <div class="rating-stars">
                        ${starIcons}
                    </div>
                    <p class="author">${topicData.name}</p>
                </div>
            `;
    topicsContainer.appendChild(card);
    card.addEventListener("click", async () => {
      const topicId = topicData.id;
      window.location.href = `details.html?id=${topicId}`;
    });
    tabindex++;
  });
  loading.style.display = "none";
}
//search
searchInput.addEventListener("keyup", () => {
  setTimeout(async() => {
    const searchValue = searchInput.value;
    const allData = await fetching(topicsUrl);
    ListData = allData.filter(item => item.topic.toLowerCase().includes(searchValue.toLowerCase()));
    displayCard(ListData);
    SortData(ListData);
    FilterByCategory(ListData);
  }, 300);
});
//list topic when the website open 
window.addEventListener("load", async () => {
  ListData = await fetching(topicsUrl);
  displayCard(ListData);
  FilterList(ListData);
});
//sorting 
function SortData(ListData) {
  const sortCriteria = sortSelect.value;
  if (sortCriteria === "name") {
    ListData.sort((a, b) => a.topic.toLowerCase() > b.topic.toLowerCase() ? 1 : -1);
  } else if (sortCriteria === "author") {
    ListData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  } else if (sortCriteria === "default") {
    ListData.sort((a, b) => a.id - b.id);
  }
  displayCard(ListData);
}
sortSelect.addEventListener("change", () => {
  SortData(ListData);
});
//make filter by Category list
function FilterList(filterData) {
  const categories = new Set();
  filterData.forEach(item => {
    categories.add(item.category);
  });
  const CategoriesOptions = Array.from(categories);
  CategoriesOptions.forEach(categoryOption => {
    const option = document.createElement("option");
    option.value = categoryOption.toLowerCase();
    option.textContent = categoryOption;
    filterSelect.appendChild(option);
  });
}
//Filter By Category function 
function FilterByCategory(ListData) {
  const selectedCategory = filterSelect.value;
  if (selectedCategory === "default") {
    displayCard(ListData);
  } else {
    let filteredData = ListData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    displayCard(filteredData);
  }
}
filterSelect.addEventListener("change", () => { FilterByCategory(ListData) });