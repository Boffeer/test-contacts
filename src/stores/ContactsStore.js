import {ref} from "vue";
import {defineStore} from "pinia";

export const useContactsStore = defineStore('contactsStore', () => {
    const contacts = ref([
        {
            id: 0,
            name: 'Айтишник Данила',
            phone: '+7(987)654-78-09',
            email: 'nelfeelingood@gmail.com',
            created: 1697922000000,
            category: "kinsfolk"
        },
        {
            id: 1,
            name: 'Арендодатель Виктория',
            phone: '+7(987)654-78-10',
            email: 'nelfeelingood@gmail.com',
            created: 1697922000000,
            category: 'colleague',
        },
        {
            id: 2,
            name: 'Двери Вадим',
            phone: '+7(987)654-78-11',
            email: 'nelfeelingood@gmail.com',
            created: 1698008400000,
            category: 'kinsfolk',
        },
        {
            id: 3,
            name: 'Доставка Андрей Стоянов',
            phone: '+7(987)654-78-12',
            email: 'nelfeelingood@gmail.com',
            created: 1698008400000,
            category: 'colleague',
        },
        {
            id: 4,
            name: 'Контакт с очень длинным именем просто чтобы потестить интерфейс на разваливаемость',
            phone: '+7(987)654-78-09',
            email: 'nelfeelingood@gmail.com',
            created: 1697922000000,
            category: 'kinsfolk',
        },
    ]);

    const activeCategory = ref('all');
    const categoriesList = ref([
        {
            value: 'kinsfolk',
            text: 'Родственники'
        },
        {
            value: 'colleague',
            text: 'Коллеги'
        }
    ]);
    const currentContact = ref({});


    const contactsByCategory = () => {
        if (activeCategory.value === 'all') {
            return contacts.value;
        }
        return contacts.value.filter(contact => contact.category === activeCategory.value);
    }

    const setActiveCategory = (category) => {
        activeCategory.value = category;
    }

    const createContact = (contactData) => {
        const date = new Date().getTime()
        contactData.id = date;
        contactData.created = date;
        contacts.value.push(contactData);
        closeContactForm();
    }

    const isFormVisible = ref(false);
    const formType = ref(null);
    const callNewContactForm = () => {
        formType.value = 'create';
        isFormVisible.value = true;
    }
    const callEditContactForm = () => {
        formType.value = 'edit';
        isFormVisible.value = true;
    }
    const closeContactForm = () => {
        isFormVisible.value = false;
    }

    return {
        contacts,
        categoriesList,
        activeCategory,
        contactsByCategory,
        setActiveCategory,
        createContact,
        currentContact,

        isFormVisible,
        callNewContactForm,
        closeContactForm,
    }
})