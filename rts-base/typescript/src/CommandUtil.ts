import { Data } from "./SysSettings";

const Workspace = game.Workspace;
const Players = game.GetService("Players");
const HttpService = game.GetService("HttpService");

export class CommandUtil {
    constructor() {}
    
    CheckIfMessageIsCommandAsync(String: string) {
        if (String.sub(0, 1) == Data.CommandSettings.Prefix) {
            return true;
        } else {
            return false;S
        }
    }

    protected CheckIfPlayerFromStringExists (Name: string) { // Temporarily not used
        let Reciever: string | null = null;

        Players.GetPlayers().forEach(function(Player, i) {
            if (Player.Name.find(Name) || Player.DisplayName.find(Name)) {
                Reciever = Player.Name;
            }
        });

        return Reciever
    }

    protected CheckIfCharacterWithNameExists(Name: string) { // Temporarily not used
        const ExpectedCharacter: Instance | undefined = Workspace.FindFirstChild(Name);

        if (Players.GetPlayerFromCharacter(ExpectedCharacter) != null) {
            const Player: Player | undefined = Players.GetPlayerFromCharacter(ExpectedCharacter);

            return Player?.Character
        }
    }

    protected DoesCommandArgumentExist(Index: number, Arguments: Array<string>) { // Temporarily not used
        if (Arguments[Index] != "" && Arguments[Index] != null) {
            return true;
        } else {
            return false;
        }
    }
}
