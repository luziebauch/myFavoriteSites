/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import login from './utils/login';
import './app.scss';

chayns.ready.then(() => {
    chayns.ui.accordion.init();
    showData();
    console.log('Chayns is ready, environment loaded', chayns.env);
}).catch(() => {
    console.warn('No chayns environment found');
}).then(() => {
    console.log('Will always be executed');
});

// const $moreSites = document.querySelector('.moreSites');
document.querySelector('#moreSites').addEventListener('click', getData);

const handleUserIsLoggedIn = ($introElement, $loginBtn) => {
    $introElement.innerText = `Hallo ${chayns.env.user.firstName}`;
    $loginBtn.innerText = 'Abmelden';
    $loginBtn.addEventListener('click', async () => {
        await chayns.logout();
        window.location.reload();
    });
};

const handleUserIsLoggedOut = ($introElement, $loginBtn) => {
    $introElement.innerText = 'Bitte melde dich an';
    $loginBtn.innerText = 'Anmelden';
    $loginBtn.addEventListener('click', () => {
        login(() => handleUserIsLoggedIn($introElement, $loginBtn));
    });
};

const init = async () => {
    try {
        await chayns.ready;

        const $introElement = document.querySelector('#intro');
        const $loginBtn = document.querySelector('#loginBtn');

        if (chayns.env.user.isAuthenticated) {
            handleUserIsLoggedIn($introElement, $loginBtn);
        } else {
            handleUserIsLoggedOut($introElement, $loginBtn);
        }
    } catch (err) {
        console.error('No chayns environment found', err);
    }
};
const getData = async () => {
    console.log('ok');
    const data = await fetch('https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=16');
    const formatedData = await data.json();
    const arrayData = await formatedData.Data;
    for (let i = 0; i < arrayData.length; i++) {
        const locationId = arrayData[i].locationId;
        console.log(locationId);
    }
};

/* const showData = async ($moreSites) => {
    console.log('running');
    $moreSites.addEventListener('click', getData);
}; */
init();
