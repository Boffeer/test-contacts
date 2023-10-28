// clickOutside.js
const clickOutside = {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function(event) {
            // Проверка, находится ли цель клика вне элемента или его потомка
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

export default clickOutside;