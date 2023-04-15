const CONST_INPUT_VARIANT = 'standard'; // standard, outlined, filled
const CONST_INPUT_SIZE = 'medium'; // small, medium
const CONST_INPUT_LABEL_SHRINK = true;
const CONST_FIELD_REQUIRED = 'This field is required';

const formPostData = (payload) => {
    const stateObjList = Object.values(payload);
    const stateObj = {};
    for (const item of stateObjList) {
        stateObj[item.fieldName] =
            item?.hasOwnProperty('fieldValue') && item?.fieldValue !== undefined
                ? item?.fieldValue
                : '';
    }
    return stateObj;
};

export {
    CONST_INPUT_VARIANT,
    CONST_INPUT_SIZE,
    CONST_INPUT_LABEL_SHRINK,
    CONST_FIELD_REQUIRED,
    formPostData
};
