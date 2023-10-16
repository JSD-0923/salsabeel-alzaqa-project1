
function lestTopics() {
    function fetchTopics() {
        return fetch('https://tap-web-1.herokuapp.com/topics/list')
            .then(response => response.json())
    }
    function reanderTopics(topics) {
        const searchResult = document.querySelector(".search-result");
        searchResult.innerHTML = `<p class="fs-2 fw-bold">"${topics.length}" Web Topics Found</p>`;
        const cardsContainer = document.getElementById('cards');
        topics.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
            <div class="col mb-3">
                    <div class="card h-100">
                        <div class="img-container">
                            <img src="./assets/${card.image}" class="card-img-top object-fit-fill" alt="HTML card image">
                        </div>
                        <div class="card-body">
                            <p class="card-title">${card.topic}</p>
                            <h6 class="card-text pb-3">${card.category}</h6>
                            <div class="text-warning rating-stars">
                            ${generateStarIcons(card.rating)}
                            </div>
                            <p class="card-text author">Author: ${card.name}</p>
                        </div>
                    </div>
                </div>`;

            cardsContainer.appendChild(cardElement);
            cardElement.addEventListener("click", async () => {
            const cardId = card.id;
            window.location.href = `details.html?id=${cardId}`;
            })
        });
    }
    window.addEventListener('load', async function () {
        const topics = await fetchTopics();
        reanderTopics(topics);

    });
    function generateStarIcons(rating) {
        const filledStars = Math.floor(rating);
        const starIcons = Array(filledStars).fill('<ion-icon name="star"></ion-icon>');
        if (rating % 1 !== 0) {
            starIcons.push('<ion-icon name="star-half"></ion-icon>');
        }
        const remainingStars = 5 - filledStars - (rating % 1 !== 0 ? 1 : 0);
        starIcons.push(...Array(remainingStars).fill('<ion-icon name="star-outline"></ion-icon>'));
        return starIcons.join('');
    }
}
lestTopics();