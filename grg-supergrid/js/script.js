// darkmode stuff
document.addEventListener('alpine:init', () => {
    console.log("darkmode init");
    Alpine.store('darkMode', {
        on: false,
        init() {
            this.on = localStorage.getItem('darkMode') === 'true';
        },
        toggle() {
            console.log(`darkmode toggle from ${this.value}`);
            this.on = !this.on;
            localStorage.setItem("darkMode", this.on);
            document.body.setAttribute('data-bs-theme', Alpine.store("darkMode").value);
        },
        get value() { return this.on ? "dark" : "light"; },
        get other() { return this.on ? "light" : "dark"; }
    });
    document.body.setAttribute('data-bs-theme', Alpine.store("darkMode").value);
    updateCells();
});

function updateCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        // cell.querySelector(":nth-child(4 of .possibility)").style.visibility="hidden"
        // cell.style.background="#00b000"
        // cell.style.background="color-mix(in srgb, #00ff00 65%, var(--bs-body-bg))"
        const val = cell.querySelector('.val');
        val.style.fontSize = `${cell.offsetHeight}px`;
        const posss = cell.querySelectorAll(".possibility");
        console.log(posss);
        posss.forEach(poss => { poss.style.fontSize = `${cell.offsetHeight / 8}px`; });
    });
};
// window.onresize = updateCells;