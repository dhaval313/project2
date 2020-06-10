document.addEventListener('DOMContentLoaded', usrnm());
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.usr').innerHTML = localStorage.getItem('name');
});
function change_username() {
    var i = 0;
    while (i === 0){
        var name = prompt("Change your name: ", localStorage.getItem('name'));
        if (name.length > 12) {
            name = prompt("Length must be less thane 12:", localStorage.getItem('name'));
        }
        if (name != null && name != "") {
            localStorage.setItem('name', name);
            i = 1;
        }
        else if (name == null) {
            i = 1;
        }
    }
}
function create_channel() {
    var i = 0;
    while (i === 0){
        var name = prompt("Channel name: ");
        if (name.length > 12) {
            name = prompt("Length must be less thane 12:");
        }
        if (name != null && name != "") {
            document.querySelector('.new').value = name;
            document.querySelector('.flag').value = 1;
            i = 1;
        }
        else if (name == null) {
            i = 1;
        }
    }
    const request = new XMLHttpRequest();
    request.open('POST','/login');

    request.onload = () => {
        document.querySelector('.flag').value = 0;
    }
}
