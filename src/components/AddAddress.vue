<template>
  <div class="add">
   <b-button @click="addAddress" variant="outline-danger" class="btn">Create New Address</b-button>
   <b-button @click="importAddress" type="file" variant="outline-success" class="btn">Import Address</b-button>
  </div>
</template>

<script>
import uuid from 'uuid';
import Web3 from 'web3';
import network from '../../config.json'
import { readFile } from 'fs';
export default {
    name: "AddAddress",
    data() {
        return {
            file: ""
        }
    },
    methods: {
        addAddress(e) {
            var w3 = new Web3(network.address)
            var ac = w3.eth.accounts.create()
            console.log(ac)
            e.preventDefault();
            const newAddress = {
                id: uuid.v4(),
                pblk: ac["address"],
                prvk: ac["privateKey"],
            }
            this.$emit('add-address', newAddress)
        },
        importAddress() { 
            var input = document.createElement('input');
            input.onchange = e => { 
                var iFile = e.target.files[0]; 
                this.file = iFile
            }
            input.type = 'file';
            input.click()

        }
    }
}
</script>

<style scoped>
.add {
    margin-top: -5px;
    background: rgb(75, 75, 75);
}

.btn {
    width: 300px;
    height: 40px;
    margin: 10px;
}

</style>