<template>
  <div>
    <transition name="fade">
     <div v-if="isOpen" class="mdlc container">
         <div class="row">
             <div class="col-6">
                 <label class="label" for="addr">Address to send to :</label>
                 <b-form-input id="addr" size="sm" placeholder="Enter Address" class="sendform"></b-form-input>
             </div>
             <div class="col-6">
                <label for="range-1">Select Gas Value in Gwei</label>
                <b-form-input id="range-1" v-model="gasValue" type="range" min="1" max="30"></b-form-input>
                <div class="mt-2">Gwei: {{ gasValue }}</div>
                <b-button @click="toggleModal" variant="outline-danger" class="btn-x">Cancel Send</b-button>
                <b-button @click="sendcoins" variant="outline-success" class="btn-x">Confirm Send</b-button>
             </div>
         </div>
         <div class="row">
             <div class="col-6 amount">
                 <label class="label" for="amount">Amount to send :</label>
                 <b-form-input id="amount" size="sm" placeholder="Enter Amount" class="sendform"></b-form-input>
             </div>
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
            gasValue: "",
        }
    },
    mounted() {
        this.$parent.$on('toggleModal', this.toggleModal)
    },
    methods: {
        toggleModal() {
            this.isOpen = !this.isOpen
        },
        sendcoins() {
            console.log('send')
        }
    }
}
</script>

<style>

.amount {
    top: -50px;
}

.label {
    float:left;
}

.btn-x {
    margin-left: 20px;
    margin-top: 20px;
    height: 40px;
    width: 150px;
    font-size: 10px;
}

.mdl {
    height: 40vh;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>