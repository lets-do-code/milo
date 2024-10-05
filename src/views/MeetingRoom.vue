<template>
    <div class="h-[100vh] w-full ">
        <div class="grid px-5 pt-5 gap-5 h-[87vh]"
            :class="chatVisible ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-center'">
            <div :class="chatVisible ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-3 lg:col-span-4'">
                <VideoChat :remoteStreams="remoteStreams" />
            </div>
            <div v-if="chatVisible" class="hidden md:block">
                <Chat :toggleChat="toggleChat" />
            </div>
        </div>
        <div class="h-[12vh] p-5">
            <div class="flex justify-center items-center">
                <Controls :cameraEnabled="cameraEnabled" :micEnabled="micEnabled" @toggle-camera="toggleCamera"
                    @toggle-mic="toggleMic" :toggleChat="toggleChat" :roomId="roomId" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import Chat from '@/components/Chat.vue';
import Controls from '@/components/Controls.vue';
import VideoChat from '@/components/VideoChat.vue';

export default defineComponent({
    components: {
        Chat,
        Controls,
        VideoChat
    },
    data() {
        return {
            peer: {},
            localStream: null,
            remoteStreams: [],
            roomId: this.$route.params.roomId,
            socket: null,
            cameraEnabled: false,
            micEnabled: false,
            chatVisible: false,
        };
    },
    methods: {
        toggleChat() {
            this.chatVisible = !this.chatVisible;
        },

        toggleMic() {
            this.micEnabled = !this.micEnabled;
            this.localStream.getAudioTracks()[0].enabled = !this.localStream.getAudioTracks()[0].enabled;
        },
        toggleCamera() {
            this.cameraEnabled = !this.cameraEnabled;
            if (this.localStream) {
                const videoTracks = this.localStream.getVideoTracks();
                if (videoTracks.length > 0) {
                    videoTracks[0].enabled = !videoTracks[0].enabled;
                    console.log(`Video track enabled: ${videoTracks[0].enabled}`);
                } else {
                    console.warn("No video tracks found in local stream.");
                }
            } else {
                console.warn("Local stream not initialized.");
            }
        },

        setupSocket() {
            this.socket = new WebSocket(`ws://localhost:8000/ws/meet/${this.roomId}/`);
            this.socket.onmessage = (message) => {
                const data = JSON.parse(message.data);
                if (data.type === 'offer') {
                    this.handleOffer(data);
                } else if (data.type === 'answer') {
                    this.handleAnswer(data);
                } else if (data.type === 'candidate') {
                    this.handleCandidate(data);
                } else if (data.type === 'chat') {
                    this.handleChat(data);
                }
            };
        },
        async startStream() {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            this.$refs.localVideo.srcObject = this.localStream;
            this.socket.send(JSON.stringify({
                type: 'join',
                roomId: this.roomId
            }));

            this.localStream.getTracks().forEach((track) => {
                const peer = new SimplePeer({
                    initiator: true,
                    stream: this.localStream
                });
                this.peers[peer.id] = peer;

                peer.on('signal', (data) => {
                    this.socket.send(JSON.stringify({
                        type: 'offer',
                        data,
                        id: peer.id
                    }));
                });

                peer.on('stream', (remoteStream) => {
                    this.remoteStreams.push(remoteStream);
                });
            });
        },
        handleOffer(data) {
            const peer = new SimplePeer({
                stream: this.localStream
            });
            this.peers[data.id] = peer;

            peer.on('signal', (signalData) => {
                this.socket.send(JSON.stringify({
                    type: 'answer',
                    data: signalData,
                    id: data.id
                }));
            });

            peer.on('stream', (remoteStream) => {
                this.remoteStreams.push(remoteStream);
                this.$refs['remoteVideo' + data.id].srcObject = remoteStream;
            });

            peer.signal(data.data);
        },
        handleAnswer(data) {
            this.peers[data.id].signal(data.data);
        },
        handleCandidate(data) {
            this.peers[data.id].signal(data.data);
        },
        handleChat(data) {
            // Handle chat message received
            console.log(data.message);
        },
    },

    async mounted() {
        this.setupSocket();
        await this.startStream();
    }
});
</script>
