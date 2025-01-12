document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'QKefTqexu4yYhyTw7gNWQ9vKlfctg7HkigTPrvos';   
    const fetchPhotosBtn = document.getElementById('fetchPhotosBtn');
    const roverSelect = document.getElementById('rover');
    const solInput = document.getElementById('sol');
    const cameraSelect = document.getElementById('camera');
    const photoContainer = document.getElementById('photoContainer');

   
    async function fetchRoverPhotos(rover, sol, camera = '') {
        let cameraQuery = '';

         
        if (camera && camera !== 'all') {
            cameraQuery = `&camera=${camera}`;
        }

        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${cameraQuery}&api_key=${apiKey}`;
        
        
        console.log("URL de la requête: ", url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Impossible de récupérer les photos pour le rover ${rover} et le sol ${sol}`);
        const data = await response.json();
 
        if (data.photos && data.photos.length > 0) {
            return data.photos;
        } else {
            throw new Error(`Aucune photo disponible pour le rover ${rover}, sol ${sol}, caméra ${camera || 'toutes'}`);
        }
    }

     
    function displayPhotos(photos) {
        photoContainer.innerHTML = '';  

        if (photos.length === 0) {
            photoContainer.innerHTML = `<p>Aucune photo disponible pour ces critères.</p>`;
            return;
        }

        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.innerHTML = `
                <h3>Sol: ${photo.sol} - Caméra: ${photo.camera.name}</h3>
                <img src="${photo.img_src}" alt="Photo de Mars">
                <p>Prise par le rover ${photo.rover.name}.</p>
            `;
            photoContainer.appendChild(card);
        });
    }

    
    fetchPhotosBtn.addEventListener('click', async () => {
        const rover = roverSelect.value;
        const sol = solInput.value;
        const camera = cameraSelect.value;

        if (!sol) {
            photoContainer.innerHTML = '<p style="color: red;">Veuillez entrer un sol.</p>';
            return;
        }

        try {
            const photos = await fetchRoverPhotos(rover, sol, camera);
            displayPhotos(photos);
        } catch (error) {
            photoContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        }
    });

     
    async function displayPhotosOfToday() {
        const rover = roverSelect.value;  
        const sol = 1000;   
        try {
            const photos = await fetchRoverPhotos(rover, sol);
            displayPhotos(photos);  
        } catch (error) {
            photoContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        }
    }

     
    displayPhotosOfToday();
});
