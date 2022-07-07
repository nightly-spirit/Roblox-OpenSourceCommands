// This is a special .ts file to be compiled under the game compilation type. Client.ts in Client, Server.ts in Server, and Command and its submodules in shared!!!

const Players = game.GetService("Players");
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const StarterGUI = game.GetService("StarterGui");

// Moderation Remotes. The only functional one is MuteCRemote, the instanced rest are for UI displaying or other purposes.
// MuteCRemote may seem unsafe but it's not. When disabling the chat, if an exploiter is able to enable the chat, they will be kicked once they chat again since their name
// is saved in a list.
// !! I suggest you move shared > Command and its submodules in Server for protection, and also make sure the submodules are nested in the Server.ts script

const MuteCRemote: Instance | RemoteEvent | undefined = ReplicatedStorage.WaitForChild("MuteClientRemote");

if (MuteCRemote.IsA("RemoteEvent")) { // isn't in use!! Just code on hold for next big updates.
    MuteCRemote.OnClientEvent.Connect((ChatUIStatus: boolean) => {
        if (ChatUIStatus === true) {
            StarterGUI.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, true);
        } else {
            StarterGUI.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
        }
    });
}