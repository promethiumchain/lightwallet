<template>
  <div class="address">
      <div class="row">
          <div class="col-12 addressdiv">
              <label class="labeladdr">{{ wallet.pblk}}</label>
              <b-button @click="toggleModal" variant="outline-success" class="btn-g">Send</b-button>
              <b-button @click="toggleReceiveModal" variant="outline-primary" class="btn-g">Receive</b-button>
              <b-button @click="toggleRemoveModal" variant="outline-danger" class="del btn-g">Remove</b-button>
              <label class="balance">Balance : {{ balance }} </label>
              <b-button @click="showPrivateKey" variant="outline-primary" class="btn privatekeybtn"> Get Private Key </b-button>
          </div>
      </div>
      <div class="row">
          <div class="col-12">
              <SendModal v-bind:wallet="wallet" v-bind:balance="balance"/>
              <ReceiveModal v-bind:wallet="wallet" />
              <RemoveModal v-bind:wallet="wallet" v-on:del-address="$emit('del-address', wallet.pblk)"/>
              <PrivateKeyModal v-bind:wallet="wallet" />
          </div>
      </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import network from '../../config.json'
import SendModal from './SendModal.vue'
import ReceiveModal from './ReceiveModal.vue'
import RemoveModal from './RemoveModal.vue'
import PrivateKeyModal from './PrivateKeyModal.vue'

export default {
    name: "Address",
    props: ["wallet"],
    components: {
      SendModal,
      ReceiveModal,
      RemoveModal,
      PrivateKeyModal,
    },
    data() {
        return {
            balance: "?",
            blockHeader: ""
        }
    },
    created() {
        const w3 = new Web3(network.ws)
            const addr = this.wallet.pblk
            const div = 1000000000000000000
            w3.eth.subscribe('newBlockHeaders', (err, res) => {
                if(err) {
                    alert("trying to subscibe to new evets failed with error : "+err)
                    return
                }
            })
            .on('data', () => {
                w3.eth.getBalance(addr)
                .then((res) => {
                    this.balance = res / div
                })
                .catch(err => alert(err))
            })
            
    },
    methods: {
        toggleModal() {
            this.$emit('toggleModal')
        },
        toggleRemoveModal() {
            this.$emit('toggleRemove')
        },
        toggleReceiveModal() {
            this.$emit('toggleReceive')
        },
        showPrivateKey() {
            this.$emit('togglePrivate')
        }
    }
}
</script>

<style scoped>

.labeladdr {
    position: relative;
    float: left;
    margin-top: 17px;
    right: -30px;
    width: 300px;
}

.address {
    display: block;
    background: rgb(0, 0, 0);
    color: rgb(0, 218, 247);
    padding: 2px;
    border-top: 1px rgb(0, 218, 247) solid;
    border-bottom: 1px rgb(0, 218, 247) solid;
}

.addr {
    float: left;
}

.addressdiv {
    font-size: 12px;
}

.btn-g, .privatekeybtn {
    position: relative;
    margin-left: 20px;
    height: 30px;
    width: 120px;
    font-size: 10px;
    margin-top: 10px;
    margin-bottom: 10px;  
}

.balance {
    position: relative;
    width: 200px;
}



</style>