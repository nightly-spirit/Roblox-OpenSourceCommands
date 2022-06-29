import { CheckIfMessageIsCommandAsync } from "./modules/CommandUtil";

const Chat = game.GetService("Chat");
const Players = game.GetService("Players");
const Workspace = game.GetService("Workspace");

export class CommandWorker {
    Player: Player;
    Message: string;

    constructor(Player: Player, Message: string) {
        this.Player = Player;
        this.Message = Message;
    }

    HandleCommand() {
        if (CheckIfMessageIsCommandAsync(this.Message) == true) {
            const Isolated = string.sub(this.Message, 2, this.Message.size());
            const Arguments = Isolated.split(" "); // Split into elements for easier manipulation
            
            // Arguments[3] usually holds text that needs to be concatenated

            // Should change :find(string) to equals

            if (Arguments[1] != null) {
                if (Arguments[1].find("log")) {
                    if (Arguments[2] != null && Arguments[2] != "") {
                        // Use Chat for Broadcast Filtering

                        print(Arguments[2])
                    }
                } else if (Arguments[1].find("barbecue")) {
                    if (Arguments[2] != null && Arguments[2] != "") {
                        let Reciever: string | null = null;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever != null) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | undefined = Character?.FindFirstChild("HumanoidRootPart");

                            HumanoidRootPart?.GetChildren().forEach(function(v, i) {
                                let Found: boolean = false;
                                var Fires = new Array<Fire>();

                                if (v.IsA("Fire")) {
                                    Found = true;

                                    Fires.insert(Fires.size(), v);
                                }

                                if (Found == false) {
                                    const ThisFire = new Instance("Fire");

                                    ThisFire.Parent = HumanoidRootPart;
                                } else {
                                    Fires.forEach(function(c, _) {
                                        c.Destroy();
                                    });
                                }
                            });
                        }
                    }
                }
            } else {
                return;
            }
        }
    }
}