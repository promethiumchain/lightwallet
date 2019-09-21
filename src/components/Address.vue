<template>
  <div class="address">
    
  <p ref="addr" class="addr">
      <img src="../assets/crystal.png" class="crystal">
      {{ wallet.pblk }}
  <b-button @click="send" variant="outline-success" class="btn-g">Send</b-button>
  
  <b-button @click="receive" variant="outline-primary" class="btn-g">Receive</b-button>
  <b-button @click="$emit('del-address', wallet.plbk)" variant="outline-danger" class="del btn-g">Remove</b-button>
  </p>
  <div class="row">
    <div class="balance">Balance : {{ balance }} </div>
    <b-button @click="showprivatekey" variant="outline-primary" class="btn privatekeybtn"> Get Private Key </b-button>
  
  </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import network from '../../config.json'

export default {
    name: "Address",
    props: ["wallet"],
    components: {
       
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
        send() {

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
    width: 50px;
    left: 5px;
}

.address {
    background: rgb(75, 75, 75);
    color: rgb(0, 218, 247);
    padding: 2px;
    border-top: 1px rgb(0, 218, 247) solid;
    border-bottom: 1px rgb(0, 218, 247) solid;
}

.addr {
    position: relative;
    text-align: left;
    margin-left: 50px;
    top: 10px;
}

.btn-g {
    position: relative;
    margin-left: 20px;
    height: 40px;
    width: 150px;
    margin-top: -5px;  
}

.balance {
    margin-left: 10%;
}

.privatekeybtn {
    position: relative;
    height: 25px;
    width: 300px;
    margin-left: 35%;
    margin-top: 10px;
    font-size: 8px;
    top: -5px;
}

</style>