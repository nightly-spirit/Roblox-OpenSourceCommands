import { CheckIfMessageIsCommandAsync } from "./modules/CommandUtil";

const Chat = game.GetService("Chat");
const Players = game.GetService("Players");
const Workspace = game.GetService("Workspace");

const ReloadCharacter_SeparateThread = coroutine.create((Player: Player) => {
    task.wait(4);

    Player.LoadCharacter();
});

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
                } else if (Arguments[1].find("smoke")) {
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
                                var Smokes = new Array<Smoke>();

                                if (v.IsA("Smoke")) {
                                    Found = true;

                                    Smokes.insert(Smokes.size(), v);
                                }

                                if (Found == false) {
                                    const ThisSmoke = new Instance("Smoke");

                                    ThisSmoke.Parent = HumanoidRootPart;
                                } else {
                                    Smokes.forEach(function(c, _) {
                                        c.Destroy();
                                    });
                                }
                            });
                        }
                    }
                } else if (Arguments[1].find("glitter")) {
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
                                var Sparkles = new Array<Sparkles>();

                                if (v.IsA("Sparkles")) {
                                    Found = true;

                                    Sparkles.insert(Sparkles.size(), v);
                                }

                                if (Found == false) {
                                    const ThisSparkle = new Instance("Sparkles");

                                    ThisSparkle.Parent = HumanoidRootPart;
                                } else {
                                    Sparkles.forEach(function(c, _) {
                                        c.Destroy();
                                    });
                                }
                            });
                        }
                    }
                } else if (Arguments[1].find("fling")) {
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

                            const Force = new Instance("BodyForce");

                            Force.Force = new Vector3(100, 9999, 100); // col fore lolol
                            Force.Parent = HumanoidRootPart;

                            // Reloads the Player in a separate thread due to this function being paused when using task.wait()

                            coroutine.resume(ReloadCharacter_SeparateThread, Players.GetPlayerFromCharacter(Character));
                        }
                    }
                } else if (Arguments[1].find("explode")) {
                    if (Arguments[2] != null && Arguments[2] != "") {
                        let Reciever: string | null = null;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever != null) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | BasePart | undefined = Character?.FindFirstChild("HumanoidRootPart");
                            let Pos: Vector3 | undefined;

                            if (HumanoidRootPart?.IsA("BasePart")) {
                                Pos = HumanoidRootPart.Position;
                            }

                            if (type(Pos) == "vector") {
                                const Exp = new Instance("Explosion");

                                Exp.Position = new Vector3(Pos?.X, Pos?.Y, Pos?.Z);
                                Exp.Parent = HumanoidRootPart;
                            }
                        }
                    }
                }
            } else {
                return;
            }
        }
    }
}