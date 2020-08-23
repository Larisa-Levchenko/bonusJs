'use strict';
const registerUser = document.querySelector('.registerUser');
const container = document.querySelector('.container');

let userDate=[];

const getZero = function (n) {
    if(n<10){
        return `0${n}`;
    }else{
        return n;
    }
};

const getMonth = function(n, str){
    if(n!==3 && n!==8){        
      return str.substring(0,str.length-1)+'я';
    }else{
        
        return str+'a';
    }    
};

const getDate = function () {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let longMonth = date.toLocaleString('ru', {
        month: 'long'
    });
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let sec = date.getSeconds();    
   
    return `${getZero(day)} ${getMonth(month,longMonth)} ${year} г., ${getZero(hour)}:${getZero(minute)}:${getZero(sec)}`;

};
const checkUser = function (str) {
    let numSpace = 0;
    if (str === null || str === undefined) {
        return false;
    }
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            numSpace++;
        }
    }
    if (numSpace === 1 && str.length > 3 && str.indexOf(' ') !== str.length - 1) {
        return true;
    }
};
const render = function () {
    userDate.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = `Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}`;
            container.append(li);
        }
    );
};
registerUser.addEventListener('click', function(){
    let user,
        log,
        pass;
    while (!checkUser(user)) {
        user = prompt('Введите через пробел имя и фамилию пользователя');
    }
    log = prompt('Введите логин');
    pass = prompt('Введите пароль');


    const newDate = {
        firstName: user.substring(0, user.indexOf(' ')),
        lastName: user.substring(user.indexOf(' ') + 1, user.length),
        login: log,
        password: pass,
        regDate: getDate()
    };

    userDate.push(newDate);
    let json = JSON.stringify(userDate);
    localStorage.users = json;
    render();
});


if (localStorage.users !== undefined) {
    userDate = JSON.parse(localStorage.users);
    render();
}






