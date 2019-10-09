<template>
    <div>
        <b-button @click="save()" variant="outline-success" class="btnsave" >Save All Addresses</b-button>
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
            
        }
    }
}
</script>

<style>

.btnsave {
    width: 500px;
    height: 40px;
    margin-top: 20px;
}
</style>