<template>
  <div>
      <transition name="fade">
        <div v-if="isOpen" class="container">
            <div class="row">
                <div class="col-12 passdiv">
                    <label class="passlabel">Password for the key file :</label>
                    <b-form-input v-model="password" id="pass" size="sm" placeholder="Enter Password" class="password"></b-form-input>
                    <b-button @click="setPassword" variant="outline-success" class="load">Load File</b-button>
                </div>
            </div>
            <div class="row">
                <div class="col-12 prkey">
                    <label class="pklabel">Private Key :</label>
                    <b-form-input v-model="privatekey" id="pk" size="sm" placeholder="Enter Private Key" class="pk"></b-form-input>
                    <b-button @click="toggleModal" variant="outline-danger" class="cancel">Cancel</b-button>
                    <b-button @click="importFromPrivateKey" variant="outline-success" class="import">Import Address</b-button>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import uuid from 'uuid'
import ethWallet from 'ethereumjs-wallet'
import fs from 'fs'
import Web3 from 'web3'
import network from '../../config.json'
export default {
    name: "ImportModal",
    
    data() {
        return {
            isOpen: false,
            password: "",
            privatekey: "",
            filePath: "",
        }
    },
    mounted() {
        this.$parent.$on('togglePassword', this.toggleModal)
    },
    methods: {
        toggleModal() {
            this.isOpen = !this.isOpen
        },
        setPassword() {  
            var input = document.createElement('input');
            var newAddress = ""
            input.onchange = e => { 
                var iFile = e.target.files[0]; 
                this.file = iFile
                var reader = new FileReader();
                reader.readAsText(this.file,'UTF-8');
                reader.onload = readerEvent => {
                    try {
                        const w = ethWallet.fromV3(fs.readFileSync(this.file.path).toString(), this.password, true)
                        newAddress = {
                        id: uuid.v4(),
                        pblk: "0x"+w.getAddress().toString('hex'),
                        prvk: "0x"+w.getPrivateKey().toString('hex'),
                        }
                        //TODO reset the placeholder
                        this.$emit('newkey', newAddress)
                        this.isOpen = false
                    }
                    catch(err) {
                        alert('wrong password')
                    }    
                }
            }
            input.type = 'file';
            input.click()
        },
        importFromPrivateKey() {
            var w3 = new Web3(network.address)
            let ac = w3.eth.accounts.privateKeyToAccount(this.privatekey)
            const newAddress = {
                id: uuid.v4(),
                pblk: ac["address"],
                prvk: ac["privateKey"],
            }
            this.$emit('newkey', newAddress)
            this.isOpen = false
        }
    }
}
</script>

<style scoped>

.passlabel {
    position: absolute;
    top: 10px;
    left: 30px;
    width: 200px;
}

.pklabel {
    position: absolute;
    top: 60px;
    left: -15px;
    width: 200px;
}

.password {
    position: absolute;
    top: 0px;
    left : 240px;
    margin-left: 20px;
    width: 300px;
}

.load {
    position: absolute;
    top: 0px;
    left : 900px;
    height: 30px;
    width: 150px;
    font-size: 10px;    
}

.cancel {
    position: absolute;
    top: 100px;
    left : 900px;
    height: 30px;
    width: 150px;
    font-size: 10px;    
}

.import {
    position: absolute;
    top: 50px;
    left : 900px;
    height: 30px;
    width: 150px;
    font-size: 10px; 
}

.pk {
    position: absolute;
    top: 50px;
    left: 260px;
    width: 600px;
}

.container {
    margin-top: 10px;
    display: block;
    height: 130px;
}

</style>