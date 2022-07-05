/// <reference types="@rbxts/types" />
export declare class CommandWorker {
    Player: Player;
    Message: string;
    readonly LastCommand: string | null;
    MuteClient: RemoteEvent;
    constructor(Player: Player, Message: string);
    HandleCommand(): void;
}
