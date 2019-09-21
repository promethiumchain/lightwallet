<template>
  <div class="address">
      <div class="row">
          <div class="col-12">
              <img src="../assets/crystal.png" class="crystal"> 
              {{ wallet.pblk}}
              <b-button @click="toggleModal" variant="outline-success" class="btn-g">Send</b-button>
              <b-button @click="receive" variant="outline-primary" class="btn-g">Receive</b-button>
              <b-button @click="$emit('del-address', wallet.plbk)" variant="outline-danger" class="del btn-g">Remove</b-button>
              <label class="balance">Balance : {{ balance }} </label>
            <b-button @click="showprivatekey" variant="outline-primary" class="btn privatekeybtn"> Get Private Key </b-button>
          </div>
      </div>
      
            
     

    <!-- <div ref="addr" class="addr">
        <img src="../assets/crystal.png" class="crystal">
        {{ wallet.pblk }}
    </div>
    <b-button @click="toggleModal" variant="outline-success" class="btn-g">Send</b-button>
    <Modal v-bind:wallet="wallet"/>
    <b-button @click="receive" variant="outline-primary" class="btn-g">Receive</b-button>
    <b-button @click="$emit('del-address', wallet.plbk)" variant="outline-danger" class="del btn-g">Remove</b-button>
        <div class="balance">Balance : {{ balance }} </div>
    <b-button @click="showprivatekey" variant="outline-primary" class="btn privatekeybtn"> Get Private Key </b-button> -->
  </div>
</template>

<script>
import Web3 from 'web3'
import network from '../../config.json'
import Modal from './Modal.vue'

export default {
    name: "Address",
    props: ["wallet"],
    components: {
      Modal,
    },
    data() {
        return {
            balance: ""
        }
    },
    created() {
        var w3 = new Web3(network.address)
        w3.eth.getBalance(this.wallet.pblk)
        .then(res => this.balance = res)
        .catch(err => console.log(err))
    },
    methods: {
        toggleModal() {
            this.$emit('toggleModal')
        },
        receive() {

        },
        showprivatekey() {
            alert("This is the private key for the account.Make sure you keep this info safe!    " +
             " address : " + this.wallet.pblk + " private key : " + this.wallet.prvk)
        }
    }
}
</script>

<style scoped>
 

.crystal {
    height: auto;
    width: 30px;
    left: 5px;
}

.address {
    display: block;
    background: rgb(75, 75, 75);
    color: rgb(0, 218, 247);
    padding: 2px;
    border-top: 1px rgb(0, 218, 247) solid;
    border-bottom: 1px rgb(0, 218, 247) solid;
}

.addr {
    float: left;
}

.btn-g, .privatekeybtn {
    position: relative;
    margin-left: 30px;
    height: 30px;
    width: 120px;
    font-size: 10px;
    margin-top: 10px;
    margin-bottom: 10px;  
}

.balance {
    font-size: 10px;
    margin-left: 30px;
}



</style>