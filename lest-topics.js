
function lestTopics() {
    function fetchTopics() {
        return fetch('https://tap-web-1.herokuapp.com/topics/list')
            .then(response => response.json())
    }
    function reanderTopics(topics) {
        const cardsContainer = document.getElementById('cards');

        topics.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            cardElement.innerHTML = `
                    <div class="card-img">
                        <img src="img/${card.image}" alt="${card.topic}">
                    </div>
                    <div class="card-descreption">
                        <p>${card.topic}<br>
                        <span>${card.category}</span>
                        </p>
                        <div class="icon">
                            ${generateStarIcons(card.rating)}
                        </div>
                        <p class="author">${card.name}</p>
                    </div>
                `;

            cardsContainer.appendChild(cardElement);

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