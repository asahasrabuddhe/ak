"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = __importStar(require("restify"));
const botbuilder_1 = require("botbuilder");
let loop = true;
// Create bot adapter, which defines how the bot sends and receives messages.
let adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
let name, greeting, time;
let num;
// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});
// Listen for incoming requests at /api/messages.
server.post('/api/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Use the adapter to process the incoming web request into a TurnContext object.
    yield adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {
        if (turnContext.activity.type === botbuilder_1.ActivityTypes.ConversationUpdate &&
            turnContext.activity.membersAdded !== undefined &&
            turnContext.activity.membersAdded[0].name === 'Bot') {
            name = turnContext.activity.from.name;
            greeting = greeter();
            yield turnContext.sendActivity(`${greeting} ${name}!`);
            yield chabaao(turnContext);
        }
        // Do something with this incoming activity!
        if (turnContext.activity.type === botbuilder_1.ActivityTypes.Message) {
            // Get the user's text
            const utterance = turnContext.activity.text;
            switch (utterance) {
                case 'thamb':
                case 'tham':
                    loop = false;
                    break;
                case 'kha':
                case 'khao':
                    loop = true;
                    name = turnContext.activity.recipient.name;
                    greeting = greeter();
                    yield turnContext.sendActivity(`${greeting} ${name}!`);
                    yield chabaao(turnContext);
                    break;
                default:
                    yield turnContext.sendActivity(`You said ${utterance}`);
            }
        }
    }));
}));
function chabaao(turnContext) {
    return __awaiter(this, void 0, void 0, function* () {
        while (loop) {
            num = getRandomInt(4);
            if (num === 0) {
                num++;
            }
            let d = new Date();
            time = d.getHours() + ":" + d.getMinutes();
            let dialogs = [
                `Did you updated the work log?`,
                `What is the status?`,
                `${name}, please come to MR${num} for scrum`,
                `Hi team, let's meet in MR${num} for a discussion with ajitem`,
                `${name}, we can sit at ${time} for the same`
            ];
            let index = getRandomInt(dialogs.length);
            yield turnContext.sendActivity(dialogs[index]);
            let n = getRandomInt(1000000);
            console.log(`Sleep for ${n}`);
            yield sleep(getRandomInt(n));
            dialogs = [];
        }
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function greeter() {
    let d = new Date();
    let time = d.getHours();
    if (time < 12)
        return 'Good Morning';
    else if (time < 17)
        return 'Good Afternoon';
    else
        return 'Good Evening';
}
