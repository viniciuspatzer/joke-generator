'use strict';

const jokeEl = document.querySelector('#joke_text');
const buttonEl = document.querySelector('#button');

let jokesArr = [];
let jokesRep = [`Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says "Do you get the reference?" But Java didn't.`];


const fillJokes = async function () {
    while (jokesArr.length <= 100) {
        try {
            const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single&amount=10');

            if (!res.ok)
                throw new Error('Problem with getting the joke.');

            const { jokes } = await res.json();
            jokes.forEach(joke => jokesArr.push(joke));
        }

        catch (err) {
            console.error(err);
            alert(err);
        }
    };
};

const getJoke = function () {
    try {
        const filteredJokes = [...new Set(jokesArr)].filter(value =>
            !jokesRep.includes(value.joke));

        if (!filteredJokes)
            return alert('There is no more jokes!!');

        const n = Math.floor(Math.random() * filteredJokes.length);
        const joke = filteredJokes[n].joke;

        jokeEl.textContent = joke;
        jokesRep.push(joke);
    }

    catch (err) {
        console.error(err)
        alert('There is no more jokes!');
    }
};


buttonEl.addEventListener('click', getJoke);
window.addEventListener('DOMContentLoaded', fillJokes);