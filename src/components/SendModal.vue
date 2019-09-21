<template>
  <div>
    <transition name="fade">
     <div v-if="isOpen" class="mdlc container">
         <div class="row">
             <div class="col-6">
                 <label class="label" for="addr">Address to send to :</label>
                 <b-form-input v-model="toAddr" id="addr" size="sm" placeholder="Enter Address" class="sendform"></b-form-input>
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
                 <b-form-input v-model="amount" id="amount" size="sm" placeholder="Enter Amount" class="sendform"></b-form-input>
             </div>
         </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Web3 from 'web3'
import network from '../../config.json'
import { Transaction } from 'ethereumjs-tx'
import Common from 'ethereumjs-common'
import { BufferToHex } from 'ethereumjs-util'
import { PrivateToAddress } from 'ethereumjs-util'
export default {
name: "SendModal",
    props: ["wallet"],
    data() {
        return {
            isOpen: false,
            amount: "",
            toAddr: "",
            gasValue: "10",
            availableBalance: "",
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
            
            if (this.toAddr.length < 24) {
                alert("address is not right")
                return
            }
            let amountNumber = Number(this.amount)
            let multi = 1000000000000000000
            let finalAmount = amountNumber * multi
            if (this.amount > this.availableBalance) {
                alert("no enough funds available to make this transaction")
            }
            var w3 = new Web3(network.address)
            var customCommon = Common.forCustomChain(
            'mainnet',
            {
            // name: 'promethium',
            // networkId: 1,
            // chainId: 71133745320,
            // },
            // 'homestead',

            
            name: 'ethereum', // For development
            networkId: 1,
            chainId: 1,
            },
            'petersburg',
            )
            w3.eth.getTransactionCount(this.wallet.pblk).then((res) => {
                const tx = new Transaction(
                    {
                    nonce: res,
                    gasPrice: this.gasValue * 1000, // Todo check this
                    gasLimit: 5000000,
                    to: this.to,
                    value: finalAmount,
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

                if (tx.validate() && BufferToHex(tx.getSenderAddress()) === BufferToHex(PrivateToAddress(privateKey))) {
                    console.log('Valid signature')
                    } else {
                    console.log('Invalid signature')
                }

                console.log("The transaction's chain id is", tx.getChainId())
                const serializedTx = `0x${tx.serialize().toString('hex')}`;
                w3.eth.sendSignedTransaction(serializedTx, function (err, transactionHash) {
                    if (err) {
                        console.log("error sending the tx : "+ err)
                        return
                    }
                    console.log(transactionHash);
                });
            })
        }
    }
}
</script>

<style scoped>

.amount {
    top: -70px;
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