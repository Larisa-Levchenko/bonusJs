'use strict';

const registerUser = document.querySelector('.registerUser');
const authorization = document.querySelector('.authorization');
const container = document.querySelector('.container');
const nameUser = document.querySelector('.name');


let userDate = [];

const getZero = function (n) {
    if (n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
};

const getMonth = function (n, str) {
    if (n !== 3 && n !== 8) {
        return str.substring(0, str.length - 1) + 'я';
    } else {

        return str + 'a';
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
    container.textContent = '';
    let json = JSON.stringify(userDate);
    localStorage.users = json;
    userDate.forEach(function (item) {
        const li = document.createElement('li');
        li.innerHTML = '<div class="block">' +
            '<span>' + `Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}` +
            '</span>' + '<button class="removeBtn"></button>' +
            '</div>';
        container.append(li);
        const removeBtn = li.querySelector('.removeBtn');

        removeBtn.addEventListener('click', function () {
            userDate.splice(userDate.indexOf(item), 1);
            render();
        });

    });
};

registerUser.addEventListener('click', function () {
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
    render();
});

authorization.addEventListener('click', function () {
    let log = prompt('Введите логин');
    let pass = prompt('Введите пароль');
    let tmp = false;
    userDate.forEach(function (item) {
        if (item.login === log) {
            if (item.password === pass) {
                nameUser.textContent = item.firstName;
                tmp = true;
            }
        }

    });
    if (tmp === false) {
        alert('Пользователь не найден');
    }

});

if (localStorage.users !== undefined) {
    userDate = JSON.parse(localStorage.users);
    render();
}