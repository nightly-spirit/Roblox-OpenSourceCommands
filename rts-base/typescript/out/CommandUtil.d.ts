/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/types" />
export declare class CommandUtil {
    constructor();
    CheckIfMessageIsCommandAsync(String: string): boolean;
    PostFromWebhookAsync(Type: string, Arguments: Array<string>): 1 | undefined;
    protected CheckIfPlayerFromStringExists(Name: string): undefined;
    protected CheckIfCharacterWithNameExists(Name: string): Model | undefined;
    protected DoesCommandArgumentExist(Index: number, Arguments: Array<string>): boolean;
    FindStringInCommandArgument(t: Array<string>, i: number, String: string): boolean | undefined;
}
