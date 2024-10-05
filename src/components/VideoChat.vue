<template>
    <div class="rounded-md border h-full w-full">
        <video ref="localVideo" autoplay playsinline class="local-video" muted
            @loadedmetadata="onLocalVideoLoaded"></video>

        <div v-for="(remoteStream, index) in remoteStreams" :key="index">
            <video :ref="'remoteVideo' + index" autoplay playsinline :srcObject="remoteStream"></video>
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
