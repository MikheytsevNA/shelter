export default function pagingHandler () {
    async function getDataFromJson(pathToJson) {
        const request = new Request(pathToJson);
        const promise = await fetch(request);
        const petsList = await promise.json();
        
        return petsList;
    }

    
    getDataFromJson("./../assets/items.json")
    .then(data => {
        var width_tablet = 768;
        var width_mobile = 320;
        var pagesArray = new pages(data);

        if (window.innerWidth > 300 && window.innerWidth < 750) {
            pagesArray.setPages(16, 2);
            makeInitial (data, pagesArray);
        } else if (window.innerWidth > 750 && window.innerWidth < 1182) {
            pagesArray.setPages(8, 5);
            makeInitial (data, pagesArray);
        } else {
            pagesArray.setPages(6, 7);
            makeInitial (data, pagesArray);
        }
        
        window.addEventListener("resize", (event) => { // making appropriate number of cards on resize
            if (window.innerWidth > 300 && window.innerWidth < 750) {
                pagesArray.setPages(16, 2);
                makeInitial (data, pagesArray);
            } else if (window.innerWidth > 750 && window.innerWidth < 1182) {
                pagesArray.setPages(8, 5);
                makeInitial (data, pagesArray);
            } else {
                pagesArray.setPages(6, 7);
                makeInitial (data, pagesArray);
            }
        });
        const toRightButton = document.querySelector('.to-next-button');
        const toLeftButton = document.querySelector('.to-prev-button');
        const toLastButton = document.querySelector('.to-last-button');
        const toFirstButton = document.querySelector('.to-first-button');

        const pageNumber = document.querySelector('.list-counter');

        toRightButton.addEventListener('click', rightClickHandle);
        toLeftButton.addEventListener('click', leftClickHandle);
        toLastButton.addEventListener('click', lastClickHandle);
        toFirstButton.addEventListener('click', firstClickHandle);

        function rightClickHandle () {
            pagesArray.moveRight();
            makeInitial (data, pagesArray);
            pageNumber.textContent = pagesArray.currentPage;
            if (pagesArray.currentPage == pagesArray.pageCount) {
                toRightButton.classList.toggle('inactive');
                toRightButton.disabled = true;
                toLastButton.classList.toggle('inactive');
                toLastButton.disabled = true;
            }
            if (toLeftButton.classList.contains('inactive')) {
                toLeftButton.classList.remove("inactive");
                toLeftButton.disabled = false;
                toFirstButton.classList.toggle('inactive');
                toFirstButton.disabled = false;
            }
        }

        function leftClickHandle () {
            pagesArray.moveLeft();
            makeInitial (data, pagesArray);
            pageNumber.textContent = pagesArray.currentPage;
            if (pagesArray.currentPage == 1) {
                toLeftButton.classList.toggle('inactive');
                toLeftButton.disabled = true;
                toFirstButton.classList.toggle('inactive');
                toFirstButton.disabled = true;
            }
            if (toRightButton.classList.contains('inactive')) {
                toRightButton.classList.remove("inactive");
                toRightButton.disabled = false;
                toLastButton.classList.toggle('inactive');
                toLastButton.disabled = false;
            }
        }

        function lastClickHandle () {
            pagesArray.moveRightEnd();
            makeInitial (data, pagesArray);
            pageNumber.textContent = pagesArray.currentPage;
            toRightButton.classList.toggle('inactive');
            toRightButton.disabled = true;
            toLastButton.classList.toggle('inactive');
            toLastButton.disabled = true;
            if (toLeftButton.classList.contains('inactive')) {
                toLeftButton.classList.remove("inactive");
                toLeftButton.disabled = false;
                toFirstButton.classList.toggle('inactive');
                toFirstButton.disabled = false;
            }
        }

        function firstClickHandle () {
            pagesArray.moveLeftEnd()
            makeInitial (data, pagesArray);
            pageNumber.textContent = pagesArray.currentPage;
            toLeftButton.classList.toggle('inactive');
            toLeftButton.disabled = true;
            toFirstButton.classList.toggle('inactive');
            toFirstButton.disabled = true;
            if (toRightButton.classList.contains('inactive')) {
                toRightButton.classList.remove("inactive");
                toRightButton.disabled = false;
                toLastButton.classList.toggle('inactive');
                toLastButton.disabled = false;
            }
        }

    });

    function makeInitial (obj, pageArray) {
        document.querySelectorAll(".pet-card").forEach((element) => {
            element.remove();
        });
        for (let i of pageArray.currentArray) {
            let div = document.createElement('div');
            div.className = 'pet-card';
            div.innerHTML = `<img src=${'./.' +obj[i].img} alt=${obj[i].type}>
                            <p>${obj[i].name}</p>
                            <button class="learn-more-button">
                                Learn more
                            </button>`
            document.querySelector(".pet-cards-area.pets-page").append(div);
        }
    }

    class pages {
        constructor (data) {
            this.pageCount = 6;
            this.currentPage = 1;
            this.cardsArray = [];
            this.max = 7;
            this.min = 0;
            for (let i = 0; i<48; i++) {
                this.cardsArray.push(Math.floor(Math.random() * (this.max - this.min) + this.min));
            }
            this.currentArray = this.cardsArray.slice(this.min, this.max+1);
        }
        moveRight () {
            if (this.currentPage < this.pageCount) {
                this.currentArray = this.cardsArray.slice(this.min + this.currentPage*(this.max+1), this.max+1 + this.currentPage*(this.max+1));
                this.currentPage += 1;
            };
        }
        moveLeft () {
            if (this.currentPage > 1) {
                this.currentArray = this.cardsArray.slice(this.min + (this.currentPage-2)*(this.max+1), this.max+1 + (this.currentPage-2)*(this.max+1));
                this.currentPage -= 1;
            };
        }
        moveRightEnd () {
            if (this.currentPage != this.pageCount) {
                this.currentArray = this.cardsArray.slice(this.min + (this.pageCount-1)*(this.max+1), this.max+1 + (this.pageCount-1)*(this.max+1));
                this.currentPage = this.pageCount;
            }
        }
        moveLeftEnd () {
            if (this.currentPage != 1) {
                this.currentArray = this.cardsArray.slice(this.min, this.max+1);
                this.currentPage = 1;
            }
        }
        setPages (pages, perPage) {
            this.pageCount = pages;
            this.max = perPage;
            this.currentArray = this.cardsArray.slice(this.min, this.max+1);
        }
    }

}