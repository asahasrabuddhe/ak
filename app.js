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
const bot_adapter_1 = require("./bot_adapter");
const memoryStorage = new botbuilder_1.MemoryStorage();
const conversationState = new botbuilder_1.ConversationState(memoryStorage);
const adapter = new bot_adapter_1.BotAdapter(conversationState);
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
