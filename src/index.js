/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import './app.scss';

let siteCounter = 0;
let searchString = 'Ahaus';
chayns.ready.then(() => {
    init();
    chayns.ui.accordion.init();
    console.log('Chayns is ready, environment loaded', chayns.env);
}).catch(() => {
    console.warn('No chayns environment found');
}).then(() => {
    console.log('Will always be executed');
});

const init = async () => {
    try {
        await chayns.ready;
        document.querySelector('#moreSites').addEventListener('click', getData);
        document.querySelector('#searchIcon').addEventListener('click', searching);
        document.querySelector('#sendingButton').addEventListener('click', checkForLogin);
        document.querySelector('#urlInput').addEventListener('input', () => textInput('#url', '#urlLabel'));
        document.querySelector('#firstnameInput').addEventListener('input', () => textInput('#firstname', '#firstnameLabel'));
        document.querySelector('#lastnameInput').addEventListener('input', () => textInput('#lastname', '#lastnameLabel'));
        document.querySelector('#emailInput').addEventListener('input', () => textInput('#email', '#emailLabel'));
        document.querySelector('#streetNumberInput').addEventListener('input', () => textInput('#streetNumber'));
        document.querySelector('#plzInput').addEventListener('input', () => textInput('#plz'));
        document.querySelector('#townInput').addEventListener('input', () => textInput('#town'));
    } catch (err) {
        console.error('No chayns environment found', err);
    }
};
const getData = async (show = true) => {
    chayns.showWaitCursor();
    const data = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=${siteCounter}&Take=25`);
    const formatedData = await data.json();
    const arrayData = await formatedData.Data;
    if (show) {
        dataShow(arrayData);
    } else {
        return arrayData;
    }
};
const dataShow = (arrayData) => {
    for (let i = 0; i < arrayData.length; i++) {
        const locationId = arrayData[i].locationId;
        let appstoreName = arrayData[i].appstoreName;
        const siteId = arrayData[i].siteId;

        const newElement = document.querySelector('#newElements');
        const container = document.createElement('div');
        container.classList.add('element');
        const background = document.createElement('div');
        const name = document.createElement('div');
        const image = document.createElement('div');

        image.classList.add('image');
        background.classList.add('image');
        if (appstoreName.length >= 13) {
            appstoreName = appstoreName.substring(0, 10);
            appstoreName += '...';
        }
        name.innerHTML = appstoreName;
        background.style = 'background-image: url(https://sub60.tobit.com/l/152342?size=70)';
        image.style = `background-image: url(https://sub60.tobit.com/l/${locationId}?size=70)`;

        newElement.appendChild(container);
        container.appendChild(background);
        background.appendChild(image);
        container.appendChild(name);
        background.addEventListener('click', () => { chayns.openUrlInBrowser(`https://chayns.net/${siteId}`); });
    }
    siteCounter += 25;
    chayns.hideWaitCursor();
};
function textInput(id, labelId) {
    const element1 = document.querySelector(id);
    id += 'Input';
    const element2 = document.querySelector(id);
    const label = document.querySelector(labelId);
    if (element2.value) {
        element1.classList.add('labelRight');
        label.classList.remove('input--invalid');
    } else {
        element1.classList.remove('labelRight');
        label.classList.add('input--invalid');
    }
}
function checkForLogin() {
    if (chayns.env.user.isAuthenticated) {
        sending();
    } else {
        chayns.addAccessTokenChangeListener(() => {
            sending();
        });
        chayns.login();
    }
}
/* function checkButton() {
    if (document.querySelector('#urlInput').value && document.querySelector('#firstnameInput').value && document.querySelector('#lastnameInput').value && document.querySelector('#emailInput').value) {
        document.getElementById('#sendingButton').enabled = true;
    } else {
        document.getElementById('#sendingButton').disabled = true;
    }
} */
function sending() {
    const urlInput = document.querySelector('#urlInput').value;
    const firstnameInput = document.querySelector('#firstnameInput').value;
    const lastnameInput = document.querySelector('#lastnameInput').value;
    const emailInput = document.querySelector('#emailInput').value;
    const streetNumberInput = document.querySelector('#streetNumberInput').value;
    const plzInput = document.querySelector('#plzInput').value;
    const townInput = document.querySelector('#townInput').value;
    const comment = document.querySelector('#commentText').value;
    chayns.intercom.sendMessageToPage({
        text: `Empfohlende Website: ${urlInput}
        Name: ${firstnameInput} ${lastnameInput}
        Email: ${emailInput}
        Adresse: ${streetNumberInput}, ${plzInput} ${townInput}
        Anmerkung: ${comment}`
    }).then((data) => {
        if (data.status === 200) {
            chayns.dialog.alert(`${chayns.env.user.firstName}, danke für deine Empfehlung!`);
        }
    });
}
const searching = async () => {
    console.log('klappt');
    searchString = document.querySelector('#search').value;
    console.log(searchString);
    const dataReturn = await getData(false);
    const listSites = document.getElementById('listSites');
    const newElements = document.getElementById('newElements');
    listSites.removeChild(newElements);
    const createElement = document.createElement('div');
    createElement.setAttribute('id', 'newElements');
    listSites.appendChild(createElement);
    dataShow(dataReturn);
    console.log(dataReturn);
};
