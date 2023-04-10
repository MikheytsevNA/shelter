export default function popUpHandler() {
    async function getDataFromJson(pathToJson) {
        const request = new Request(pathToJson);
        const promise = await fetch(request);
        const petsList = await promise.json();
        
        return petsList;
    }

    getDataFromJson("./../assets/items.json")
    .then(data => {
        const petsArea = document.querySelector(".pet-cards-area.pets-page");
        petsArea.addEventListener("click", learnMoreButton);

        function closePopUp(event) {
            document.querySelector('.pop-up').remove();
            document.body.classList.remove('scroll-lock');
        }

        function learnMoreButton (event) {
            const isButton = event.target.classList.contains("learn-more-button");
            if (!isButton) {
                return;
            }
            const nameToSearch = event.target.previousElementSibling.textContent;
            let index;
            for (let item in data) {
                if (data[item].name == nameToSearch) {
                    index = item;
                    break;
                }
            }
            
            let div = document.createElement('div');
            div.className = "pop-up"
            div.innerHTML =`
            <button class="close-button">
                <span>&#10005;</span>
            </button>
            <div class="container">
                <img src="${"./."+data[index].img}" alt="${data[index].type}">
                <div class="pop-up-text">
                    <h3>${data[index].name}</h3>
                    <div class="pop-up-breed">${data[index].breed}</div>
                    <div class="pop-up-description">${data[index].description}.</div>
                    <ul class="pop-up-details">
                        <li><b>Age:</b> ${data[index].age}</li>
                        <li><b>Inoculations:</b> ${data[index].inoculations}</li>
                        <li><b>Diseases:</b> ${data[index].diseases}</li>
                        <li><b>Parasites:</b> ${data[index].parasites}</li>
                    </ul>`
            document.querySelector("main").append(div);
            document.body.classList.add('scroll-lock');
            
            const closePopUpButton = document.querySelector(".close-button");
            closePopUpButton.addEventListener("click", closePopUp, {once:true});
        }
    });
}