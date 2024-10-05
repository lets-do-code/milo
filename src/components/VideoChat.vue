<template>
    <div class="rounded-md h-full gap-3 w-full flex flex-wrap flex-grow">
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div class=" h-[205px] w-[270px] rounded-md overflow-hidden border-4 border-gray-600 ">
            <video ref="localVideo" autoplay playsinline class="local-video h-full w-full" muted
                @loadedmetadata="onLocalVideoLoaded">
            </video>
        </div>
        <div v-for="(remoteStream, index) in remoteStreams" :key="index">
            <video :ref="'remoteVideo' + index" autoplay playsinline :srcObject="remoteStream"
                class="local-video border h-full w-full"></video>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        remoteStreams: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            localStream: null,
        };
    },
    mounted() {
        this.startCamera();
    },
    methods: {
        async startCamera() {
            try {
                this.localStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                this.$refs.localVideo.srcObject = this.localStream;

                this.updateRemoteStreams();
            } catch (error) {
                console.error('Error accessing camera and microphone:', error);
            }
        },

        onLocalVideoLoaded() {
            console.log("Local video loaded");
        },
        updateRemoteStreams() {
            this.remoteStreams.forEach((remoteStream, index) => {
                // Update each remote video element's source object
                const remoteVideo = this.$refs['remoteVideo' + index];
                if (remoteVideo) {
                    remoteVideo.srcObject = remoteStream; // Assign the remote stream to the video element
                }
            });
        },
    },
};
</script>
