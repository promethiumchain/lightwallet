<template>
  <div>
    <transition name="fade">
     <div v-if="isOpen" class="mdlc container">
         <div class="row">
             <div class="col-6">
                 <label class="addrlabel" for="addr">Address to send to :</label>
                 <b-form-input v-model="toAddr" id="addr" size="sm" placeholder="Enter Address" class="sendform1"></b-form-input>
             </div>
             <div class="col-6">
                <b-button @click="toggleModal" variant="outline-danger" class="cancelbtn">Cancel Send</b-button>
                <b-button @click="sendcoins" variant="outline-success" class="sendbtn">Confirm Send</b-button>
             </div>
             <div class="col-6 amount">
                <label class="amountlabel" for="amount">Amount to send :</label>
                <b-form-input v-model="amount" id="amount" size="sm" placeholder="Enter Amount" class="sendform2"></b-form-input>
            </div>
         </div>
         <div class="dummy"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Web3 from 'web3'
import network from '../../config.json'
import { Transaction } from 'ethereumjs-tx'
import  Common  from 'ethereumjs-common'
export default {
name: "SendModal",
    props: ["wallet", "balance"],
    data() {
        return {
            isOpen: false,
            amount: "",
            toAddr: "",
            availableBalance: "",
            gasPrice: "",
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
            var w3 = new Web3(network.http)
            if (this.toAddr.length < 24) {
                alert("address is not right")
                return
            }
            let finalAmount = w3.utils.toWei(this.amount)
            if (this.amount > this.balance || this.balance == 0) { // TODO store current and check against it
                alert("no enough funds available to make this transaction")
                return
            }
            
            var customCommon = Common.forCustomChain(
            'mainnet',
            {
            name: 'promethium',
            networkId: 1,
            chainId: 71133745320,
            },
            'homestead',
            )

            w3.eth.getTransactionCount(this.wallet.pblk).then((res) => {
                const tx = new Transaction(
                    {
                    from: this.wallet.pblk,
                    nonce: res,
                    gasPrice: w3.utils.toHex(21e9), // Todo check this
                    gasLimit: w3.utils.toHex(50000),
                    to: this.toAddr,
                    value: w3.utils.toHex(finalAmount),
                    },
                    { common: customCommon },
                )
                let npk = this.wallet.prvk
                
                let fpk = npk.substring(2, npk.length)
                const privateKey = Buffer.from(
                    fpk.toString(16),
                    'hex',
                )

                tx.sign(privateKey)
                if(!tx.validate()){
                    return
                } 

                const serializedTx = `0x${tx.serialize().toString('hex')}`;
                w3.eth.sendSignedTransaction(serializedTx, function (err, transactionHash) {
                    if (err) {
                        alert("error sending the tx : "+ err)
                        return
                    }
                    alert("Transaction send with hash: "+transactionHash);
                })
            })
            .catch(err => alert('error creating the tx : '+ err))
            this.isOpen = false
        }
    }
}
</script>

<style scoped>

.addrlabel {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 10px;
}

.sendform1 {
    position: absolute;
    top: 0px;
    left: 110px;
    width: 250px;
    height: 30px;
    font-size: 10px;
    z-index: 9999;
}

.sendform2 {
   position: absolute;
    top: 0px;
    left: 490px;
    width: 200px;
    height: 30px;
    font-size: 10px;
    z-index: 9999;
}


.amountlabel {
    position: absolute;
    top: 10px;
    left: 400px;
    font-size: 10px;
}

.sendbtn {
    position: absolute;
    top: 0px;
    left: 275px;
    font-size: 10px;
    height: 30px;
    width: 100px;   
    z-index: 9999;
}

.cancelbtn {
    position: absolute;
    top: 0px;
    left: 150px;
    font-size: 10px;
    height: 30px;
    width: 100px;   
    z-index: 9999;
}
.dummy {
    position: relative;
    height: 50px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>