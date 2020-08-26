/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import './app.scss';

let siteCounter = 0;
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
        document.querySelector('#urlInput').addEventListener('input', () => textInput('#url'));
        document.querySelector('#firstnameInput').addEventListener('input', () => textInput('#firstname'), invalid('#firstnameInput', '#firstnameLabel'));
        document.querySelector('#lastnameInput').addEventListener('input', () => textInput('#lastname'), invalid('#lastnameLabel'));
        document.querySelector('#emailInput').addEventListener('input', () => textInput('#email'));
        document.querySelector('#streetNumberInput').addEventListener('input', () => textInput('#streetNumber'));
        document.querySelector('#plzInput').addEventListener('input', () => textInput('#plz'));
        document.querySelector('#townInput').addEventListener('input', () => textInput('#town'));
    } catch (err) {
        console.error('No chayns environment found', err);
    }
};
const getData = async () => {
    const data = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=${siteCounter}&Take=24`);
    const formatedData = await data.json();
    const arrayData = await formatedData.Data;
    for (let i = 0; i < arrayData.length; i++) {
        const locationId = arrayData[i].locationId;
        const appstoreName = arrayData[i].appstoreName;
        const siteId = arrayData[i].siteId;

        const $list = document.querySelector('#listSites');
        const container = document.createElement('div');
        container.classList.add('element');
        const background = document.createElement('div');
        const name = document.createElement('div');
        const image = document.createElement('div');

        image.classList.add('image');
        background.classList.add('image');
        name.innerHTML = appstoreName.substring(0, 11);
        background.style = 'background-image: url(https://sub60.tobit.com/l/152342?size=70)';
        image.style = `background-image: url(https://sub60.tobit.com/l/${locationId}?size=70)`;

        $list.appendChild(container);
        container.appendChild(background);
        background.appendChild(image);
        container.appendChild(name);
        background.addEventListener('click', () => { chayns.openUrlInBrowser(`https://chayns.net/${siteId}`); });
    }
    siteCounter += 24;
};
function textInput(id) {
    const element1 = document.querySelector(id);
    id += 'Input';
    const element2 = document.querySelector(id);
    console.log('hallo');
    if (element2.value) {
        element1.classList.add('labelRight');
        invalid();
    } else {
        element1.classList.remove('labelRight');
    }
}
function invalid(id, labelId) {
    const input = document.querySelector(id);
    const label = document.querySelector(labelId);
    console.log(input);
    if (input.value) {
    label.classList.remove('input--invalid');
    }
}
