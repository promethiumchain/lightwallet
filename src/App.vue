<template>
  <div id="app">
  <Header />
  <AddAddress v-on:add-address="addAddress"/>
  <Wallet v-bind:wallets="wallets" v-on:del-address="deleteAddress"/>
  </div>
</template>

<script>
import Header from "./components/Header"
import Wallet from "./components/Wallet"
import AddAddress from "./components/AddAddress"

export default {
  name: 'app',
  components: {
    Header,
    Wallet,
    AddAddress
  },
  data () {
    return {
      wallets: []
    }
  },
  methods: {
    deleteAddress(pblk) {
      this.wallets = this.wallets.filter(wallet => wallet.pblk != pblk);
    },
    addAddress(newAddress) {
      this.wallets = [...this.wallets, newAddress];
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(75, 75, 75);
  color: rgb(0, 218, 247);
  margin-top: 60px;
  width: 100%;
  height: 600px;
}

.body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

</style>
