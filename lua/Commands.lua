local CommandUtil = require(script.CommandUtil)

local CommandWorker = {}

CommandWorker.__index = CommandWorker

local Chat, Players, Workspace = game:GetService("Chat"), game.Players, workspace

function CommandWorker.new(Player: Player, Message: string)
    local ThisWorker = {}

    setmetatable(ThisWorker, CommandWorker)

    ThisWorker.Player = Player
    ThisWorker.Message = Message

    return ThisWorker
end

function CommandWorker:HandleCommand()
    local Isolated = string.sub(self.Message, 2, self.Message.len())
    local Arguments = Isolated:split(" ")

    -- Should change :find(string) to equals

    if Arguments[1] ~= nil then
        if Arguments[1]:find("log") then
            if Arguments[2] ~= nil and Arguments[2] ~= "" then
                print(Arguments[2])
            end
        elseif Arguments[1]:find("barbecue") then
            if Arguments[2] ~= nil and Arguments[2] ~= "" then
                local Reciever: string | nil = nil

                for i, v in pairs(game.Players:GetPlayers()) do
                    if v.Name:find(Arguments[2]) or v.DisplayName:find(Arguments[2]) then
                        Reciever = v.Name
                    end
                end

                if Reciever ~= nil then
                    -- Infer them types for comfort please

                    local Character: Instance = Workspace:FindFirstChild(Reciever)
                    local HumanoidRootPart: Instance = Character:FindFirstChild("HumanoidRootPart")

                    for i, v in pairs(HumanoidRootPart:GetChildren()) do
                        local Found: boolean, Fires: Array<Fire> = false, {}
                        
                        if v:IsA("Fire") then
                            Found = true

                            table.insert(Fires, v)
                        end

                        if Found == false then
                            local ThisFire = Instance.new("Fire")

                            ThisFire.Parent = HumanoidRootPart
                        else
                            for _, c in pairs(Fires) do
                                c:Destroy()
                            end
                        end
                    end
                end
            end
        end
    end
end

return CommandWorker