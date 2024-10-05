<template>
    <div class="h-100 h-screen flex items-center max-w-[1280px] mx-auto">
        <div class="flex flex-col gap-2">
            <h1 class="text-xl text-zinc-400">Google Meet</h1>
            <div>
                <input v-model="roomId" placeholder="Enter Meet ID" class="py-2 rounded-l-md px-5 outline-none text-black placeholder:text-zinc-700" />
                <button @click="joinRoom" class="py-2 px-5 bg-blue-600 text-white rounded-r-md">Join Meet</button>

            </div>
            <p  v-if="errormessage" class="text-red-600">{{ errormessage }}</p>
            <button @click="createRoom" class="py-2 px-5 bg-blue-600 rounded-md text-white">Create New Room</button>
        </div>
      
    </div>

</template>

<script>

    export default {
        data(){
            return {
                roomId:'',
                errormessage:''
            }
        },

        methods:{
            joinRoom(){
                if(this.roomId){
                    this.$router.push(`/${this.roomId}`);
                }
                else{
                    this.errormessage="Please enter the meeting id"
                };
            },

            createRoom(){
                const newRoomId=Math.random().toString(36).substring(2,9);
                this.$router.push(`/${newRoomId}`);
            }
        }
    }

</script>
