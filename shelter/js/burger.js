export default function burgerHandler() {
    function rotateButtonAndShadeOut (event) {
        if (event.target.closest(".nav-button")) {
            event.stopPropagation();
            burgerButton.classList.add('active-button');
            navList.classList.add('active-menu');
            document.body.classList.add('scroll-lock');
            document.body.addEventListener('click', closeMenu, {once: true});
        }

    }
    function closeMenu () {
        burgerButton.classList.remove('active-button');
        navList.classList.remove('active-menu');
        document.body.classList.remove('scroll-lock');
    }

    const burgerButton = document.querySelector('.nav-button');
    const navList = document.querySelector('.nav-list');
    document.body.addEventListener('click', rotateButtonAndShadeOut);
}