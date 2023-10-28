import {ref} from "vue";
import {defineStore} from "pinia";

export const useNotificationsStore = defineStore('notificationsStore', () => {
    const notifications = ref([]);

    const sendNotification  = (message, id) => {
        notifications.value.push({
            id,
            message
        })

        setTimeout(() => {
            destroyNotification(id)
        }, 30000);
    }

    const destroyNotification = (id) => {
        notifications.value = notifications.value.filter(snack => snack.id != id);
    }

    return {
        notifications,
        sendNotification,
    }
})