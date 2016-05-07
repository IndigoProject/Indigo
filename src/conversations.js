var levenshtein = require("../src/utils/levenshtein.js");
var strUtils = require("../src/utils/strings.js");
var fallback = require("../corpus/fallback.json").data;
var util = require("util");

//array with conversational data.
var conversations = [];

function initialize(array) {
    if(!Array.isArray(array)){
        throw new TypeError("conversations.Initialize expects an array. Got: " +
            array.toString());
    }

    conversations = array;
}

function getResponse(input) {
    if(conversations.length === 0) {
        throw new Error("Conversation data is empty, are you sure you initialized the engine?");
    }

    var tops = [];

    //loop through all the cached conversations
    for (var cursor = 0; cursor < conversations.length; cursor++) {
        var matchlist = {};
        var conversation = conversations[cursor];

        //loop through each message, and calculate a match
        for (var i = 0; i < conversation.length; i++) {
            var str = strUtils.clean(conversation[i]);
            var levNum = levenshtein(str, strUtils.clean(input));
            var match =  (1 - (levNum / Math.max(str.length, strUtils.clean(input).length)));
            matchlist[match] = conversation[i];
        }

        //pre define the object for the best match from the conversation
        var top = {
            rank: 0,
            content: "",
            conversation_id: cursor
        };

        //loop through all messages, and chose the highest match
        for (var key in matchlist) {
            if (matchlist.hasOwnProperty(key)) {
                if(key > top.rank) {
                    top = {
                        rank: key,
                        content: matchlist[key],
                        conversation_id: cursor
                    };
                }
            }
        }

        //push the highest match from this conversation
        tops.push(top);
    }

    //pre define the object for the final match
    var final = {
        rank: 0,
        content: "",
        conversation_id: cursor
    };

    //get the best final from the tops
    for (var ti = 0; ti < tops.length; ti++) {
        var t = tops[ti];
        if(t.rank > final.rank) {
            final = t;
        }
    }

    //get the next expected response
    if(conversations[final.conversation_id].indexOf(final.content) > -1) {
        var pointer = conversations[final.conversation_id].indexOf(final.content);

        if(conversations[final.conversation_id][pointer + 1] === undefined) {
            return fallback[Math.floor(Math.random() * fallback.length)];
        } else {
            return conversations[final.conversation_id][pointer + 1];
        }
    }
}

module.exports.getResponse = getResponse;
module.exports.initialize = initialize;
