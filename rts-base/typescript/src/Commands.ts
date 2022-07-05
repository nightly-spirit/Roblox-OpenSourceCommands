import { CommandUtil } from "./CommandUtil";
import { Settings } from "./SysSettings";
import { Proxy } from "./Proxy";
import { BuildTitleUI } from "./UI";

const Chat = game.GetService("Chat");
const Players = game.GetService("Players");
const Workspace = game.GetService("Workspace");
const HttpService = game.GetService("HttpService");
const DataStoreService = game.GetService("DataStoreService");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

const ReloadCharacter_SeparateThread = coroutine.create((Player: Player) => {
    task.wait(4);

    Player.LoadCharacter();
});

const CurrentUtils = new CommandUtil();

 // TODO actually work on the Client Remote Listener

export class CommandWorker {
    Player: Player;
    Message: string;
    readonly LastCommand: string | null = "";

    MuteClient: RemoteEvent;

    constructor(Player: Player, Message: string) {
        this.Player = Player;
        this.Message = Message;

        const NewMuteClientRemote = new Instance("RemoteEvent");
        NewMuteClientRemote.Name = "MuteClientRemote";
        NewMuteClientRemote.Parent = ReplicatedStorage;

        this.MuteClient = NewMuteClientRemote;
    }

    /* protected ModAutomate(mtype: string, Player: Player, Arguments: Array<string>) { // disabled for now
        if (mtype == "mute") {
            this.MuteClient.FireClient(Player, 0) // 0 mute, 1 unmute
        }
    } */

    // Check if Player muted when HandleCommand called, if yes kick

    HandleCommand() {
        if (CurrentUtils.CheckIfMessageIsCommandAsync(this.Message) === true) {
            const Isolated = string.sub(this.Message, 2, this.Message.size());
            const Arguments = Isolated.split(" "); // Split into elements for easier manipulation
            
            // Arguments[3] usually holds text that needs to be concatenated

            // Should change :find(string) to equals

            if (Arguments[1] !== undefined) {
                if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "log")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        // Use Chat for Broadcast Filtering

                        print(Arguments[2])
                    }
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "barbecue")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        let Reciever: string | undefined = undefined;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever !== undefined) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | undefined = Character?.FindFirstChild("HumanoidRootPart");

                            HumanoidRootPart?.GetChildren().forEach(function(v, i) {
                                let Found: boolean = false;
                                let Fires = new Array<Fire>();

                                if (v.IsA("Fire")) {
                                    Found = true;

                                    Fires.insert(Fires.size(), v);
                                }

                                if (Found === false) {
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
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "smoke")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        let Reciever: string | undefined = undefined;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever !== undefined) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | undefined = Character?.FindFirstChild("HumanoidRootPart");

                            HumanoidRootPart?.GetChildren().forEach(function(v, i) {
                                let Found: boolean = false;
                                let Smokes = new Array<Smoke>();

                                if (v.IsA("Smoke")) {
                                    Found = true;

                                    Smokes.insert(Smokes.size(), v);
                                }

                                if (Found === false) {
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
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "glitter")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        let Reciever: string | undefined = undefined;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever !== undefined) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | undefined = Character?.FindFirstChild("HumanoidRootPart");

                            HumanoidRootPart?.GetChildren().forEach(function(v, i) {
                                let Found: boolean = false;
                                let Sparkles = new Array<Sparkles>();

                                if (v.IsA("Sparkles")) {
                                    Found = true;

                                    Sparkles.insert(Sparkles.size(), v);
                                }

                                if (Found === false) {
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
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "fling")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        let Reciever: string | undefined = undefined;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever !== undefined) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | undefined = Character?.FindFirstChild("HumanoidRootPart");

                            const Force = new Instance("BodyForce");

                            Force.Force = new Vector3(100, 9999, 100); // col fore lolol
                            Force.Parent = HumanoidRootPart;

                            // Reloads the Player in a separate thread due to this function being paused when using task.wait()

                            coroutine.resume(ReloadCharacter_SeparateThread, Players.GetPlayerFromCharacter(Character));
                        }
                    }
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "explode")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        let Reciever: string | undefined = undefined;

                        Players.GetPlayers().forEach(function(Player, i) {
                            if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                Reciever = Player.Name;
                            }
                        });

                        if (Reciever !== undefined) {
                            const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                            const HumanoidRootPart: Instance | BasePart | undefined = Character?.FindFirstChild("HumanoidRootPart");
                            let Pos: Vector3 | undefined;

                            if (HumanoidRootPart?.IsA("BasePart")) {
                                Pos = HumanoidRootPart.Position;
                            }

                            if (type(Pos) === "vector") {
                                const Exp = new Instance("Explosion");

                                Exp.Position = new Vector3(Pos?.X, Pos?.Y, Pos?.Z);
                                Exp.Parent = HumanoidRootPart;
                            }
                        }
                    }
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "shutdown")) {
                    Players.GetPlayers().forEach(function(Player, i) {
                        const Date = os.date("*t", os.time());

                        Player.Kick(Settings.Messages.Shutdown.format(Player.Name, Player.UserId, Date.hour, Date.min, Date.day, Date.month, Date.year));
                    });
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "walkspeed") || CurrentUtils.FindStringInCommandArgument(Arguments, 1, "ws")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        if (Arguments[2].lower() === "me" || Arguments[2].lower() === "myself") {
                            const Character: Instance | undefined = this.Player.Character;
                            const Humanoid: Instance | Humanoid | undefined = Character?.FindFirstChild("Humanoid");

                            if (Arguments[3] !== undefined && Arguments[3] !== "") {
                                const WalkSpeed: number | undefined = tonumber(Arguments[3]);

                                if (WalkSpeed !== undefined && WalkSpeed >= 0) {
                                    if (Humanoid?.IsA("Humanoid")) {
                                        Humanoid.WalkSpeed = WalkSpeed;
                                    }
                                }
                            }
                        } else {
                            let Reciever: string | undefined = undefined;

                            Players.GetPlayers().forEach(function(Player, i) {
                                if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                    Reciever = Player.Name;
                                }
                            });
    
                            if (Reciever !== undefined) {
                                const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                                const Humanoid: Instance | Humanoid | undefined = Character?.FindFirstChild("Humanoid");
    
                                if (Arguments[3] !== undefined && Arguments[3] !== "") {
                                    const WalkSpeed: number | undefined = tonumber(Arguments[3]);
    
                                    if (WalkSpeed !== undefined && WalkSpeed >= 0) {
                                        if (Humanoid?.IsA("Humanoid")) {
                                            Humanoid.WalkSpeed = WalkSpeed;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (CurrentUtils.FindStringInCommandArgument(Arguments, 1, "jumppower") || CurrentUtils.FindStringInCommandArgument(Arguments, 1, "jp")) {
                    if (Arguments[2] !== undefined && Arguments[2] !== "") {
                        if (Arguments[2].lower() === "me" || Arguments[2].lower() === "myself") {
                            const Character: Instance | undefined = this.Player.Character;
                            const Humanoid: Instance | Humanoid | undefined = Character?.FindFirstChild("Humanoid");

                            if (Arguments[3] !== undefined && Arguments[3] !== "") {
                                const JumpPower: number | undefined = tonumber(Arguments[3]);

                                if (JumpPower !== undefined && JumpPower >= 0) {
                                    if (Humanoid?.IsA("Humanoid")) {
                                        Humanoid.JumpPower = JumpPower;
                                    }
                                }
                            }
                        } else {
                            let Reciever: string | undefined = undefined;

                            Players.GetPlayers().forEach(function(Player, i) {
                                if (Player.Name.find(Arguments[2]) || Player.DisplayName.find(Arguments[2])) {
                                    Reciever = Player.Name;
                                }
                            });
    
                            if (Reciever !== undefined) {
                                const Character: Instance | undefined = Workspace.FindFirstChild(Reciever);
                                const Humanoid: Instance | Humanoid | undefined = Character?.FindFirstChild("Humanoid");
    
                                if (Arguments[3] !== undefined && Arguments[3] !== "") {
                                    const JumpPower: number | undefined = tonumber(Arguments[3]);
    
                                    if (JumpPower !== undefined && JumpPower >= 0) {
                                        if (Humanoid?.IsA("Humanoid")) {
                                            Humanoid.JumpPower = JumpPower;
                                        }
                                    }
                                }
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