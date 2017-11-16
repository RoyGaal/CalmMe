{\rtf1\ansi\ansicpg1252\cocoartf1504\cocoasubrtf830
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 \
const Alexa = require('alexa-sdk');\
\
const states = \{\
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.\
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.\
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit\
\};\
\
\
// Questions\
const nodes = [\{ "node": 1, "message": "Are you feeling unhappy?", "yes": 2, "no": 3 \},\
             \{ "node": 2, "message": "Are you feeling upset?", "yes": 4, "no": 5 \},\
             \{ "node": 3, "message": "Are you feeling depressed?", "yes": 6, "no": 7 \},\
             \{ "node": 4, "message": "Are you feeling angry", "yes": 8, "no": 9 \},\
             \{ "node": 5, "message": "Are you feeling sad?", "yes": 10, "no": 11 \},\
             \{ "node": 6, "message": "Are you feeling mad?", "yes": 12, "no": 13 \},\
             \{ "node": 7, "message": "Are you feeling mad?", "yes": 14, "no": 15 \},\
            \
\
// Answers & descriptions\
             \
             \{ "node": 1, "message": "Would you like to meditate?", "yes": 18, "no": 19  \},\
             \{ "node": 2, "message": "Would you like to meditate?", "yes": 16, "no": 17 \},\
             \{ "node": 3, "message": "Would you like to meditate?", "yes": 18, "no": 19  \},\
             \{ "node": 4, "message": "Would you like to meditate?", "yes": 16, "no": 17 \},\
             \{ "node": 5, "message": "Would you like to meditate?", "yes": 18, "no": 19  \},\
             \{ "node": 6, "message": "Would you like to meditate?", "yes": 16, "no": 17 \},\
             \{ "node": 7, "message": "Would you like to meditate?", "yes": 18, "no": 19  \},\
             \{ "node": 8, "message": "Would you like to meditate?", "yes": 16, "no": 17 \},\
             \{ "node": 9, "message": "Would you like to meditate?", "yes": 18, "no": 19  \},\
             \{ "node": 10, "message": "Would you like to meditate?", "yes":20, "no": 21 \},\
             \{ "node": 11, "message": "Would you like to meditate?", "yes":22 , "no": 23 \},\
             \{ "node": 12, "message": "Would you like to meditate?", "yes": 24, "no": 25 \},\
             \{ "node": 13, "message": "Would you like to meditate?", "yes": 26, "no": 27 \},\
             \{ "node": 14, "message": "Would you like to meditate?", "yes": 28, "no": 29 \},\
             \{ "node": 15, "message": "Would you like to meditate?", "yes": 30, "no": 31 \},\
             \
             \{ "node": 16, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 17, "message": "Well, that sucks", "yes": 0, "no": 0  \},\
             \{ "node": 18, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes":0, "no": 0 \},\
             \{ "node": 19, "message": "well, That sucks", "yes":0 , "no": 0 \},\
             \{ "node": 20, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 21, "message": "well, That sucks", "yes": 0, "no": 0 \},\
             \{ "node": 22, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 23, "message": "well, that sucks", "yes": 0, "no": 0 \},\
             \{"node": 24, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 25, "message": "well, that sucks", "yes": 0, "no": 0 \},\
             \{"node": 26, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 27, "message": "well, that sucks", "yes": 0, "no": 0 \},\
             \{"node": 28, "message": "Insert a beautiful musical meadly that cures all your worries and pain here, sigh", "yes": 0, "no": 0 \},\
             \{ "node": 29, "message": "well, that sucks", "yes": 0, "no": 0 \},\
             \{"node": 30, "message": "Insert a beautiful musical meadly that cures all your worries and pain here", "yes": 0, "no": 0 \},\
             \{ "node": 31, "message": "well, that sucks", "yes": 0, "no": 0 \},\
             \
             \
             \
];\
\
\
// this is used for keep track of visted nodes when we test for loops in the tree\
let visited = [nodes.length];\
\
// These are messages that Alexa says to the user during conversation\
\
\
// This is the intial welcome message\
const welcomeMessage = "Welcome to Calm Me, are you ready to rumble?";\
\
// This is the message that is repeated if the response to the initial welcome message is not heard\
const repeatWelcomeMessage = "Say yes if you want help or say no to GTFO";\
\
// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message\
const promptToStartMessage = "Say yes to continue or no to exit, okay? this will be mutually beneficial ";\
\
// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply\
const promptToSayYesNo = "I'm really sorry you're having a bad day, but I need you to say yes or no";\
\
// This is the response to the user after the final question when Alex decides on what group choice the user should be given\
const decisionMessage = "You will be okay, ";\
\
// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again\
const playAgainMessage = "Would you like to go through this again?";\
\
// this is the help message during the setup at the beginning of the game\
const helpMessage = "Would you like me to alert you friends that you need help?";\
\
// This is the goodbye message when the user has asked to quit the game\
const goodbyeMessage = "Thank you for coming to me, Remember you are really attractive and tomorrow will be even better";\
\
const speechNotFoundMessage = "Could not find speech for node";\
\
const nodeNotFoundMessage = "In nodes array could not find node";\
\
const descriptionNotFoundMessage = "Could not find description for node";\
\
const loopsDetectedMessage = "A potential loop was detected on the node tree, please fix before continuing";\
\
const utteranceTellMeMore = "Tell me more";\
\
const utterancePlayAgain = "continue?";\
\
// the first node that we will use\
let START_NODE = 1;\
\
// --------------- Handlers -----------------------\
\
// Called when the session starts.\
exports.handler = function (event, context, callback) \{\
    const alexa = Alexa.handler(event, context);\
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers, descriptionHandlers);\
    alexa.execute();\
\};\
\
// set state to start up and  welcome the user\
const newSessionHandler = \{\
  'LaunchRequest': function () \{\
    this.handler.state = states.STARTMODE;\
    this.response.speak(welcomeMessage).listen(repeatWelcomeMessage);\
    this.emit(':responseReady');\
  \},'AMAZON.HelpIntent': function () \{\
    this.handler.state = states.STARTMODE;\
    this.response.speak(helpMessage).listen(helpMessage);\
    this.emit(':responseReady');\
  \},\
  'Unhandled': function () \{\
    this.handler.state = states.STARTMODE;\
    this.response.speak(promptToStartMessage).listen(promptToStartMessage);\
    this.emit(':responseReady');\
  \}\
\};\
\
// --------------- Functions that control the skill's behavior -----------------------\
\
// Called at the start of the game, picks and asks first question for the user\
const startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, \{\
    'AMAZON.YesIntent': function () \{\
\
        // ---------------------------------------------------------------\
        // check to see if there are any loops in the node tree - this section can be removed in production code\
        visited = [nodes.length];\
        const loopFound = helper.debugFunction_walkNode(START_NODE);\
        if( loopFound === true)\
        \{\
            // comment out this line if you know that there are no loops in your decision tree\
             this.response.speak(loopsDetectedMessage);\
        \}\
        // ---------------------------------------------------------------\
\
        // set state to asking questions\
        this.handler.state = states.ASKMODE;\
\
        // ask first question, the response will be handled in the askQuestionHandler\
        let message = helper.getSpeechForNode(START_NODE);\
\
        // record the node we are on\
        this.attributes.currentNode = START_NODE;\
\
        // ask the first question\
        this.response.speak(message).listen(message);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.NoIntent': function () \{\
        // Handle No intent.\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StopIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.CancelIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StartOverIntent': function () \{\
         this.response.speak(promptToStartMessage).listen(promptToStartMessage);\
         this.emit(':responseReady');\
    \},\
    'AMAZON.HelpIntent': function () \{\
        this.response.speak(helpMessage).listen(helpMessage);\
        this.emit(':responseReady');\
    \},\
    'Unhandled': function () \{\
        this.response.speak(promptToStartMessage).listen(promptToStartMessage);\
        this.emit(':responseReady');\
    \}\
\});\
\
\
// user will have been asked a question when this intent is called. We want to look at their yes/no\
// response and then ask another question. If we have asked more than the requested number of questions Alexa will\
// make a choice, inform the user and then ask if they want to play again\
const askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, \{\
\
    'AMAZON.YesIntent': function () \{\
        // Handle Yes intent.\
        helper.yesOrNo(this,'yes');\
        this.emit(':responseReady');\
    \},\
    'AMAZON.NoIntent': function () \{\
        // Handle No intent.\
         helper.yesOrNo(this, 'no');\
         this.emit(':responseReady');\
    \},\
    'AMAZON.HelpIntent': function () \{\
        this.response.speak(promptToSayYesNo).listen(promptToSayYesNo);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StopIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.CancelIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StartOverIntent': function () \{\
        // reset the game state to start mode\
        this.handler.state = states.STARTMODE;\
        this.response.speak(welcomeMessage).listen(repeatWelcomeMessage);\
        this.emit(':responseReady');\
    \},\
    'Unhandled': function () \{\
        this.response.speak(promptToSayYesNo).listen(promptToSayYesNo);\
        this.emit(':responseReady');\
    \}\
\});\
\
// user has heard the final choice and has been asked if they want to hear the description or to play again\
const descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, \{\
\
 'AMAZON.YesIntent': function () \{\
        // Handle Yes intent.\
        // reset the game state to start mode\
        this.handler.state = states.STARTMODE;\
        this.response.speak(welcomeMessage).listen(repeatWelcomeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.NoIntent': function () \{\
        // Handle No intent.\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.HelpIntent': function () \{\
        this.response.speak(promptToSayYesNo).listen(promptToSayYesNo);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StopIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.CancelIntent': function () \{\
        this.response.speak(goodbyeMessage);\
        this.emit(':responseReady');\
    \},\
    'AMAZON.StartOverIntent': function () \{\
        // reset the game state to start mode\
        this.handler.state = states.STARTMODE;\
        this.response.speak(welcomeMessage).listen(repeatWelcomeMessage);\
        this.emit(':responseReady');\
    \},\
    'DescriptionIntent': function () \{\
        //const reply = this.event.request.intent.slots.Description.value;\
        //console.log('HEARD:' + reply);\
        helper.giveDescription(this);\
    \},\
    'Unhandled': function () \{\
        this.response.speak(promptToSayYesNo).listen(promptToSayYesNo);\
        this.emit(':responseReady');\
    \}\
\});\
\
// --------------- Helper Functions  -----------------------\
\
const helper = \{\
\
    // gives the user more information on their final choice\
    giveDescription: function (context) \{\
\
        // get the speech for the child node\
        let description = helper.getDescriptionForNode(context.attributes.currentNode);\
        let message = description + ', ' + repeatWelcomeMessage;\
\
        context.response.speak(message).listen(message);\
    \},\
\
    // logic to provide the responses to the yes or no responses to the main questions\
    yesOrNo: function (context, reply) \{\
\
        // this is a question node so we need to see if the user picked yes or no\
        let nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);\
\
        // error in node data\
        if (nextNodeId == -1)\
        \{\
            context.handler.state = states.STARTMODE;\
\
            // the current node was not found in the nodes array\
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist\
            context.response.speak(nodeNotFoundMessage);\
        \}\
\
        // get the speech for the child node\
        let message = helper.getSpeechForNode(nextNodeId);\
\
        // have we made a decision\
        if (helper.isAnswerNode(nextNodeId) === true) \{\
\
            // set the game state to description mode\
            context.handler.state = states.DESCRIPTIONMODE;\
\
            // append the play again prompt to the decision and speak it\
            message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;\
        \}\
\
        // set the current node to next node we want to go to\
        context.attributes.currentNode = nextNodeId;\
\
        context.response.speak(message).listen(message);\
    \},\
\
    // gets the description for the given node id\
    getDescriptionForNode: function (nodeId) \{\
\
        for (let i = 0; i < nodes.length; i++) \{\
            if (nodes[i].node == nodeId) \{\
                return nodes[i].description;\
            \}\
        \}\
        return descriptionNotFoundMessage + nodeId;\
    \},\
\
    // returns the speech for the provided node id\
    getSpeechForNode: function (nodeId) \{\
\
        for (let i = 0; i < nodes.length; i++) \{\
            if (nodes[i].node == nodeId) \{\
                return nodes[i].message;\
            \}\
        \}\
        return speechNotFoundMessage + nodeId;\
    \},\
\
    // checks to see if this node is an choice node or a decision node\
    isAnswerNode: function (nodeId) \{\
\
        for (let i = 0; i < nodes.length; i++) \{\
            if (nodes[i].node == nodeId) \{\
                if (nodes[i].yes === 0 && nodes[i].no === 0) \{\
                    return true;\
                \}\
            \}\
        \}\
        return false;\
    \},\
\
    // gets the next node to traverse to based on the yes no response\
    getNextNode: function (nodeId, yesNo) \{\
        for (let i = 0; i < nodes.length; i++) \{\
            if (nodes[i].node == nodeId) \{\
                if (yesNo == "yes") \{\
                    return nodes[i].yes;\
                \}\
                return nodes[i].no;\
            \}\
        \}\
        // error condition, didnt find a matching node id. Cause will be a yes / no entry in the array but with no corrosponding array entry\
        return -1;\
    \},\
\
    // Recursively walks the node tree looking for nodes already visited\
    // This method could be changed if you want to implement another type of checking mechanism\
    // This should be run on debug builds only not production\
    // returns false if node tree path does not contain any previously visited nodes, true if it finds one\
    debugFunction_walkNode: function (nodeId) \{\
\
        // console.log("Walking node: " + nodeId);\
\
        if( helper.isAnswerNode(nodeId) === true) \{\
            // found an answer node - this path to this node does not contain a previously visted node\
            // so we will return without recursing further\
\
            // console.log("Answer node found");\
             return false;\
        \}\
\
        // mark this question node as visited\
        if( helper.debugFunction_AddToVisited(nodeId) === false)\
        \{\
            // node was not added to the visited list as it already exists, this indicates a duplicate path in the tree\
            return true;\
        \}\
\
        // console.log("Recursing yes path");\
        let yesNode = helper.getNextNode(nodeId, "yes");\
        let duplicatePathHit = helper.debugFunction_walkNode(yesNode);\
\
        if( duplicatePathHit === true)\{\
            return true;\
        \}\
\
        // console.log("Recursing no");\
        let noNode = helper.getNextNode(nodeId, "no");\
        duplicatePathHit = helper.debugFunction_walkNode(noNode);\
\
        if( duplicatePathHit === true)\{\
            return true;\
        \}\
\
        // the paths below this node returned no duplicates\
        return false;\
    \},\
\
    // checks to see if this node has previously been visited\
    // if it has it will be set to 1 in the array and we return false (exists)\
    // if it hasnt we set it to 1 and return true (added)\
    debugFunction_AddToVisited: function (nodeId) \{\
\
        if (visited[nodeId] === 1) \{\
            // node previously added - duplicate exists\
            // console.log("Node was previously visited - duplicate detected");\
            return false;\
        \}\
\
        // was not found so add it as a visited node\
        visited[nodeId] = 1;\
        return true;\
    \}\
\};}