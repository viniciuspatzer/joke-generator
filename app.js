'use strict';

// Elements
const jokeEl = document.querySelector('#joke_text');
const buttonEl = document.querySelector('#button');

// Data
const jokesArr = [];
const jokesRep = [`Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says "Do you get the reference?" But Java didn't.`];


// Fetch API and fill jokes array
(async () => {
    while (jokesArr.length <= 100) {
        try {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&amount=10');

            if (!res.ok)
                throw new Error('Problem with getting the joke.');

            const { jokes } = await res.json();
            jokes.forEach(data => jokesArr.push(data.joke));
        }

        catch (err) {
            console.error(err);
        }
    };
})();

const getJoke = function () {
    const filteredJokes = [...new Set(jokesArr)].filter(value =>
        !jokesRep.includes(value));

    if (filteredJokes.length === 0)
        return alert('There is no more jokes!!');

    const r = Math.floor(Math.random() * filteredJokes.length);
    const joke = filteredJokes[r];

    jokeEl.textContent = joke;
    jokesRep.push(joke);
};


buttonEl.addEventListener('click', getJoke);