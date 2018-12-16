var discord = require("discord.js");
var request = require('request');
var stringLength = require("string-length");
var fs = require("fs");

var client = new discord.Client();
var PREFIX = "!pl";
client.on("message", message => {
    if(message.content.startsWith(`${PREFIX}`)){
    if (message.author.id === 482335925867642881) {
        message.delete();
        var msg = message.content.split('->');
        var botname = msg[1];
        var playlistName = msg[2];
        console.log(playlistName);
        if (!botname) return message.channel.send('الرجاء توضيح اسم البوت');
        if (!playlistName) return message.channel.send('الرجاء توضيح اسم القائمة'); 
        console.log(message.content);

       fs.exists('playlist.json', function(exists){
        if(exists){
            console.log("yes file exists");
            fs.readFile('playlist.json', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            var data = JSON.parse(data); 
            for (var make in data.name) {
            if(make == playlistName){
            for (var i = 0; i < data.name[make].length; i++) {
                message.channel.send(botname + " " + data.name[make][i].song);
                console.log(data.name[make][i].song);
                }
            }
        }
    }})
    }});
}
    }
});
client.login("NDgyMzM1OTI1ODY3NjQyODgx.DvhBTg.u8IhByz0X0SS8d_KI7wvx5hN7fI");
