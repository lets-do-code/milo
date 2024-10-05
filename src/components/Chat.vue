<template>
<div class="flex flex-col bg-white h-[84.5vh]  rounded-md transition">
    <div class="flex justify-between items-center p-4">
        <h2 class="text-gray-600 text-lg font-normal">In-call messages</h2>
        <button @click="toggleChat" class="border rounded-full p-1 flex justify-between items-center bg-white hover:bg-gray-300 transition">
            <v-icon name="io-close-outline" class="w-6 h-6 text-gray-600 hover:text-white" />
        </button>
    </div>

    <div class="mt-2 chatScrollbar overflow-auto flex-1">
        <div v-for="(message, index) in messages" :key="index" class=" flex flex-col gap-1 w-full px-1">
            <p v-if="index === 0 || isTimeDifferent(message.time, messages[index - 1].time)" class="text-zinc-600 text-[14px] mt-2 px-3 font-medium">{{ message.user }} <span class="text-[12px]">{{ message.time }}</span></p>
            <p class="text-black text-[14px] break-words hover:bg-gray-300 px-3 rounded-md py-[2px]">{{ message.text }}</p>
        </div>
    </div>

    <form @submit.prevent="sendMessage" class="mt-4 flex p-4">
        <input v-model="newMessage" type="text" placeholder="Type your message..." class="flex-1 text-zinc-700 border outline-none rounded-l-md placeholder:text-zinc-400 pl-2" />
        <button type="submit" class="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 transition">
            Send
        </button>
    </form>

    <div>

    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {

    props: {
        toggleChat: true
    },
    data() {
        return {
            newMessage: '',
            messages: [],
        };
    },
    computed: {
        ...mapGetters(['messages'])
    },
    methods: {
        ...mapActions(['sendMessage']),
        sendMessage() {

            console.log("Sending message:", this.newMessage);
            if (this.newMessage.trim() !== '') {
                const now = new Date();
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                };
                const formattedTime = now.toLocaleTimeString([], options);

                console.log("Time", formattedTime)
                const message = {
                    user: 'You',
                    text: this.newMessage,
                    time: formattedTime, 
                };
                this.messages.push(message);
                this.newMessage = '';

            }
        },

        isTimeDifferent(currentTime, previousTime) {
            const currentParts = currentTime.split(':').map(Number);
            const previousParts = previousTime.split(':').map(Number);

            const currentTotalMinutes = currentParts[0] * 60 + currentParts[1];
            const previousTotalMinutes = previousParts[0] * 60 + previousParts[1];

            return (currentTotalMinutes - previousTotalMinutes) >= 1;
        },
    },
}
</script>
