import React from 'react';
// Render Components
import CustomCard from 'ui-component/CustomCard';

import RowColumnsDOM from './RowColumnsDOM';

const CustomRowColumns = (props) => {
    const { listToLoop, parentContentDOM, componentName = '', componentProps } = props;

    const getShowContent = (loopItem = {}, passComponentName) => {
        const showComponents = {
            CustomCard: <CustomCard customCardInfo={loopItem} contentDOM={parentContentDOM} {...componentProps} />,
            justDiv: parentContentDOM
        };

        return parentContentDOM || showComponents?.[componentName] || showComponents?.[passComponentName] || 'No content found';
    };

    return <RowColumnsDOM listToLoop={listToLoop} getShowContent={getShowContent} {...props} />;
};

export default CustomRowColumns;
