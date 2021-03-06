import getJoke from "./joke_api.js";
import getPhoto from "./unsplash_api.js";
import jokeByTranslated from "./translate_api.js";

class Screen {
    constructor() {
        this.getJokeButton = document.getElementById("get-joke-button");
        this.resultDiv = document.getElementById("result");

        this.getJokeButton.addEventListener("click", () => this.getJoke());
    }

    async getJoke() {
        try {
            const randomPhoto = await getPhoto();
            const randomJoke = await getJoke();
            const translatedJoke = await jokeByTranslated(randomJoke);

            const results = {
                randomPhoto,
                randomJoke,
                translatedJoke
            }

            this.writeResultsOnScreen(results);
        } catch (error) {
            console.error(error.response);
        }
    }


    writeResultsOnScreen(results) {
        this.resultDiv.innerHTML = `
        <div class="card">
            <div class="card-image">
                <figure class="image is-16by9">
                    <img src="${results.randomPhoto}" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4 has-text-danger">${results.randomJoke}</p>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4 has-text-primary">${results.translatedJoke}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}
export default function init() {
    new Screen();
}