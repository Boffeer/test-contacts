import {computed, reactive} from 'vue';
import {useField} from "./field";

export function useForm(init = {}) {
    const form = reactive({
        elements: {},
    });

    for (const [key, value] of Object.entries(init)) {
        form.elements[key] = useField(value);
    }

    form.valid = computed(() => {
        return !Object.keys(form.elements).reduce((acc, key) => {
            const isValid = form.elements[key].valid
            acc.push(isValid)
            return acc;
        }, []).includes(false)
    })

    return form
}