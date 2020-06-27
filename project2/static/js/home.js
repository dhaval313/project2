document.addEventListener('DOMContentLoaded', usrnm());
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.usr').innerHTML = localStorage.getItem('name');
    
    if (localStorage.getItem('channel')){
        change_channel(localStorage.getItem('channel'));
    }
});
function change_username() {
    var i = 0;
    while (i === 0) {
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
    if (document.getElementById("input_name").style.display === "none") {
        document.getElementById("input_name").style.display = "block";
    }
    else {
        document.getElementById("input_name").style.display = "none";
    }
}
function change_channel(name) {
    document.getElementsByClassName("recent_messages")[0].innerHTML = "";
    name = String(name);
    localStorage.setItem('channel', name);
    var url = '/channel/' + name;
    fetch(url)
        .then(data => data.json())
        .then(data => {
            var user = localStorage.getItem('name');
            var i;
            for (i = 0; i < data.length; i++) {
                if (data[i][0] === user) {
                    var ur_text = document.createElement("div");
                    ur_text.className = "my_text";

                    var text_usr = document.createElement("span");
                    text_usr.className = "my_usrnm";
                    text_usr.innerHTML = data[i][0];
                    ur_text.appendChild(text_usr);

                    var time = document.createElement("p");
                    time.className = "my_time";
                    time.innerHTML = data[i][2];
                    ur_text.appendChild(time);

                    var text_message = document.createElement("p");
                    text_message.className = "my_message";
                    text_message.innerHTML = data[i][1];
                    ur_text.appendChild(text_message);

                    document.getElementsByClassName("recent_messages")[0].appendChild(ur_text);
                }
                else {
                    var text = document.createElement("div");
                    text.className = "text";

                    var usr_text = document.createElement("span");
                    usr_text.className = "usrnm";
                    usr_text.innerHTML = data[i][0];
                    text.appendChild(usr_text);

                    var time = document.createElement("p");
                    time.className = "time";
                    time.innerHTML = data[i][2];
                    text.appendChild(time);

                    var message_text = document.createElement("p");
                    message_text.className = "message";
                    message_text.innerHTML = data[i][1];
                    text.appendChild(message_text);

                    document.getElementsByClassName("recent_messages")[0].appendChild(text);
                }
            }
        }
    );
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('send').onclick = () => {
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        socket.on('connect', () => {
            const message = document.querySelector('.message').value;
            const usr = localStorage.getItem('name');
            const date = new Date();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            const time = hour + ':' + minutes;
            const channel = localStorage.getItem('channel')

            socket.emit('submit message', {'message': message, 'user': usr, 'time': time, 'channel': channel});
        }
        );
        socket.on('announce message', data => {
            var usr = localStorage.getItem('name');
            var channel = localStorage.getItem('channel');
            if(data.channel === channel){
                if (data.user === usr) {
                    var ur_text = document.createElement("div");
                    ur_text.className = "my_text";

                    var text_usr = document.createElement("span");
                    text_usr.className = "my_usrnm";
                    text_usr.innerHTML = data.user;
                    ur_text.appendChild(text_usr);

                    var time = document.createElement("p");
                    time.className = "my_time";
                    time.innerHTML = data.time;
                    ur_text.appendChild(time);

                    var text_message = document.createElement("p");
                    text_message.className = "my_message";
                    text_message.innerHTML = data.message;
                    ur_text.appendChild(text_message);

                    document.getElementsByClassName("recent_messages")[0].appendChild(ur_text);
                }
                else {
                    var text = document.createElement("div");
                    text.className = "text";

                    var usr_text = document.createElement("span");
                    usr_text.className = "usrnm";
                    usr_text.innerHTML = data.user;
                    text.appendChild(usr_text);

                    var time = document.createElement("p");
                    time.className = "time";
                    time.innerHTML = data.time;
                    text.appendChild(time);

                    var message_text = document.createElement("p");
                    message_text.className = "message";
                    message_text.innerHTML = data.message;
                    text.appendChild(message_text);

                    document.getElementsByClassName("recent_messages")[0].appendChild(text);
                }
            }
        });
    }
});
