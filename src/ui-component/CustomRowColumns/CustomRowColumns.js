import React from 'react';
// Dom components
import RowColumnsDOM from './RowColumnsDOM';
// Common functions
import { isDomElement } from 'utils/commonFunc';

const CustomRowColumns = (props) => {
    const { isForm, listToLoop, md = 3, parentContentDOM } = props;

    const getShowContent = (loopItem) => {
        const showComponents = {}; // Any common components

        const isElementDom = isDomElement(loopItem?.element || loopItem);
        const isElementStringOrNum = ['number', 'string'].includes(typeof loopItem?.element);
        const isItemElementOrStringOrNum = isElementDom || isElementStringOrNum;
        return isItemElementOrStringOrNum
            ? loopItem?.element || loopItem
            : parentContentDOM || showComponents?.[passComponentName] || 'No content found';
    };

    return (
        <RowColumnsDOM
            isForm={isForm}
            listToLoop={listToLoop}
            md={md}
            getShowContent={getShowContent}
            {...props}
        />
    );
};

export default CustomRowColumns;
