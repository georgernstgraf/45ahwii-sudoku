getdocumentbyid('1').addEventListener('hover', function () {
    this.style.backgroundColor = 'red';
    this.style.color = 'white';
});
function getdocumentbyid(id) {
    return document.getElementById(id);
}