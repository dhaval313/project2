function usrnm() {
    if (!localStorage.getItem('name')){
        var i = 0;
        while (i === 0){
            localStorage.setItem('name', prompt("Enter a name: ",""));
            if (localStorage.getItem('name')){
                i = 1;
            }
        }
    }
}