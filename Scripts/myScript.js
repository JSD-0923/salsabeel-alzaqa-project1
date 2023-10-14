const toggleThemeButton = document.getElementById('theme-btn');
const ThemeButtonName = document.getElementById('theme-name');
const openButton = document.getElementById('favourite-btn');
const nameLink = document.getElementById('name');
const drawer = document.getElementById('drawer');
const favouriteCards = document.querySelector(".favourite-cards");
const htmlElement = document.documentElement;
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
//To change the mode -light/dark-
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
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    ThemeButtonName.innerHTML = "Light Mode";
} else {
    htmlElement.setAttribute('data-theme', 'light');
    ThemeButtonName.innerHTML = "Dark Mode";
}
//To move between pages
nameLink.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'index.html';
  });
//favourite drawer
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