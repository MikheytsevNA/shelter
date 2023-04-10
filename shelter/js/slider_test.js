export default function sliderHandlerTest () {

    async function getDataFromJson(pathToJson) {
        const request = new Request(pathToJson);
        const promise = await fetch(request);
        const petsList = await promise.json();
        
        return petsList;
    }

    
    getDataFromJson("./../assets/items.json")
    .then(data => {
        var petCards = new petCard();
        petCards.current = Array.from(Array(data.length).keys()).slice(0,3);
        petCards.other = Array.from(Array(data.length).keys()).slice(3,data.length);
        petCards.moveLeft();
        makeInitial(data, petCards);
    
        const rightButton = document.querySelector('.arrow-button.right');
        rightButton.addEventListener('click', rightSlideHandle);
    
        const leftButton = document.querySelector('.arrow-button.left');
        leftButton.addEventListener('click', leftSlideHandle);

        function rightSlideHandle (event) {
            document.querySelectorAll(".pet-card").forEach((element) => {
                    element.className = "pet-card hidden";
            });
            let countright= 0;
            for (let i of petCards.current) {
                switch (countright) {
                    case 0:
                        document.querySelectorAll(".pet-card")[i].classList.add("tablet-dispay")
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                    case 1:
                        document.querySelectorAll(".pet-card")[i].classList.add("mobile-display")
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                    case 2:
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                }
                countright +=1;
            }
            petCards.moveRight();
        }
        function leftSlideHandle (event) {
            document.querySelectorAll(".pet-card").forEach((element) => {
                    element.className = "pet-card hidden";
            });
            let countleft = 0;
            for (let i of petCards.current) {
                switch (countleft) {
                    case 0:
                        document.querySelectorAll(".pet-card")[i].classList.add("tablet-dispay")
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                    case 1:
                        document.querySelectorAll(".pet-card")[i].classList.add("mobile-display")
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                    case 2:
                        document.querySelectorAll(".pet-card")[i].classList.toggle("hidden");
                        break;
                }
                countleft +=1;
            }
            petCards.moveLeft();
        }

    })
    .catch(reason => console.log(reason.message))

    function makeInitial (obj, petCards) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            element.remove();
        });
        let countCard = 0;
        for (let i of petCards.current.concat(petCards.other.concat(petCards.saved))) {
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
                default:
                    div.className = 'pet-card hidden';
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


    class petCard {
        "current" = 0;
        "other" = 0;
        "saved" = 0;
        "isSavedRight" = null;
        moveLeft() {
            if (this.isSavedRight === false) {
                let a = this.current;
                this.current = this.saved;
                this.saved = a;
                this.isSavedRight = true;
            } else {  
                this.isSavedRight = false;
                let shuffledArray;
                if (this.saved !== 0) {
                    shuffledArray = ((this.other).concat(this.saved)).sort(() => 0.5 - Math.random());
                } else {
                    shuffledArray = this.other.sort((a, b) => 0.5 - Math.random());
                }
                this.saved = this.current;
                this.current = shuffledArray.slice(0, 3);
                this.other = shuffledArray.slice(3)
            };
            this.saved.sort();
            this.current.sort();
            this.other.sort();
            //console.log(this.toString());
        };

        moveRight() {
            //console.log(this.toString());
            if (this.isSavedRight === true) {
                let a = this.current;
                this.current = this.saved;
                this.saved = a;
                this.isSavedRight = false;
            } else {
                this.isSavedRight = true;
                let shuffledArray;
                if (this.saved !== 0) {
                    shuffledArray = ((this.other).concat(this.saved)).sort(() => 0.5 - Math.random());
                    //console.log(shuffledArray);
                } else {
                    shuffledArray = (this.other).sort((a, b) => 0.5 - Math.random());
                }
                this.saved = this.current;
                this.current = shuffledArray.slice(0, 3);
                this.other = shuffledArray.slice(3);
            };
            this.saved.sort();
            this.current.sort();
            this.other.sort();
            //console.log(this.toString());
        };
        toString() {
            console.log(this.current);
            console.log(this.other);
            console.log(this.saved);
        };
    }
}