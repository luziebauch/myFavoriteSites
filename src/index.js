/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import './app.scss';

let siteCounter = 0;
chayns.ready.then(() => {
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
        //background.addEventListener('click', `https://sub60.tobit.com/l/${siteId}`);
        name.innerHTML = appstoreName.substring(0, 11);
        background.style = `background-image: url(https://sub60.tobit.com/l/152342?size=70)`;
        image.style = `background-image: url(https://sub60.tobit.com/l/${locationId}?size=70)`;
        $list.appendChild(container);
        container.appendChild(background);
        background.appendChild(image);
        container.appendChild(name);
    }
    siteCounter += 24;
};
init();
