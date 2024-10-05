<template>
    <div class="grid grid-cols-1 sm:grid-cols-3 w-full">
        <div class="flex hidden sm:block items-center px-5">
            <div class="flex items-center w-full h-full">
                <v-icon name="px-copy" class="w-6 h-6 text-white hover:text-gray-300" />
                {{ " " }}
                <span class="text-white font-medium hover:text-gray-300">http://localhost:5173/{{ roomId }}</span>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <div class="flex justify-center space-x-6 py-2 rounded-md shadow-md px-5">
                <button @click="toggleMic"
                    class="flex items-center p-2 bg-white text-white rounded-full hover:bg-red-500 transition">
                    <v-icon v-if="micEnabled" name="fa-microphone"
                        class="w-6 h-6 text-red-600 hover:text-white transition" />
                    <v-icon v-else name="bi-mic-mute" class="w-6 h-6 text-red-600 hover:text-white transition" />
                </button>
                <button @click="toggleCamera"
                    class="flex items-center p-2 bg-white text-white rounded-full hover:bg-green-500 transition">
                    <v-icon v-if="cameraEnabled" name="fa-video"
                        class="w-6 h-6 text-green-600 hover:text-white transition" />
                    <v-icon v-else name="fa-video-slash" class="w-6 h-6 text-green-600 hover:text-white" />
                </button>
                <button @click="leaveMeeting"
                    class="flex items-center p-2 bg-white text-white rounded-full hover:bg-blue-500 transition">
                    <v-icon name="md-screenshare-outlined" class="w-6 h-6 text-blue-600 hover:text-white" />
                </button>
                <button @click="leaveMeeting"
                    class="flex items-center p-2 bg-white text-white rounded-full hover:bg-gray-500 transition">
                    <v-icon name="fa-sign-out-alt" class="w-6 h-6 text-gray-600 hover:text-white" />
                </button>
            </div>
        </div>
        <div class="px-5 hidden sm:block">
            <div class="flex justify-end items-center w-full h-full">
                <button @click="toggleChat"
                    class="flex items-center p-2 bg-white text-white rounded-full hover:bg-gray-500 transition">
                    <v-icon name="bi-chat-left-dots" class="w-6 h-6 text-gray-600 hover:text-white" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: ['cameraEnabled', 'micEnabled', 'roomId', 'toggleChat'],
    // props: {
    //     // toggleChat: Function,
    //     // toggleCamera: Function,
    //     // toggleMic: Function,
    //     // roomId: {
    //     //     type: String,
    //     //     required: true
    //     // }
    // },
    // data() {
    //     return {
    //         isMuted: false,
    //         videoEnabled: true,
    //     };
    // },
    methods: {
        toggleCamera() {
            this.$emit('toggle-camera');
        },
        toggleMic() {
            this.$emit('toggle-mic');
        },

        leaveMeeting() {
            this.$router.push('/');
        },
    },
};
</script>
