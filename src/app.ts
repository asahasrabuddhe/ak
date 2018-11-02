import * as restify from 'restify';
import {BotFrameworkAdapter, TurnContext, ConversationState, MemoryStorage} from 'botbuilder';
import {Akbot} from "./akbot";
import {BotAdapter} from "./bot_adapter";

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

const adapter = new BotAdapter(conversationState);
const bot = new Akbot(conversationState);

// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming requests at /api/messages.
server.post('/api/messages', async (req, res) => {
    // Use the adapter to process the incoming web request into a TurnContext object.
    await adapter.processActivity(req, res, async (turnContext: TurnContext) => {
        await bot.onTurn(turnContext);
    });
});