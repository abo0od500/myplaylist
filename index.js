var discord = require("discord.js");
var request = require('request');
var stringLength = require("string-length");
var fs = require("fs");

// PREFIX->BOTNAME->PLAYLIST NAME

var client = new discord.Client();
var PREFIX = process.env.PREFIX;
client.on("message", message => {
    if(message.content.startsWith(`${PREFIX}`)){
    if (message.author.id === process.env.USERID) {
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
                setInterval(() => { message.channel.send(botname + " " + data.name[make][i].song)}, 2000);
//                 message.channel.send(botname + " " + data.name[make][i].song);
//                 console.log(data.name[make][i].song);
                }
            }
        }
    }})
    }});
}
    }
});
client.login(process.env.TOKEN);
