import React from 'react';
// Render Components
import CustomCard from 'ui-component/CustomCard';
// Dom components
import RowColumnsDOM from './RowColumnsDOM';
// Common functions
import { isDomElement } from 'utils/commonFunc';

const CustomRowColumns = (props) => {
    const {
        listToLoop,
        md = 3,
        parentContentDOM,
        componentName = '',
        componentProps,
        //actions
        get,
        getIdName
    } = props;

    const getShowContent = ({ loopItem, passComponentName }) => {
        const showComponents = {
            CustomCard: (
                <CustomCard
                    customCardInfo={loopItem}
                    contentDOM={parentContentDOM}
                    get={get}
                    getIdName={getIdName}
                    {...componentProps}
                />
            )
        };

        const isElementDom = isDomElement(loopItem?.element);
        const isElementStringOrNum = ['number', 'string'].includes(typeof loopItem?.element);
        const canShowItem = isElementDom || isElementStringOrNum;
        return canShowItem
            ? loopItem?.element
            : parentContentDOM ||
                  showComponents?.[componentName] ||
                  showComponents?.[passComponentName] ||
                  'No content found';
    };

    return (
        <RowColumnsDOM listToLoop={listToLoop} md={md} getShowContent={getShowContent} {...props} />
    );
};

export default CustomRowColumns;
