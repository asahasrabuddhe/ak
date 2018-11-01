import * as restify from 'restify';
import {ActivityTypes, BotFrameworkAdapter, TurnContext} from 'botbuilder';

let loop = true;
// Create bot adapter, which defines how the bot sends and receives messages.
let adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

let dialogs = [
  'Did you updated the work log?',
  'What is the status?',
];

// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming requests at /api/messages.
server.post('/api/messages', async (req, res) => {
    // Use the adapter to process the incoming web request into a TurnContext object.
    await adapter.processActivity(req, res, async (turnContext: TurnContext) => {
        if (turnContext.activity.type === ActivityTypes.ConversationUpdate &&
            turnContext.activity.membersAdded !== undefined &&
            turnContext.activity.membersAdded[0].name === 'Bot') {
            await turnContext.sendActivity(`Did you updated the work log?`);
            await chabaao(turnContext)
        }

        // Do something with this incoming activity!
        if (turnContext.activity.type === ActivityTypes.Message) {
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
                    await chabaao(turnContext);
                    break;
                default:
                    await turnContext.sendActivity(`You said ${utterance}`)
            }
        }
    });
});

async function chabaao(turnContext: TurnContext) {
    while (loop) {
        await turnContext.sendActivity(`Did you updated the work log?`);
        let n = getRandomInt(1000000);
        console.log(`Sleep for ${n}`);
        await sleep(getRandomInt(n));
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}
