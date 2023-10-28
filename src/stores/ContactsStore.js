import {ref} from "vue";
import {defineStore} from "pinia";
import {getFormattedDate} from "../helpers/transformers";
import {useNotificationsStore} from "./NotificationsStore";

export const useContactsStore = defineStore('contactsStore', () => {
    const contacts = ref([
        {
            id: 1697922300000,
            name: 'Айтишник Данила',
            tel: '+7(987)654-78-09',
            email: 'nelfeelingood@gmail.com',
            created: '22.10.23',
            category: "kinsfolk"
        },
        {
            id: 1704056400000,
            name: 'Доставка Андрей Стоянов',
            tel: '+7(987)654-78-12',
            email: 'nelfeelingood@gmail.com',
            created: '01.01.24',
            category: 'colleague',
        },
        {
            id: 1697922400000,
            name: 'Арендодатель Виктория',
            tel: '+7(987)654-78-10',
            email: 'nelfeelingood@gmail.com',
            created: '22.10.23',
            category: 'colleague',
        },
        {
            id: 1698008400000,
            name: 'Двери Вадим',
            tel: '+7(987)654-78-11',
            email: 'nelfeelingood@gmail.com',
            created: '23.10.23',
            category: 'kinsfolk',
        },
    ]);

    const notificationsStore = useNotificationsStore();

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
    const currentContactId = ref(null);

    const filterContactsByCategory = () => {
        if (activeCategory.value === 'all') {
            return contacts.value.sort((a, b) => a.id - b.id);
        }

        return contacts.value
            .filter(contact => contact.category === activeCategory.value)
            .sort((a, b) => a.id - b.id);
    }

    const setActiveCategory = (category) => {
        activeCategory.value = category;
    }

    const isFormVisible = ref(false);
    const formType = ref(null);
    const callNewContactForm = () => {
        formType.value = 'create';
        isFormVisible.value = true;
    }
    const callEditContactForm = (contact) => {
        formType.value = 'edit';
        isFormVisible.value = true;
        currentContactId.value = contact.id;
    }
    const closeContactForm = () => {
        isFormVisible.value = false;
        currentContactId.value = null;
    }

    const getCurrentContact = () =>{
        if (currentContactId.value === null) return null;
        return contacts.value.find(contact => contact.id === currentContactId.value)
    }
    const createContact = (contactData) => {
        const date = new Date().getTime()
        contactData.id = date;
        contactData.created = getFormattedDate(date);
        contacts.value.push(contactData);
        closeContactForm();
        currentContactId.value = null;
        notificationsStore.sendNotification('Контакт успешно создан', date);
    }
    const updateContact = (currentContact) => {
        const index = contacts.value.findIndex(contact => contact.id == currentContact.id);
        if (index < 0) {
            console.warn(`Пользователя с id ${currentContact.id} нет`)
            console.log(`Вот сам контакт ${currentContact}`)
            return;
        }
        contacts.value[index] = currentContact;
        closeContactForm();
        notificationsStore.sendNotification('Контакт успешно изменён', currentContact.id);
    }
    const deleteCurrentContact = () => {
        const id = currentContactId.value;
        contacts.value = contacts.value.filter(contact => contact.id != currentContactId.value);
        closeContactForm();
        notificationsStore.sendNotification('Контакт удалён', id);
    }

    return {
        contacts,
        categoriesList,
        activeCategory,
        filterContactsByCategory,
        setActiveCategory,
        createContact,
        currentContactId,

        formType,
        isFormVisible,
        callNewContactForm,
        callEditContactForm,
        closeContactForm,
        deleteCurrentContact,
        getCurrentContact,
        updateContact,
    }
})