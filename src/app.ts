import * as restify from 'restify';
import {ActivityTypes, BotFrameworkAdapter, TurnContext} from 'botbuilder';

let loop = true;
// Create bot adapter, which defines how the bot sends and receives messages.
let adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

let name: string, greeting: string, time: string;
let num: number;

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

            name = turnContext.activity.from.name;
            greeting = greeter();
            await turnContext.sendActivity(`${greeting} ${name}!`);

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

                    name = turnContext.activity.recipient.name;
                    greeting = greeter();
                    await turnContext.sendActivity(`${greeting} ${name}!`);

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

        await turnContext.sendActivity(dialogs[index]);

        let n = getRandomInt(1000000);

        console.log(`Sleep for ${n}`);
        await sleep(getRandomInt(n));

        dialogs = [];
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max: number) {
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