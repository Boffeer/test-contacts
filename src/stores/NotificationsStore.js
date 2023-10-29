import {ref} from "vue";
import {defineStore} from "pinia";

export const useNotificationsStore = defineStore('notificationsStore', () => {
    const notifications = ref([]);

    const sendNotification  = (message) => {
        const id = new Date().getTime();
        notifications.value.push({
            id,
            message
        })

        setTimeout(() => {
            destroyNotification(id)
        }, 3000);
    }

    const destroyNotification = (id) => {
        notifications.value = notifications.value.filter(snack => snack.id != id);
    }

    return {
        notifications,
        sendNotification,
    }
})