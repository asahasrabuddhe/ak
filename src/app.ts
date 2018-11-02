import * as restify from 'restify';
import {BotFrameworkAdapter, TurnContext, ConversationState, MemoryStorage} from 'botbuilder';
import {Akbot} from "./akbot";

// Create bot adapter, which defines how the bot sends and receives messages.
let adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Define a state store for your bot.
// A bot requires a state store to persist the dialog and user state between messages.
let conversationState: ConversationState;
// Catch-all for any unhandled errors in your bot.
adapter.onTurnError = async (turnContext, error) => {
    // This check writes out errors to console log .vs. app insights.
    console.error(`\n [onTurnError]: ${ error }`);
    // Send a message to the user.
    await turnContext.sendActivity(`Oops. Something went wrong!`);
    // Clear out state and save changes so the user is not stuck in a bad state.
    await conversationState.clear(turnContext);
    await conversationState.saveChanges(turnContext);
};

// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new MemoryStorage();
conversationState = new ConversationState(memoryStorage);

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