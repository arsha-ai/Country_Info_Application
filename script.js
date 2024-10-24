// Fetch country data from the REST Countries API
async function getCountryData() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (!countryName) return;

    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    
    const country = data[0];
    const countryInfo = document.getElementById('countryInfo');
    countryInfo.innerHTML = `
        <h2>${country.name.common} (${country.name.official})</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Country Code:</strong> ${country.cca2}</p>
        <p><strong>Demonym:</strong> ${country.demonyms.eng.m}</p>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" style="width:100px;">
    `;
}

// Compare two countries side by side with all fields
async function compareCountries() {
    const country1 = document.getElementById('compareCountry1').value.trim();
    const country2 = document.getElementById('compareCountry2').value.trim();
    if (!country1 || !country2) return;

    const [response1, response2] = await Promise.all([
        fetch(`https://restcountries.com/v3.1/name/${country1}`),
        fetch(`https://restcountries.com/v3.1/name/${country2}`)
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();
    
    const countryA = data1[0];
    const countryB = data2[0];

    document.getElementById('comparisonTable').innerHTML = `
        <div class="comparison-box">
            <h3>${countryA.name.common}</h3>
            <p><strong>Official Name:</strong> ${countryA.name.official}</p>
            <p><strong>Capital:</strong> ${countryA.capital[0]}</p>
            <p><strong>Region:</strong> ${countryA.region}</p>
            <p><strong>Subregion:</strong> ${countryA.subregion}</p>
            <p><strong>Timezones:</strong> ${countryA.timezones.join(', ')}</p>
            <p><strong>Languages:</strong> ${Object.values(countryA.languages).join(', ')}</p>
            <p><strong>Population:</strong> ${countryA.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${countryA.area.toLocaleString()} km²</p>
            <p><strong>Country Code:</strong> ${countryA.cca2}</p>
            <p><strong>Demonym:</strong> ${countryA.demonyms.eng.m}</p>
            <p><strong>Borders:</strong> ${countryA.borders ? countryA.borders.join(', ') : 'None'}</p>
            <img src="${countryA.flags.svg}" alt="Flag of ${countryA.name.common}" style="width:100px;">
        </div>
        <div class="comparison-box">
            <h3>${countryB.name.common}</h3>
            <p><strong>Official Name:</strong> ${countryB.name.official}</p>
            <p><strong>Capital:</strong> ${countryB.capital[0]}</p>
            <p><strong>Region:</strong> ${countryB.region}</p>
            <p><strong>Subregion:</strong> ${countryB.subregion}</p>
            <p><strong>Timezones:</strong> ${countryB.timezones.join(', ')}</p>
            <p><strong>Languages:</strong> ${Object.values(countryB.languages).join(', ')}</p>
            <p><strong>Population:</strong> ${countryB.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${countryB.area.toLocaleString()} km²</p>
            <p><strong>Country Code:</strong> ${countryB.cca2}</p>
            <p><strong>Demonym:</strong> ${countryB.demonyms.eng.m}</p>
            <p><strong>Borders:</strong> ${countryB.borders ? countryB.borders.join(', ') : 'None'}</p>
            <img src="${countryB.flags.svg}" alt="Flag of ${countryB.name.common}" style="width:100px;">
        </div>
    `;
}

// Clear comparison data
function clearComparison() {
    document.getElementById('comparisonTable').innerHTML = '';
}
