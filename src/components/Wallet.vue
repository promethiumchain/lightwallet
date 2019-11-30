<template>
  <div class="wallet">
    <div v-bind:key="wallet.pblk" v-for="wallet in wallets">
        <Address v-bind:wallet="wallet" v-on:del-address="$emit('del-address', wallet.pblk)" />
    </div>
  </div>
</template>

<script>
import Address from "./Address.vue"
export default {
name: "Wallet",
props: ["wallets"],
components: {
    Address
},
    
}
</script>

<style >
.wallet {
    margin-top: 10px;
    background: rgb(0, 0, 0);
    color: rgb(0, 218, 247);
    -webkit-app-region: drag;
}

::-webkit-scrollbar {
    display: none;
}

.btn {
  -webkit-app-region: no-drag;
}
</style>