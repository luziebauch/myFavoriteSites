/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import login from './utils/login';
import './app.scss';

chayns.ready.then(() => {
    chayns.ui.accordion.init();
    console.log('Chayns is ready, environment loaded', chayns.env);
}).catch(() => {
    console.warn('No chayns environment found');
}).then(() => {
    console.log('Will always be executed');
});

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

init();
