const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementById('theme-name');
const openButton = document.getElementById('favourite-btn');
const drawer = document.getElementById('drawer');
const favouriteCards = document.querySelector(".favourite-cards");
const htmlElement = document.documentElement;
const storedTheme = localStorage.getItem('theme');
//drow stars
export const StarIcons = (ratingStr) => {
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
export const fetching = async(api) =>
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
//To change the mode -light/dark-
export const changeMood = () => {
    if (storedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        ThemeButtonName.innerHTML = "Light Mode";
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        ThemeButtonName.innerHTML = "Dark Mode";
    }
    toggleThemeButton.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            ThemeButtonName.innerHTML = "Light Mode";
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            ThemeButtonName.innerHTML = "Dark Mode";
            localStorage.setItem('theme', 'light');
        }
    });
}
//favourite drawer
export const favouriteDrawer = () => {
    openButton.addEventListener('click', () => {
        drawer.style.transform = 'translateY(0)';

    });
    document.body.addEventListener('click', (event) => {
        if (!drawer.contains(event.target) && event.target !== openButton) {
            drawer.style.transform = 'translateY(100%)';
        }
    });
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favourites.length === 0) {
        favouriteCards.innerHTML = `<h4>There is nothing to show , Go and add some :) </h4>`;
    } else {
        favouriteCards.innerHTML = '';
        favourites.forEach((favourite) => {
            const favouriteCard = document.createElement("div");
            favouriteCard.classList.add("favourite-card");
            const starIcons = StarIcons(favourite.rating);
            favouriteCard.innerHTML = `
             <img class="favourite-img" src="./assets/${favourite.image}" alt="favourite card image">
                        <h4 class="favourite-title">${favourite.topic}</h4>
                        <div class="rating-stars">
                            ${starIcons}
                        </div>
        `;
            favouriteCards.appendChild(favouriteCard);
        });
    }
}