<template>
  <div class="remove">
    <transition name="fade">
        <div v-if="isOpen" class="container">
            <div class="row">
                <div class="col-12">
                    Are you sure you want to remove this address ?
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <b-button @click="$emit('del-address', wallet.plbk)" variant="outline-danger" class="del btn-g">Remove</b-button>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: "RemoveModal",
    props: ["wallet"],
    data() {
        return {
            isOpen: false,
        }
    },
    mounted() {
        this.$parent.$on('toggleRemove', this.toggleModal)
    },
    methods: {
        toggleModal() {
            this.isOpen = !this.isOpen
        }
    }
}
</script>

<style scoped>

.btn-g {
    height: 30px;
    width: 300px;
    font-size: 10px;
    margin-bottom: 10px;    
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>