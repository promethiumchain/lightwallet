<template>
  <div>
      <transition name="fade">
        <div v-if="isOpen" class="container">
            <div class="row">
                <div class="col-12 passdiv">
                    <label class="label" for="pass">Password for the key :</label>
                    <b-form-input v-model="password" id="pass" size="sm" placeholder="Enter Password" class="password"></b-form-input>
                    <b-button @click="toggleModal" variant="outline-danger" class="btn-x">Cancel</b-button>
                    <b-button @click="setPassword" variant="outline-success" class="btn-x">Load File</b-button>
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
export default {
    name: "PasswordModal",
    
    data() {
        return {
            isOpen: false,
            password: "",
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
            }
            input.type = 'file';
            input.click()
        }
    }
}
</script>

<style scoped>
.btn-x {
    margin-left: 20px;
    margin-top: 20px;
    height: 30px;
    width: 150px;
    font-size: 10px;
}

.passdiv {
    justify-content: center;
    align-items: center;
}
</style>