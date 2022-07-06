export const Settings = {
    CommandSettings: {
        Prefix: "/"
    },

    Messages: {
        // Must be formattable string for good measures.
        Shutdown: "",
        KickNoReason: "", // must be formattable using %s for displayname, name, userid, date
        KickReason: "" // must be formattable using %s for displayname, name, userid, date, reason
    },

    Data: {
        SendCommandInfoThroughWebhook: false, // CURRENTLY USELESS
        DBName: "UserData",
        DBAccKey: undefined, // Null === UserId else Player.Name + DBAccKey
        WebhookURL: ""
    }
}