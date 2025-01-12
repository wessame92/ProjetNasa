document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'QKefTqexu4yYhyTw7gNWQ9vKlfctg7HkigTPrvos';  
    const fetchImageBtn = document.getElementById('fetchImageBtn');
    const dateInput = document.getElementById('dateInput');
    const imageContainer = document.getElementById('imageContainer');

   
    async function fetchImagesForDate(date) {
        const url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Impossible de récupérer les données pour la date : ${date}`);
        return response.json();
    }

     
    function displayImages(images, date) {
        imageContainer.innerHTML = ''; 

        if (images.length === 0) {
            imageContainer.innerHTML = `<p>Aucune image disponible pour la date ${date}.</p>`;
            return;
        }

        images.forEach(image => {
            const { image: imageName } = image;
            const [year, month, day] = date.split('-'); 

            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;

            const card = document.createElement('div');
            card.className = 'image-card';
            card.innerHTML = `
                <h3>${date}</h3>
                <img src="${imageUrl}" alt="Image de la Terre">
                <p>Image prise par le satellite DSCOVR.</p>
            `;
            imageContainer.appendChild(card);
        });
    }

   
    async function displayImagesOfToday() {
        const today = new Date().toISOString().split('T')[0];  
        dateInput.value = today; 
        try {
            const images = await fetchImagesForDate(today);
            displayImages(images, today); 
        } catch (error) {
            imageContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        }
    }

  
    fetchImageBtn.addEventListener('click', async () => {
        const selectedDate = dateInput.value; 
        if (!selectedDate) {
            imageContainer.innerHTML = '<p style="color: red;">Veuillez sélectionner une date.</p>';
            return;
        }

        try {
            imageContainer.innerHTML = '<p>Chargement des images...</p>';
            const images = await fetchImagesForDate(selectedDate);
            displayImages(images, selectedDate);  
        } catch (error) {
            imageContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        }
    });

    
    displayImagesOfToday();
});
