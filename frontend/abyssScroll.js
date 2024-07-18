// abyssScroll.js

const AbyssScroll = (function() {
    // Private Variablen
    let button, abyssContent, isInAbyss = false;

    // DOM-Manipulation Funktionen
    function showAbyssContent() {
        abyssContent.style.display = 'block';
    }

    function hideAbyssContent() {
        abyssContent.style.display = 'none';
    }

    function createAbyssDiv() {
        const abyssDiv = document.createElement('div');
        abyssDiv.style.height = '1000000px';
        abyssDiv.id = 'abyssDiv';
        document.body.appendChild(abyssDiv);
    }

    function removeAbyssDiv() {
        const abyssDiv = document.getElementById('abyssDiv');
        if (abyssDiv) {
            document.body.removeChild(abyssDiv);
        }
    }

    // Cookie Funktionen
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Fullscreen Funktionen
    function enterFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // UI Update Funktionen
    function updateButtonState(clicked) {
        button.textContent = clicked ? 'Zurück aus dem Abgrund' : 'Scroll into Abyss';
        button.style.backgroundColor = clicked ? '#e74c3c' : '#3498db';
    }

    // Scroll Funktionen
    function preventScroll(e) {
        if (isInAbyss) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Haupt-Logik Funktionen
    function enterAbyss() {
        setCookie('abyssClicked', 'true', 7);
        showAbyssContent();
        createAbyssDiv();
        scrollToBottom();
        enterFullscreen(document.documentElement);
        updateButtonState(true);
        isInAbyss = true;
    }

    function exitAbyss() {
        hideAbyssContent();
        removeAbyssDiv();
        exitFullscreen();
        scrollToTop();
        updateButtonState(false);
        isInAbyss = false;
    }

    // Event Handler
    function handleButtonClick() {
        isInAbyss ? exitAbyss() : enterAbyss();
    }

    function handlePageLoad() {
        const abyssClicked = getCookie('abyssClicked');
        updateButtonState(abyssClicked === 'true');
    }

    // Initialisierung
    function init() {
        button = document.getElementById('abyssButton');
        abyssContent = document.getElementById('abyssContent');
        hideAbyssContent();

        window.addEventListener('load', handlePageLoad);
        window.addEventListener('scroll', preventScroll, { passive: false });
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        button.addEventListener('click', handleButtonClick);
    }

    // Public API
    return {
        init: init
    };
})();

// Funktion aufrufen, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', AbyssScroll.init);