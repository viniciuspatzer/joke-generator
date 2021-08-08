'use strict';

const jokeEl = document.querySelector('#joke_text');
const buttonEl = document.querySelector('#button');

let jokesToFilter = []
let jokesArr = [];

const fillJokes = async function () {
    while (jokesArr.length <= 100) {
        try {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&amount=10');

            if (!res.ok)
                throw new Error('Problem with getting the joke.');

            const { jokes } = await res.json();

            // Filling array data
            jokes.forEach(joke => jokesToFilter.push(joke));
        }

        catch (err) {
            console.error(err)
            alert(err);
        }
    }
    // Filtering jokes array
    jokesArr = [...new Set(jokesToFilter)];
};

const getJoke = function () {
    const i = Math.floor(Math.random() * jokesArr.length);
    const joke = jokesArr[i].joke;
    jokeEl.textContent = joke;
    jokesArr.splice(i, 1);
    // using before... 
};


buttonEl.addEventListener('click', getJoke);
window.addEventListener('DOMContentLoaded', fillJokes);