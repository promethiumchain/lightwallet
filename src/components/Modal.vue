<template>
  <div>
    <transition name="fade">
     <div v-if="isOpen" class="mdl">
        <div class="mdlheader">
            <p>Send Promethium</p>
            <b-row class="my-1">
                <b-col sm="6">
                    <label for="addr">Address to send to :</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input id="addr" size="sm" placeholder="Enter Address" class="sendform"></b-form-input>
                </b-col>
                <b-col sm="6">
                    <label for="amount">Amount to send :</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input id="amount" size="sm" placeholder="Enter Amount" class="sendform"></b-form-input>
                </b-col>
            </b-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: "Modal",
    props: ["wallet"],
    data() {
        return {
            isOpen: false,
            amount: "",
            to: "",
        }
    },
    mounted() {
        this.$parent.$on('toggleModal', this.toggleModal)
    },
    methods: {
        toggleModal() {
            console.log('modal toggled')
            this.isOpen = !this.isOpen
        }
    }
}
</script>

<style>
.mdl {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30vh;
}

.sendform {
    width: 200px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>