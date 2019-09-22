<template>
  <div class="private">
    <transition name="fade">
        <div v-if="isOpen" class="container">
            <div class="row">
                <div class="col-12">
                        Private Key : {{ this.wallet.prvk}}
                    <b-button @click="copyText" variant="outline-success" class="btn">Copy to clipboard</b-button>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: "PrivateKeyModal",
    props: ["wallet"],
    data() {
        return {
            isOpen: false,
        }
    },
    mounted() {
        this.$parent.$on('togglePrivate', this.toggleModal)
    },
    methods: {
        toggleModal() {
            this.isOpen = !this.isOpen
        },
        copyText() {
            var dummy = document.createElement('textarea')
            document.body.appendChild(dummy)
            dummy.value = this.wallet.prvk
            dummy.select()
            document.execCommand('copy')
            document.body.removeChild(dummy)
            alert('private key copied to clipboard') // TODO make a modal
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.btn {
   position: relative;
    margin-left: 30px;
    height: 30px;
    width: 120px;
    font-size: 10px;
    margin-top: 10px;
    margin-bottom: 10px; 
}

</style>