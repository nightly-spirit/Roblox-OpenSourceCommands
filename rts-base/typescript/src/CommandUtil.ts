import { Settings } from "./SysSettings";

const Workspace = game.Workspace;
const Players = game.GetService("Players");
const HttpService = game.GetService("HttpService");

export class CommandUtil {
    constructor() {}
    
    CheckIfMessageIsCommandAsync(String: string) {
        if (String.sub(0, 1) === Settings.CommandSettings.Prefix) {
            return true;
        } else {
            return false;
        }
    }

    PostFromWebhookAsync(Type: string, Arguments: Array<string>) {
        if (Type.lower() === "message") {
            // make sure Arguments[0] exists!

            let Message: string | undefined = undefined;

            try {
                Message = Arguments[0]
            } catch(ex) {
                error(ex);
            }

            if (Message === undefined) {
                return 1;
            } else {
                const PostData = {
                    Content: Message
                };

                const Encoded = HttpService.JSONEncode(PostData);
                
                // Sends the message basically

                HttpService.PostAsync(Settings.Data.WebhookURL, Encoded);
            }
        } /* else if (Type.lower() == "embed") {
            // Strictly check if arguments exist and have the right amounts and values to then send the embed
            // Actually work on this lol
        } */
    }

    protected CheckIfPlayerFromStringExists (Name: string) { // Temporarily not used
        let Reciever: string | undefined = undefined;

        Players.GetPlayers().forEach(function(Player, i) {
            if (Player.Name.find(Name) || Player.DisplayName.find(Name)) {
                Reciever = Player.Name;
            }
        });

        return Reciever
    }

    protected CheckIfCharacterWithNameExists(Name: string) { // Temporarily not used
        const ExpectedCharacter: Instance | undefined = Workspace.FindFirstChild(Name);

        if (Players.GetPlayerFromCharacter(ExpectedCharacter) !== undefined) {
            const Player: Player | undefined = Players.GetPlayerFromCharacter(ExpectedCharacter);

            return Player?.Character
        }
    }

    protected DoesCommandArgumentExist(Index: number, Arguments: Array<string>) { // Temporarily not used
        if (Arguments[Index] !== "" && Arguments[Index] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    

    FindStringInCommandArgument(t: Array<string>, i: number, String: string) {
        let Result: LuaTuple<[number, number, ...(string | number)[]] | undefined[]>

        try {
            Result = t[i].find(String);
        } catch(e) {
            error(e);
            return 1;
        }

        if (Result !== undefined) {
            return true;
        } else {
            return false;
        }
    }
}
