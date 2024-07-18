// abyssScroll.js

function initAbyssScroll() {
    const button = document.getElementById('abyssButton');
    const abyssContent = document.getElementById('abyssContent');
    let isScrolled = false;

    // Initial den Abyss-Inhalt verstecken
    abyssContent.style.display = 'none';

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

    function updateButtonState(clicked) {
        if (clicked) {
            button.textContent = 'Bereits geklickt';
            button.style.backgroundColor = '#95a5a6';
            button.disabled = true;
        } else {
            button.textContent = 'Scroll into Abyss';
            button.style.backgroundColor = '#3498db';
            button.disabled = false;
        }
    }

    // Überprüfen Sie beim Laden der Seite, ob der Cookie gesetzt ist
    window.addEventListener('load', function() {
        const abyssClicked = getCookie('abyssClicked');
        updateButtonState(abyssClicked === 'true');
    });

    button.addEventListener('click', function() {
        if (!isScrolled) {
            // Cookie setzen
            setCookie('abyssClicked', 'true', 7); // Cookie für 7 Tage setzen

            // Abyss-Inhalt anzeigen
            abyssContent.style.display = 'block';

            // Sehr hohen div erstellen, um Scrollen zu ermöglichen
            const abyssDiv = document.createElement('div');
            abyssDiv.style.height = '1000000px';
            abyssDiv.id = 'abyssDiv';
            document.body.appendChild(abyssDiv);

            // Zum Abyss-Inhalt scrollen
            abyssContent.scrollIntoView({ behavior: 'smooth' });

            // Vollbildmodus aktivieren
            enterFullscreen(document.documentElement);

            // Button-Erscheinungsbild ändern
            button.textContent = 'Zurück aus dem Abgrund';
            button.style.backgroundColor = '#e74c3c';

            isScrolled = true;
        } else {
            // Abyss-Inhalt ausblenden
            abyssContent.style.display = 'none';

            // Hohen div entfernen
            const abyssDiv = document.getElementById('abyssDiv');
            if (abyssDiv) {
                document.body.removeChild(abyssDiv);
            }

            // Vollbildmodus beenden
            exitFullscreen();

            // Zurück nach oben scrollen
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Button-Zustand aktualisieren
            updateButtonState(true);

            isScrolled = false;
        }
    });
}

// Funktion aufrufen, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initAbyssScroll);