export default function sliderHandler () {
    let isNew = false;
    var count = 3;
    var listOfCards = {'current' : 0, 'other' : 0};

    async function getDataFromJson(pathToJson) {
        const request = new Request(pathToJson);
        const promise = await fetch(request);
        const petsList = await promise.json();

        makeCards (petsList); 
    }

    function makeCards (obj) {
        if (listOfCards.other === 0) {
            listOfCards.other = Array.from(Array(obj.length).keys());
            let shuffledArray = listOfCards.other.sort((a, b) => 0.5 - Math.random());
            listOfCards.current = shuffledArray.slice(0, count);
            listOfCards.other = shuffledArray.slice(count, obj.length);
        } else {
            let shuffledArray = listOfCards.other.sort((a, b) => 0.5 - Math.random());
            listOfCards.other = listOfCards.current.concat(shuffledArray.slice(count, shuffledArray.length));
            listOfCards.current = shuffledArray.slice(0, count);
        }

        makeInitial(obj);
        makeRight(obj);
        makeLeft(obj);
    }
    function makeInitial (obj) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            element.remove();
        });
        let countCard = 0;
        for (let i of listOfCards.current) {
            let div = document.createElement('div');
            switch (countCard) {
                case 0 :
                    div.className = 'pet-card tablet-dispay';
                    break;
                case 1 :
                    div.className = 'pet-card mobile-display';
                    break;
                case 2 :
                    div.className = 'pet-card';
                    break;
            }
            div.innerHTML = `<img src=${obj[i].img} alt=${obj[i].type}>
                            <p>${obj[i].name}</p>
                            <button class="learn-more-button">
                                Learn more
                            </button>`
            document.querySelectorAll(".arrow-button")[0].after(div);
            countCard += 1;
        }
    }

    function makeRight (obj) {
        let countCard = 0;
        for (let i of listOfCards.current) {
            let div = document.createElement('div');
            switch (countCard) {
                case 0 :
                    div.className = 'pet-card hidden-right tablet-dispay';
                    break;
                case 1 :
                    div.className = 'pet-card hidden-right mobile-display';
                    break;
                case 2 :
                    div.className = 'pet-card hidden-right';
                    break;
            }
            div.innerHTML = `<img src=${obj[i].img} alt=${obj[i].type}>
                            <p>${obj[i].name}</p>
                            <button class="learn-more-button">
                                Learn more
                            </button>`
            document.querySelectorAll(".pet-card")[count-1].after(div);
            countCard += 1;
        }
    }

    function makeLeft (obj) {
        let countCard = 0;
        for (let i of listOfCards.current) {
            let div = document.createElement('div');
            switch (countCard) {
                case 0:
                    div.className = 'pet-card hidden-left tablet-dispay';
                    break;
                case 1:
                    div.className = 'pet-card hidden-left mobile-display';
                    break;
                case 2:
                    div.className = 'pet-card hidden-left';
                    break;
            }
            div.innerHTML = `<img src=${obj[i].img} alt=${obj[i].type}>
                            <p>${obj[i].name}</p>
                            <button class="learn-more-button">
                                Learn more
                            </button>`
            document.querySelectorAll(".pet-card")[0].before(div);
            countCard += 1;
        }
    }

    function rightSlideHandle (event) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            if (!element.classList.contains("hidden-right")) {
                if (!element.classList.contains("hidden-left")) {
                    element.classList.add("hidden-left");
                }
            }
        });
        document.querySelectorAll(".pet-card.hidden-right").forEach((element) => {
            element.classList.remove("hidden-right");
        });
        setTimeout(() => {document.querySelectorAll(".pet-card.hidden-left").forEach((element) => {;
            element.remove();
        });}, 350);
        //getDataFromJson("./../assets/items.json");
        setTimeout(() => {getDataFromJson("./../assets/items.json");}, 400);
    }

    function leftSlideHandle (event) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            if (!element.classList.contains("hidden-left")) {
                if (!element.classList.contains("hidden-right")) {
                    element.classList.add("hidden-right")
                }
            }
        });
        document.querySelectorAll(".pet-card.hidden-left").forEach((element) => {
            element.classList.remove("hidden-left");
        });
        setTimeout(() => {document.querySelectorAll(".pet-card.hidden-right").forEach((element) => {
            element.remove();
        });}, 350);
        setTimeout(() => {getDataFromJson("./../assets/items.json");}, 351);
    }

    const rightButton = document.querySelector('.arrow-button.right');
    rightButton.addEventListener('click', rightSlideHandle);

    const leftButton = document.querySelector('.arrow-button.left');
    leftButton.addEventListener('click', leftSlideHandle);

    getDataFromJson("./js/items.json");
    //setTimeout(() => {leftSlideHandle();}, 50);
}