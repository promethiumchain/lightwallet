<template>
  <div id="app">
  <Header />
  <AddAddress v-on:add-address="addAddress"/>
  <Wallet v-bind:wallets="wallets" v-on:del-address="deleteAddress"/>
  <Footer v-bind:wallets="wallets"/>
  </div>
</template>

<script>
import Header from "./components/Header"
import Wallet from "./components/Wallet"
import AddAddress from "./components/AddAddress"
import Footer from "./components/Footer"
// Todo Add Secure LS


export default {
  name: 'app',
  components: {
    Header,
    Wallet,
    AddAddress,
    Footer
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
      if(this.wallets.length == 0) {
        this.wallets = [...this.wallets, newAddress];
        return
      }
      let add = false
      this.wallets.forEach(element => {
          if(element.pblk == newAddress.pblk) {
            alert('address already in the wallets...aborting')
            add = false
          } else {
            add = true
          }
      });
      if(add) {
        this.wallets = [...this.wallets, newAddress];
      }
    }
  },
  watch: {
    wallets: {
      handler() {
        localStorage.setItem('wallets', JSON.stringify(this.wallets))
      },
      deep: true,
    },
  },
  mounted() {
    if(localStorage.getItem('wallets')) this.wallets = JSON.parse(localStorage.getItem('wallets'))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(0, 0, 0);
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
