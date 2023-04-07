export default function sliderHandler () {
    let isNew = false; //something with vars
    let count = 3;
    document.querySelectorAll(".pet-card").forEach((element) => {if (window.getComputedStyle(element).display == 'none') { count -= 1}})
    
    async function getDataFromJson(pathToJson) {
        const request = new Request(pathToJson);
        const promise = await fetch(request);
        const petsList = await promise.json();

        makeCards (petsList);
        
    }

    function makeCards (obj) {
        if (isNew === false) {
            console.log(123);
            var curentList = Array.from(Array(obj.length).keys()).slice(0, count);
            var otherList = Array.from(Array(obj.length).keys()).slice(count, obj.length);
            isNew = true;
        }
        let shuffledArray = otherList.sort((a, b) => 0.5 - Math.random()); //something with vars
        otherList = curentList.concat(shuffledArray.slice(count, shuffledArray.length)); //something with vars
        curentList = shuffledArray.slice(0, count); //something with vars
        console.log(otherList);
        console.log(curentList);
        makeRight (obj);
        makeLeft (obj);

        function makeRight (obj) {
            for (let i of curentList) {
                let div = document.createElement('div');
                div.className = 'pet-card hidden-right';
                div.innerHTML = `<img src=${obj[i].img} alt=${obj[i].type}>
                                <p>${obj[i].name}</p>
                                <button class="learn-more-button">
                                    Learn more
                                </button>`
                document.querySelectorAll(".pet-card")[count-1].after(div);
            }
        }

        function makeLeft (obj) {
            for (let i of curentList) {
                let div = document.createElement('div');
                div.className = 'pet-card hidden-left';
                div.innerHTML = `<img src=${obj[i].img} alt=${obj[i].type}>
                                <p>${obj[i].name}</p>
                                <button class="learn-more-button">
                                    Learn more
                                </button>`
                document.querySelectorAll(".pet-card")[0].before(div);
            }
        }
    }

    function rightSlideHandle (event) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            if (window.getComputedStyle(element).display != 'none') { element.classList.add("hidden-left")}})
        document.querySelectorAll(".pet-card.hidden-right").forEach((element) => {
            element.classList.remove("hidden-right");
        });
        document.querySelectorAll(".pet-card.hidden-left").forEach((element) => {
            element.remove();
        });
        getDataFromJson("./../assets/items.json");
    }

    function leftSlideHandle (event) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            if (window.getComputedStyle(element).display != 'none') { element.classList.add("hidden-right")}})
        document.querySelectorAll(".pet-card.hidden-left").forEach((element) => {
            element.classList.remove("hidden-left");
        });
        document.querySelectorAll(".pet-card.hidden-right").forEach((element) => {
            element.remove();
        });
        getDataFromJson("./../assets/items.json");
    }

    const rightButton = document.querySelector('.arrow-button.right');
    rightButton.addEventListener('click', rightSlideHandle);

    const leftButton = document.querySelector('.arrow-button.left');
    leftButton.addEventListener('click', leftSlideHandle);

    const petsList = getDataFromJson("./../assets/items.json");
}