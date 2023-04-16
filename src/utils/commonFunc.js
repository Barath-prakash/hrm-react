import { isValidElement } from 'react';
import { format } from 'date-fns';

const makeFirstCaps = (str) => {
    if (str && typeof str === 'string') {
        return str?.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
    return '';
};

const capitalize = (str) => {
    if (str && typeof str === 'string') {
        return str?.replace(/^./, (strItem) => `${strItem.toUpperCase()}`);
    }
    return '';
};

const setLocalStorage = (key, value) => {
    if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const getLocalStorage = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
};

const dateFormat = (date, formatString = 'dd-MM-yyyy') => {
    return date ? format(new Date(date), formatString) : '';
};

const isDomElement = (item) => !!(item && isValidElement(item));

function createNumberListByGivenNumAndSize(num, size) {
    return Array.from({ length: num }, (_, i) => (i + 1) * size);
}

export {
    makeFirstCaps,
    capitalize,
    setLocalStorage,
    getLocalStorage,
    dateFormat,
    isDomElement,
    createNumberListByGivenNumAndSize
};
