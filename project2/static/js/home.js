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
    if (document.getElementById("input_name").style.display === "none"){
        document.getElementById("input_name").style.display = "block";
    }
    else {
        document.getElementById("input_name").style.display = "none";
    }
}
function change_channel(name){
    name = String(name);
    localStorage.setItem('channel', name);
    var url = '/channel/' + name;
    var request = new XMLHttpRequest();
    request.open("POST", url);

    request.onload = () => {
        const data = JSON.parse(request.responseText);
        document.querySelector("h2") = "hello";
        
        var user = localStorage.getItem('name');
        var i;
        for (i = 0; i < data.name[1].length; i++){
            if (data.name[0] === user){
                var ur_text = document.createElement("div");
                ur_text.className = "my_text";

                var text_usr = document.createElement("span");
                text_usr.className = "my_usrnm";
                text_usr.innerHTML = data.name[i][0];
                ur_text.appendChild(text_usr);
                
                var text_message = document.createElement("p");
                text_message.className = "my_message";
                text_message.innerHTML = data.name[i][1];
                ur_text.appendChild(text_message);
                
                document.getElementsByClassName("recent_messages").appendChild(ur_text);
            }
            else {
                var text = document.createElement("div");
                text.className = "text";
                
                var usr_text = document.createElement("span");
                usr_text.className = "usrnm";
                usr_text.innerHTML = data.name[i][0];
                text.appendChild(usr_text);
                
                var message_text = document.createElement("p");
                message_text.className = "message";
                message_text.innerHTML = data.name[i][1];
                text.appendChild(message_text);
                
                document.getElementsByClassName("recent_messages").appendChild(text);
            }
        }
    }
}
