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

<style scoped>
.wallet {
    margin-top: 10px;
    background: rgb(75, 75, 75);
    color: rgb(0, 218, 247);
}
</style>