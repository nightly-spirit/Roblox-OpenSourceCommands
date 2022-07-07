// This is a special .ts file to be compiled under the game compilation type. Client.ts in Client, Server.ts in Server, and Command and its submodules in shared!!!

import { CommandWorker, CommandResponseBody } from "../src/Commands"; // change location pls
import { Settings } from "../src/SysSettings";
import { Defs } from "../src/Def";

const Players = game.GetService("Players");

// For bans, Command updates your Datastoring method

/*

    struct BanData {
        UnbanDate: number (os.time)
        Reason: string (table concat result)
        BanDate: number (os.time)
        ModeratedBy: string (Ex. Roblox (Roblox, 1) or Nightly (nightly_spirit, 0000000000))
    }

    You select the key!!!

    DefaultKey = Player.UserId
*/

const DataStoreService = game.GetService("DataStoreService");
const DB = DataStoreService.GetDataStore(Settings.Data.DBName);

Players.PlayerAdded.Connect((Player) => {
    /* 
    let PlayerData: any | undefined = undefined;

    const CallData = opcall(() => {
        if (Settings.Data.DBAccKey !== undefined) {
            PlayerData = DB.GetAsync(Player.Name + Settings.Data.DBAccKey);
        } else {
            PlayerData = DB.GetAsync(tostring(Player.UserId));
        }
    })

    if (CallData.success) {
        if (PlayerData === undefined) {
            print("Player " + Player.Name + " - " + Player.UserId + "'s data is unavailable or doesn't exist in the current database");
        } else {

        }
    } else {
        error(CallData.error)
    }

    */

    Player.Chatted.Connect((Message) => {
        const TWorker = new CommandWorker(Player, Message);

        const Request = TWorker.HandleCommand();

        if (Request !== undefined) {
            if (Request.Status === 1) {
                error("E" + Request.Status + " - " + Request.Content);
            } else {
                print("Success! S" + Request.Status + " - " + Request.Content);
            }
        }
    })
});