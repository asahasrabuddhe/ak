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
const botbuilder_1 = require("botbuilder");
const moment = __importStar(require("moment-timezone"));
const USERNAME = 'username';
class Akbot {
    /**
     *
     * @param conversationState
     */
    constructor(conversationState) {
        this.userNameAccessor = conversationState.createProperty(USERNAME);
        this.conversationState = conversationState;
        this.loop = true;
    }
    onTurn(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Do something with this incoming activity!
            if (turnContext.activity.type === botbuilder_1.ActivityTypes.Message) {
                // Get the user's text
                const utterance = turnContext.activity.text;
                switch (utterance) {
                    case 'thamb':
                    case 'tham':
                        this.loop = false;
                        break;
                    case 'kha':
                    case 'khao':
                        this.loop = true;
                        yield turnContext.sendActivity(`${Akbot.greeter()} ${turnContext.activity.from.name}!`);
                        yield this.chabaao(turnContext);
                        break;
                    default:
                        yield turnContext.sendActivity(`You said ${utterance}`);
                }
            }
        });
    }
    chabaao(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.loop) {
                let d = moment.tz('Asia/Kolkata');
                let dialogs = [
                    `Have you updated the work log?`,
                    `What is the status?`,
                    `${turnContext.activity.from.name}, please come to MR${Akbot.getRandomInt(1, 4)} for scrum`,
                    `Hi team, let's meet in MR${Akbot.getRandomInt(1, 4)} for a discussion with ajitem`,
                    `${turnContext.activity.from.name}, we can sit at ${d.format('hh:kk')} for the same`
                ];
                yield turnContext.sendActivity(dialogs[Akbot.getRandomInt(0, dialogs.length)]);
                yield this.sleep(Akbot.getRandomInt(10000, 1000000));
            }
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static greeter() {
        let d = moment.tz('Asia/Kolkata');
        let t = parseInt(d.format('HH'), 10);
        if (t < 12)
            return 'Good Morning';
        else if (t < 17)
            return 'Good Afternoon';
        else
            return 'Good Evening';
    }
}
exports.Akbot = Akbot;
