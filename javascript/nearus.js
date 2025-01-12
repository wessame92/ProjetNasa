document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'QKefTqexu4yYhyTw7gNWQ9vKlfctg7HkigTPrvos';  
    const fetchAsteroidsBtn = document.getElementById('fetchAsteroidsBtn');
    const todayDateInput = document.getElementById('todayDate');
    
    const asteroidContainer = document.getElementById('asteroidContainer');

    
    async function fetchAsteroids(todayDate) {
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayDate}&api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la récupération des données.');
        return response.json();
    }

    
    function displayAsteroids(data) {
        asteroidContainer.innerHTML = '';  

        const nearEarthObjects = data.near_earth_objects;
        let asteroidCount = 0;

       
        for (const date in nearEarthObjects) {
            nearEarthObjects[date].forEach(asteroid => {
                asteroidCount++;

                const {
                    name,
                    close_approach_data,
                    estimated_diameter
                } = asteroid;

                const approach = close_approach_data[0];
                const diameter = estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
                const distance = approach.miss_distance.kilometers;
                const velocity = approach.relative_velocity.kilometers_per_hour;
 
                const card = document.createElement('div');
                card.className = 'asteroid-card';
                card.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Diamètre :</strong> ${diameter} km</p>
                    <p><strong>Distance :</strong> ${parseFloat(distance).toLocaleString()} km</p>
                    <p><strong>Vitesse :</strong> ${parseFloat(velocity).toLocaleString()} km/h</p>
                    <p><strong>Approche :</strong> ${approach.close_approach_date}</p>
                `;
                asteroidContainer.appendChild(card);
            });
        }

       
        if (asteroidCount === 0) {
            asteroidContainer.innerHTML = '<p>Aucun astéroïde trouvé pour cette date.</p>';
        }
    }
    const today = new Date().toISOString().split('T')[0];  
    fetchAsteroids(today);

     
    fetchAsteroidsBtn.addEventListener('click', async () => {
        const todayDate = todayDateInput.value;
        

        if (!todayDate) {
            asteroidContainer.innerHTML = '<p style="color: red;">Veuillez sélectionner date.</p>';
            return;
        }

        try {
            asteroidContainer.innerHTML = '<p>Chargement des données...</p>';
            const data = await fetchAsteroids(todayDate);
            displayAsteroids(data);  
        } catch (error) {
            asteroidContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        }
    });
});
