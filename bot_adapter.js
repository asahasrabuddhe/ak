"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
class BotAdapter {
    constructor(conversationState) {
        this.adapter = new botbuilder_1.BotFrameworkAdapter({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword
        });
        this.adapter.onTurnError = this.onError;
        this.conversationState = conversationState;
    }
    onError(turnContext, error) {
        return __awaiter(this, void 0, void 0, function* () {
            //log error
            console.error(`\n [onTurnError]: ${error}`);
            // send error message to user
            yield turnContext.sendActivity(`Oops. Something went wrong!`);
            // clear out state and save changes
            yield this.conversationState.clear(turnContext);
            yield this.conversationState.saveChanges(turnContext);
        });
    }
}
exports.BotAdapter = BotAdapter;
