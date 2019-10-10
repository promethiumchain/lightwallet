<template>
  <div class="add">
   <b-button @click="addAddress" variant="outline-danger" class="btn">Create New Address</b-button>
   <b-button @click="importAddress" variant="outline-success" class="btn" >Import Address</b-button>
   <ImportModal @newkey="addKeyAddr"/>
  </div>
</template>

<script>
import ImportModal from './ImportModal'
import uuid from 'uuid'
import Web3 from 'web3'
import network from '../../config.json'


export default {
    name: "AddAddress",
    components: {
        ImportModal
    },
    methods: {
        addAddress(e) {
            var w3 = new Web3(network.http)
            var ac = w3.eth.accounts.create()
            e.preventDefault();
            const newAddress = {
                id: uuid.v4(),
                pblk: ac["address"],
                prvk: ac["privateKey"],
            }
            this.$emit('add-address', newAddress)
        },
        importAddress() { 
            this.$emit('togglePassword')
        },
        addKeyAddr(newAddress) {
            this.$emit('add-address', newAddress)
        }
    }
}
</script>

<style scoped>
.add {
    margin-top: -5px;
    background: rgb(0, 0, 0);
}

.btn {
    width: 300px;
    height: 40px;
    margin: 10px;
}

</style>