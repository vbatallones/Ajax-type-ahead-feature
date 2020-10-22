const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// set an empty array where we will insert all the cities and state object coming from the endpoint
const cities = []

// get the json data from the endpoint using fetch
fetch(endpoint)
    // if you console log the data you will see different kinds of file, but we need to go in the json to access the cities and state.
    // fetching the data in the json file. that is why we have "data.json()"
    .then(blob => blob.json())
// now that we have our json data, we need to transfer the json data into our cities array.
    .then(data => cities.push(...data))


function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //  here we need to figure our if the city or state matches what was search
        // in the regex "g" means global, it will search in the whole element. "i" means insensitive, it can be search either if the character is uppercase or lowercase.
        const regex = new RegExp(wordToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);