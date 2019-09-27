<template>
  <div>
     <transition name="fade">
       <div class="receivediv" v-if="isOpen">
          <div class="qrdiv" id="qrdiv">
            <canvas height="205" width="205" style="width: 180px;" id="myqr"></canvas>
          </div>
            <div class="myqr">
              <label class="amountlabel" for="am">Amount to request : </label>
              <b-form-input v-model="value" id="am" size="sm" placeholder="Enter Amount to request" class="reqform"></b-form-input>
               <b-button @click="getQRCode" variant="outline-success" class="request">Create QR Code Invoice</b-button>
            </div>
            <b-button @click="toggleModal" variant="outline-danger" class="closerequest">Close</b-button>
       </div>
     </transition>
  </div>
</template>

<script>
import EthereumQRPlugin from 'ethereum-qr-code'
export default {
  name: "ReceiveModal",
  props: ["wallet"],
  data() {
    return {
      isOpen: false,
      value: "",
    }
  },
  mounted() {
    this.$parent.$on('toggleReceive', this.toggleModal)
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen
    },
    getQRCode() {
      const qr = new EthereumQRPlugin()
      const details = {
        to: this.wallet.pblk,
        value: this.value,
        gas: 21000,
      }
      const config = {
        size: 180,
        selector: '#qrdiv',
        options: {
          margin: 2
        }
      }
      qr.toCanvas(details, config)
    }
  }
}
</script>

<style scoped>

.qrdiv {
  display: block;
  margin-bottom: 50px;
}

.request {
  position: absolute;
  left: 680px;
  top: 200px;
  width: 200px;
  height: 30px;
  font-size: 10px;
}

.closerequest {
  position: absolute;
  left: 900px;
  top: 200px;
  width: 200px;
  height: 30px;
  font-size: 10px;
}



.myqr {
  z-index: 9999;
  height: 100%;
  width: 100%;
}

.amountlabel {
  position: absolute;
  top: 200px;
  left: 250px;
  
  font-size: 14px;
}
 
.reqform {
    position: absolute;
    top: 200px;
    left: 400px;
    width: 250px;
    height: 30px;
    font-size: 10px;
    z-index: 9999;
}

.reqform::placeholder {
  background-color: transparent;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>