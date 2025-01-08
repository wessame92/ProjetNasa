document.addEventListener('DOMContentLoaded', () =>{
    const apiKey = 'QKefTqexu4yYhyTw7gNWQ9vKlfctg7HkigTPrvos'
    const dateInput = document.getElementById('dateInput');
    const fetchImageBtn = document.getElementById('fetchImageBtn');
    const imageContainer = document.getElementById('imageContainer');

    async function fetchImageNasa(date) {
     try{
        const response = await fetch (`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
       if (!response.ok){
            throw new Error('Impossible de récupérer les données pour cette date.')
       }
       const data = await response.json();
       displayImage(data);  
     }catch (error){
        imageContainer.innerHTML= `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
}

function displayImage(data){
   const {date, title,url,media_type} = data;

    
  if (media_type === 'image') {
    imageContainer.innerHTML = `
        <h2>${title} (${date})</h2>
        <img src="${url}" alt="${title}" />
         
    `;
}else {
    imageContainer.innerHTML = `<p>Le contenu n'est pas pris en charge</p>`
   }
}
displayImage



fetchImageBtn.addEventListener('click', () => {
   const selectDate = dateInput.value; 
   if (selectDate){
    fetchImageNasa(selectDate);

   }else {
    imageContainer.innerHTML = `<p style="color: red ">Veuillez sélectionner une date. </p>`;
   }
       


   });
});
