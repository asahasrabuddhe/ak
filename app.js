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
const akbot_1 = require("./akbot");
// Create bot adapter, which defines how the bot sends and receives messages.
let adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
// Define a state store for your bot.
// A bot requires a state store to persist the dialog and user state between messages.
let conversationState;
// Catch-all for any unhandled errors in your bot.
adapter.onTurnError = (turnContext, error) => __awaiter(this, void 0, void 0, function* () {
    // This check writes out errors to console log .vs. app insights.
    console.error(`\n [onTurnError]: ${error}`);
    // Send a message to the user.
    yield turnContext.sendActivity(`Oops. Something went wrong!`);
    // Clear out state and save changes so the user is not stuck in a bad state.
    yield conversationState.clear(turnContext);
    yield conversationState.saveChanges(turnContext);
});
// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new botbuilder_1.MemoryStorage();
conversationState = new botbuilder_1.ConversationState(memoryStorage);
const bot = new akbot_1.Akbot(conversationState);
// Create HTTP server.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});
// Listen for incoming requests at /api/messages.
server.post('/api/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Use the adapter to process the incoming web request into a TurnContext object.
    yield adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {
        yield bot.onTurn(turnContext);
    }));
}));
