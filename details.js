const detailsCard = document.querySelector(".card .container");
const topicList = document.querySelector(".topic-list");
const loading = document.querySelector(".loading");
// const url = window.location.href.split("=")[1];
// const topicId = parseInt(url);
const topicId = 5;
let detailsData = [];
function StarIcons(ratingStr) {
  const rating = parseFloat(ratingStr);
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let starIcons = "";
  for (let i = 0; i < fullStars; i++) {
    starIcons += '<ion-icon name="star"></ion-icon>';
  }
  if (halfStar) {
    starIcons += '<ion-icon name="star-half"></ion-icon>';
  }
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starIcons += '<ion-icon name="star-outline"></ion-icon>';
  }
  return starIcons;
}
// fetch 
const fetching = async(api) =>
{
  try {
    loading.style.display = "block";
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    loading.style.display = "none";
    topicsContainer.innerHTML =
      "<p>Something went wrong. Web topics failed to load.</p>";
    console.error(error);
  }
}
const display = () => {
  detailsCard.innerHTML = "";
  topicList.innerHTML = "";
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("row");
  const starIcons = StarIcons(detailsData.rating);
  detailsContainer.innerHTML = `
        <div class="col-lg-8 col-md-6 m-auto">
                        <div class="card text-white border border-0" style="background-color: #333333">
                        <div class="card-body">
                        <p class="card-title" style="color:var(--brand-secondary);">${detailsData.category}</p>
                        <h2 class="card-text">${detailsData.topic}</h2>
                        <div class="text-warning rating-stars">
                            ${starIcons}
                        </div>
                        <br>
                        <p class="card-text text-wrap">${detailsData.description}</p>
                    </div></div></div>
                    <div class="col-lg-4 col-md-6">
                        <div class="card mt-5 position-absolute custom-position-static" style="width:340px;">
                            <div class="d-flex flex-column">
                                <img class="card-img-top" src="./assets/${detailsData.image}" alt="html image">
                                <p class=""><strong>${detailsData.topic}</strong> by <a href="#" class="author-link">Sarah Smith</a></p>
                            </div>
                            <div class="card-body border m-2 add-to-fav">
                                <p>Interested in this topic?</p>
                                <button class="btn btn-sm btn-success add-to-fav-btn w-100" onClick=handleAddToFavourites()>
                                    <div class="d-flex align-items-start justify-content-center gap-1">
                                    Add To Favorite
                                    <ion-icon class="pt-1" name="heart-outline"></ion-icon>
                                </div>
                                </button>
                                <p class="text-center fs-6 fw-lighter">Unlimited Credits</p>
                            </div>
                        </div>
                    </div>
    `;
  detailsCard.appendChild(detailsContainer);
  const topicTitle = document.createElement("h2");
  topicTitle.classList.add("topic-title");
  topicTitle.textContent = `${detailsData.topic} Sub Topics`;
  topicList.appendChild(topicTitle);
  detailsData.subtopics.forEach((subtopic) => {
    const subtopicElement = document.createElement("div");
    subtopicElement.classList.add("topic-item");
    const markedIcon = document.createElement("ion-icon");
    markedIcon.classList.add("marked-icon");
    markedIcon.name = "checkmark-circle-outline";
    const subtopicText = document.createTextNode(subtopic);
    subtopicElement.appendChild(markedIcon);
    subtopicElement.appendChild(subtopicText);
    topicList.appendChild(subtopicElement);
  });
  loading.style.display = "none";
}
//To fetch and display Topics list
window.addEventListener("load", async () => {
  detailsData = await fetching(`https://tap-web-1.herokuapp.com/topics/details/${topicId}`);
  display();
});
// Function to add a topic to favourites
function addToFavourites(favourites) {
  let newOne = {
    id: topicId,
    image: detailsData.image,
    topic: detailsData.topic,
    rating: detailsData.rating,
  };
  favourites.push(newOne);
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
// Function to remove a topic from favourites
function removeFromFavourites(favourites, topicId) {
  const index = favourites.findIndex((e) => e.id === topicId);
  if (index !== -1) {
    favourites.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
}
// To the "Add to Favourites" button
const handleAddToFavourites = () => {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (favourites.some((favourite) => favourite.id === topicId)) {
    removeFromFavourites(favourites, topicId);
  } else {
    addToFavourites(favourites);
  }
};