const Workspace = game.Workspace;
const Players = game.GetService("Players");

export class CommandUtil {
    constructor() {}

    CheckIfMessageIsCommandAsync(String: string) {
        if (String.sub(0, 1) == "/") {
            return true;
        } else {
            return false;
        }
    }

    protected CheckIfCharacterWithNameExists(Name: string) { // Temporarily not used
        const ExpectedCharacter: Instance | undefined = Workspace.FindFirstChild(Name);

        if (Players.GetPlayerFromCharacter(ExpectedCharacter) != null) {
            const Player: Player | undefined = Players.GetPlayerFromCharacter(ExpectedCharacter);

            return Player?.Character
        }
    }
}
