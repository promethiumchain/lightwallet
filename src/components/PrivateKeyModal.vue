<template>
  <div class="private">
    <transition name="fade">
        <div v-if="isOpen" class="container">
            <div class="row">
                <div class="col-12">
                    Private Key : {{ this.wallet.prvk}}
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
</style>