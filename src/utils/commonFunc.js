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
