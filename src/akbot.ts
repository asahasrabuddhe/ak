import {ConversationState, StatePropertyAccessor, TurnContext, ActivityTypes} from 'botbuilder';
import * as moment from "moment-timezone";

const USERNAME = 'username';

export class Akbot {
    private readonly userNameAccessor: StatePropertyAccessor<number>;
    private readonly conversationState: ConversationState;
    private loop: boolean;

    /**
     *
     * @param conversationState
     */
    constructor(conversationState: ConversationState) {
        this.userNameAccessor = conversationState.createProperty(USERNAME);
        this.conversationState = conversationState;
        this.loop = true;
    }

    async onTurn(turnContext: TurnContext) {
        // Do something with this incoming activity!
        if (turnContext.activity.type === ActivityTypes.Message) {
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

                    await turnContext.sendActivity(`${Akbot.greeter()} ${turnContext.activity.from.name}!`);

                    await this.chabaao(turnContext);
                    break;
                default:
                    await turnContext.sendActivity(`You said ${utterance}`)
            }
        }
    }

    private async chabaao(turnContext: TurnContext) {
        while (this.loop) {
            let d = moment.tz('Asia/Kolkata');

            let dialogs = [
                `Have you updated the work log?`,
                `What is the status?`,
                `${turnContext.activity.from.name}, please come to MR${Akbot.getRandomInt(1, 4)} for scrum`,
                `Hi team, let's meet in MR${Akbot.getRandomInt(1, 4)} for a discussion with ajitem`,
                `${turnContext.activity.from.name}, we can sit at ${d.format('hh:kk')} for the same`
            ];

            await turnContext.sendActivity(dialogs[Akbot.getRandomInt(0, dialogs.length)]);
            await this.sleep(Akbot.getRandomInt(10000, 1000000));
        }
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static greeter() {
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