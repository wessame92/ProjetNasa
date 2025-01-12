document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'QKefTqexu4yYhyTw7gNWQ9vKlfctg7HkigTPrvos';  
    const dateInput = document.getElementById('dateInput'); 
    const fetchImageBtn = document.getElementById('fetchImageBtn');  
    const imageContainer = document.getElementById('imageContainer');  

    
    function fetchImageNasa(date) {
        const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Impossible de récupérer les données pour cette date.');
                }
                return response.json();
            })
            .then(data => displayImage(data))
            .catch(error => {
                imageContainer.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
            });
    }

     
    function displayImage(data) {
        const { date, title, url, explanation, media_type } = data;

        if (media_type === 'image') {
            imageContainer.innerHTML = `
                <h2>${title} (${date})</h2>
                <img src="${url}" alt="${title}" style="max-width: 100%; height: auto;" />
                <p>${explanation}</p>
            `;
       
        } else {
            imageContainer.innerHTML = `<p>Le contenu n'est pas pris en charge.</p>`;
        }
    }

   
    const today = new Date().toISOString().split('T')[0];  
    fetchImageNasa(today);

     
    fetchImageBtn.addEventListener('click', () => {
        const selectedDate = dateInput.value; 
        if (selectedDate) {
            fetchImageNasa(selectedDate);  
        } else {
            imageContainer.innerHTML = `<p style="color: red;">Veuillez sélectionner une date.</p>`;
        }
    });
});
