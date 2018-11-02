import {BotFrameworkAdapter, ConversationState, TurnContext, Storage} from "botbuilder";
import {Request, Response} from "restify";

export class BotAdapter {
    private readonly adapter: BotFrameworkAdapter;
    private readonly conversationState: ConversationState;

    constructor(conversationState: ConversationState) {
        this.adapter = new BotFrameworkAdapter({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword
        });

        this.adapter.onTurnError = this.onError;

        this.conversationState = conversationState;
    }

    private async onError(turnContext: TurnContext, error: Error) {
        //log error
        console.error(`\n [onTurnError]: ${ error }`);
        // send error message to user
        await turnContext.sendActivity(`Oops. Something went wrong!`);
        // clear out state and save changes
        await this.conversationState.clear(turnContext);
        await this.conversationState.saveChanges(turnContext);
    }

//     async processActivity(
//         req: Request,
//         res: Response,
//         callback: (context: TurnContext) => Promise<any>): Promise<void>) {
//
// }

}