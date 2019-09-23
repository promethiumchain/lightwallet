<template>
  <div class="header">
    <h5>Promethium Light Wallet Version 0.0.1</h5>
    <div class="row">
    <div class="hbn"> Current Block Number : {{ blockNumber }} </div>
    <div class="hip"> Connected to node : {{ nodeAddr }}</div>
  </div>
    </div>
</template>

<script>
import Web3 from 'web3';
import network from '../../config.json'
export default {
    name: "Header",
    data() {
        return {
            blockNumber: "Waiting for sync...",
            nodeAddr: ""
        }
    },
    created() {
        var w3 = new Web3(network.ws)
        w3.eth.subscribe('newBlockHeaders', (err) => {
                if(err) {
                    alert("trying to subscibe to new evets failed with error : "+err)
                    return
                }
            })
            .on('data', (res) => {
                this.blockNumber = res.number
            })
            
        this.nodeAddr = network.address
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px rgb(0, 218, 247) solid;
    position: relative;
    top: -10px;
    background-color: rgb(75, 75,75);
    display: block;
    color : rgb(0, 218, 247);
    text-align: center;
    margin-top: -50px;
    height: 60px;
}

.hbn {
    margin-left: 25%;
}

.hip {
    margin-left: 5%;
}

</style>