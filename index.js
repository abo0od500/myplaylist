var discord = require("discord.js");
var request = require('request');
var stringLength = require("string-length");
var fs = require("fs");

// PREFIX->BOTNAME->PLAYLIST NAME->NAME OR YOUTUBE LINK

var client = new discord.Client();
var PREFIX = process.env.PREFIX;
client.on("message", message => {
    if(message.content.startsWith(`${PREFIX}`)){
    if (message.author.id === process.env.USERID) {
        message.delete();
        var msg = message.content.split('->');
        var botname = msg[1];
        var playlistName = msg[2];
        var datatype = msg[3];
        if (!botname) return message.channel.send('الرجاء توضيح اسم البوت');
        if (!playlistName) return message.channel.send('الرجاء توضيح اسم القائمة');
        
        if (!datatype) {
            datatype = "name";
        }
        
        var items = [];
		
       fs.exists('playlist.json', function(exists){
        if(exists){
            fs.readFile('playlist.json', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            var data = JSON.parse(data);
            var ex = 0;
            for (var make in data.name) {
            if(make == playlistName){
            for (var i = 0; i < data.name[make].length; i++) {
                ex = 1 ;
                if(datatype == "name"){
                items[i] = data.name[make][i].song;
                } 			
                
                if(datatype == "link"){
                items[i] = data.name[make][i].link;
                }
                
                }
            }
        }
    }})
    }});

    var index = 0;
    
    


    var interval = setInterval(function(){
//          console.log(items[index++]);
         if (typeof items !== 'undefined' && items.length > 0) {
                message.channel.send(botname + " " + items[index++]).then(msg => {
                msg.delete(3000)
                })
                .catch("deleted");
		}
	    if (typeof items == 'undefined' && items.length == 0) {
	    	message.channel.send('لا يوجد قائمة بهذا الاسم');
	    }


         if(index == items.length){
            clearInterval(interval);
         }
    }, 5000);


	}
    }
});

client.on("message", message => {
    if(message.content.startsWith(`show->`)){
		
		fs.exists('playlist.json', function(exists){
        if(exists){
            fs.readFile('playlist.json', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            var data = JSON.parse(data);
			console.log(data.name);
            //var ex = 0;
            // for (var make in data.name) {
            // if(make == playlistName){
            // for (var i = 0; i < data.name[make].length; i++) {
                // ex = 1 ;
                // if(datatype == "name"){
                // items[i] = data.name[make][i].song;
                // } 			
                
                // if(datatype == "link"){
                // items[i] = data.name[make][i].link;
                // }
                
                // }
            // }
			
			// console.log(data.name);
        // }
    }})
    }});
    
    }

});

client.login(process.env.TOKEN);
