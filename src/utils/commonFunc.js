export const makeFirstCaps = (str) => {
    if (str && typeof str === 'string') {
        return str?.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
    return '';
};

export const capitalize = (str) => {
    if (str && typeof str === 'string') {
        return str?.replace(/^./, (strItem) => `${strItem.toUpperCase()}`);
    }
    return '';
};

export const setLocalStorage = (key, value) => {
    if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
};
