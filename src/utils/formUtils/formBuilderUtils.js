import { CONST_TYPE_TEXT, CONST_FIELD_INPUT } from '../constants';

const formOptions = {
    md: 12,
    isReq: false,
    validations: [],
    validationError: '',
    isField: true
};

// fieldType: INPUT, RADIO, DATE_PICKER, SELECT, MULTI_SELECT, CHECKBOX
const formObjBuild = (formProps) => {
    const {
        fieldLabel = '',
        fieldName = '',
        fieldValue = '',
        fieldType = CONST_FIELD_INPUT,
        type = CONST_TYPE_TEXT,
        options = {}
    } = formProps;
    if (options?.isNotField) {
        return { fieldName, fieldValue };
    }
    return {
        fieldLabel,
        fieldType,
        fieldName,
        fieldValue,
        options: { ...formOptions, ...options },
        type
    };
};

export { formObjBuild };
