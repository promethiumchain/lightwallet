<template>
    <div class="bot">
        <b-button @click="save()" variant="outline-danger" class="btnsave" >Save All Addresses</b-button>
        <b-button @click="toggleModal" variant="outline-success" class="btnsetup" >Setup Service Node</b-button>
         <transition name="fade">
        <div v-if="isOpen" class="setup">
            <div class="row">
                <div class="col-12">
                    <label class="httplabel" for="http">Http service node ip and pass : </label>
                    <b-form-input v-model="http" id="http" size="sm" placeholder="Enter IP and PORT for HTTP" class="sendform1"></b-form-input>
                     <label class="wslabel" for="ws">Websockets service node ip and pass : </label>
                    <b-form-input v-model="ws" id="ws" size="sm" placeholder="Enter IP and PORT for WS" class="sendform2"></b-form-input>
                    <b-button @click="toggleModal" variant="outline-danger" class="cancelbtn">Cancel</b-button>
                    <b-button @click="setup" variant="outline-success" class="setupbtn">Confirm Setup</b-button>
                </div>
            </div>
        </div>
         </transition>
    </div>
</template>

<script>
import {remote } from 'electron'
import fs from 'fs'
export default {
    name: 'Footer',
    props: ['wallets'],
    data() {
        return {
            dialog: '',
            win: '',
            isOpen: false,
            http: '',
            ws: '',
        }
    },
    methods: {
        save() {
            this.dialog = remote.dialog
            this.win = remote.getCurrentWindow()

            let options = {
                title: 'Save all addresses',
                defaultPath: 'keys.txt',
                buttonLabel: 'Save file',
                filters: [
                    {name: 'All Files', extensions: ['*']}
                ]
            }
            this.dialog.showSaveDialog(this.win, options, (filename) => {
                fs.writeFile(filename, JSON.stringify(this.wallets), (err) => {
                    if(err) {
                        alert('there was a error trying to save the keys : '+err)
                    }
                })
            })
            
        },
        toggleModal() {
        this.isOpen = !this.isOpen
        },
        setup() {
            if(this.http.startsWith('http://') && this.ws.startsWith('ws://')) {
                var m = JSON.parse(fs.readFileSync('./config.json').toString())
                fs.writeFile('./configbackup.json', JSON.stringify(m), (err) => {
                    console.log(err)
                })
                m.http = this.http
                m.ws = this.ws
                fs.writeFile('./config.json', JSON.stringify(m), (err) => {
                    console.log(err)
                })
                alert('you need to restart the app so changes take effect...quiting')
                remote.app.quit()
            } else {
                alert('http and ws address needs to be in http://ip:port or ws://ip:port format')
            }
        }
    },
}
</script>

<style scoped>

.bot {
    background-color: black;
    position: relative;
    margin-top: 10px;
    min-height: 120px;
    -webkit-app-region: drag;
}

.btnsave, .btnsetup {
    widows: 300px;
    margin: 10px;
}

.httplabel {
    position: absolute;
    top: 10px;
    left: 30px;
    font-size: 10px;
}

.sendform1 {
    position: absolute;
    top: 0px;
    left: 180px;
    width: 250px;
    height: 30px;
    font-size: 10px;
    z-index: 9999;
}

.sendform2 {
   position: absolute;
    top: 0px;
    left: 700px;
    width: 200px;
    height: 30px;
    font-size: 10px;
    z-index: 9999;
}


.wslabel {
    position: absolute;
    top: 10px;
    left: 500px;
    font-size: 10px;
}

.setupbtn {
    position: absolute;
    top: 0px;
    left: 1075px;
    font-size: 10px;
    height: 30px;
    width: 100px;   
    z-index: 9999;
}

.cancelbtn {
    position: absolute;
    top: 0px;
    left: 950px;
    font-size: 10px;
    height: 30px;
    width: 100px;   
    z-index: 9999;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>