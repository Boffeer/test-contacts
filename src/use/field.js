import {ref, reactive, watch} from 'vue';

const getDefaultErrorMessage = (error) => {
    const ERRORS = {
       'required': 'Поле не может быть пустым',
        'minLength': 'Поле слишком короткое',
    }

    return ERRORS[error];
}

const getFieldByType = (type) => {
    const COMPONENTS = {
        'select': 'BaseSelect'
    }
    let component = COMPONENTS[type.value] ?? 'BaseInput';

    return component;
}

export function useField(field) {
    const valid = ref(true);
    const value = ref(field.value);
    const label = ref(field.label);
    const name = ref(field.name);
    const type = ref(field.type);
    const placeholder = ref(field.placeholder);
    const errorMessages = field.errorMessages ?? {};
    const touched = ref(false);
    const showCondition = ref(field.showCondition);

    const options = ref(field.options);

    const errors = reactive({});

    const reassign = val => {
        valid.value = true;
        Object.keys(field.validators ?? {}).map(name => {
            const isValid = field.validators[name](val);
            let error = false;

            if (!isValid) {
                error = errorMessages[name] ?? getDefaultErrorMessage(name);
                valid.value = false;
            }

            errors[name] = error;
        })
    }

    const blur = () => {
        touched.value = true;
    }

    watch(value, reassign);
    reassign(field.value);

    const component = getFieldByType(type);

    return {
        value,
        valid,
        label,
        name,
        type,
        placeholder,
        errors,
        errorMessages,
        touched,
        blur,
        component,
        options,
        showCondition
    }
}