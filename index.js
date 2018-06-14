'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = ""

// Facebook 

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "fuckthis") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			decideMessage(sender, text)
			//sendText(sender, "Text echo: " + text.substring(0, 100))
		}
		if (event.postback)
			let text = JSON.stringify(event.postback)
				decideMessage(sender,text)
				continue
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1) {
	let text = text1.toLowerCase
	if (text.includes("Auction")) {
		sendImageMessage(sender)
	} else if (text.includes("Pinnacle")) {

	} else { 
		sendText(sender, "We're working hard to bring back Sunday auctions from new companies :)")
		sendButtonMessage(sender,"What do you wanna know? :)" )
		}
	}


function sendText(sender, text) {
	let messageData = {text: text}
	sendRequest(sender, messageData)
}



fuction sendButtonMessage(sender, text) {
	let messageData = "attachment" {
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Auction",
            "payload":"Saturday July 14 at 1pm"
          },
          {
            "type":"postback",
            "title":"Flea Market"
            "payload":"Every Saturday and Sunday from 9 to 5 for FREE"
          },
        ]
      }
    }
	sendRequest(sender, messageData)
}

function sendImageMessage(sender, text, ImageURL) {
	let messageData = {
    "attachment": {
      "type": "template",
      "payload": {
         "template_type": "media",
         "elements": [
            {
               "media_type": "image",
               "url": "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/35364355_10155875274320787_9103350331114258432_n.png?_nc_cat=0&_nc_eui2=AeHv0WpWCVKuRidic19W9qygRWJ8VhKjkFq2-Nz5jacCxb9ahT5W9isU66NwE2ocIh91MnHc7skqov_uZfyMQxbTv0qJW7sAuQggLaEquoWM7w&oh=8640aa74296dbc93c39a2d652547dff8&oe=5BBE62DA"
            }
        

 	sendRequest(sender, messageData)

 function sendGenericMessage(sender) |
 		let messageData = {} "attachment":{
 			"type":"template",
 			"payload":{
 				"template_type":"generic",
 				"elements":[
 					{
 					 "title":"Welcome to Bargain City",
 					 "item_url":"https://www.mybargaincity.com",
 					 "image_url":"AeHv0WpWCVKuRidic19W9qygRWJ8VhKjkFq2-Nz5jacCxb9ahT5W9isU66NwE2ocIh91MnHc7skqov_uZfyMQxbTv0qJW7sAuQggLaEquoWM7w",
 					 "subtitle":"We\'ve got what you\'re looking for at a lower cost than you thought!"
 					 "buttons":[
 					 {
 					 	"type":"web_url",
 					 	"url":"https://www.mybargaincity.com",
 					 	"title":"View Website"
 					 },
 					 {
 					 	"type":"postback"
 					 	"title":"Start Chatting"
 					 	"payload":"DEVELOP_DEFINED_PAYLOAD"
 					 }
 					}
 			}
 		}

function sendRequest(sender, messageData)
request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})




app.listen(app.get('port'), function() {
	console.log("running: port")
})
