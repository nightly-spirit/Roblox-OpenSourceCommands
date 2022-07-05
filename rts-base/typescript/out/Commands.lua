-- Compiled with roblox-ts v1.3.3
local TS = _G[script]
local CommandUtil = TS.import(script, script.Parent, "CommandUtil").CommandUtil
local Settings = TS.import(script, script.Parent, "SysSettings").Settings
local Chat = game:GetService("Chat")
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local DataStoreService = game:GetService("DataStoreService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ReloadCharacter_SeparateThread = coroutine.create(function(Player)
	task.wait(4)
	Player:LoadCharacter()
end)
local CurrentUtils = CommandUtil.new()
-- TODO actually work on the Client Remote Listener
local CommandWorker
do
	CommandWorker = setmetatable({}, {
		__tostring = function()
			return "CommandWorker"
		end,
	})
	CommandWorker.__index = CommandWorker
	function CommandWorker.new(...)
		local self = setmetatable({}, CommandWorker)
		return self:constructor(...) or self
	end
	function CommandWorker:constructor(Player, Message)
		self.LastCommand = ""
		self.Player = Player
		self.Message = Message
		local NewMuteClientRemote = Instance.new("RemoteEvent")
		NewMuteClientRemote.Name = "MuteClientRemote"
		NewMuteClientRemote.Parent = ReplicatedStorage
		self.MuteClient = NewMuteClientRemote
	end
	function CommandWorker:HandleCommand()
		if CurrentUtils:CheckIfMessageIsCommandAsync(self.Message) == true then
			local Isolated = string.sub(self.Message, 2, #self.Message)
			local Arguments = string.split(Isolated, " ")
			-- Arguments[3] usually holds text that needs to be concatenated
			-- Should change :find(string) to equals
			if Arguments[2] ~= nil then
				if CurrentUtils:FindStringInCommandArgument(Arguments, 1, "log") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						-- Use Chat for Broadcast Filtering
						print(Arguments[3])
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "barbecue") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						local Reciever = nil
						local _exp = Players:GetPlayers()
						local _arg0 = function(Player, i)
							local _name = Player.Name
							local _arg0_1 = Arguments[3]
							local _condition = { string.find(_name, _arg0_1) }
							if not _condition then
								local _displayName = Player.DisplayName
								local _arg0_2 = Arguments[3]
								_condition = { string.find(_displayName, _arg0_2) }
							end
							if _condition then
								Reciever = Player.Name
							end
						end
						for _k, _v in ipairs(_exp) do
							_arg0(_v, _k - 1, _exp)
						end
						if Reciever ~= nil then
							local Character = Workspace:FindFirstChild(Reciever)
							local _HumanoidRootPart = Character
							if _HumanoidRootPart ~= nil then
								_HumanoidRootPart = _HumanoidRootPart:FindFirstChild("HumanoidRootPart")
							end
							local HumanoidRootPart = _HumanoidRootPart
							local _result = HumanoidRootPart
							if _result ~= nil then
								local _exp_1 = _result:GetChildren()
								local _arg0_1 = function(v, i)
									local Found = false
									local Fires = {}
									if v:IsA("Fire") then
										Found = true
										local _fires = Fires
										local _arg0_2 = #Fires
										table.insert(_fires, _arg0_2 + 1, v)
									end
									if Found == false then
										local ThisFire = Instance.new("Fire")
										ThisFire.Parent = HumanoidRootPart
									else
										local _fires = Fires
										local _arg0_2 = function(c, _)
											c:Destroy()
										end
										for _k, _v in ipairs(_fires) do
											_arg0_2(_v, _k - 1, _fires)
										end
									end
								end
								for _k, _v in ipairs(_exp_1) do
									_arg0_1(_v, _k - 1, _exp_1)
								end
							end
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "smoke") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						local Reciever = nil
						local _exp = Players:GetPlayers()
						local _arg0 = function(Player, i)
							local _name = Player.Name
							local _arg0_1 = Arguments[3]
							local _condition = { string.find(_name, _arg0_1) }
							if not _condition then
								local _displayName = Player.DisplayName
								local _arg0_2 = Arguments[3]
								_condition = { string.find(_displayName, _arg0_2) }
							end
							if _condition then
								Reciever = Player.Name
							end
						end
						for _k, _v in ipairs(_exp) do
							_arg0(_v, _k - 1, _exp)
						end
						if Reciever ~= nil then
							local Character = Workspace:FindFirstChild(Reciever)
							local _HumanoidRootPart = Character
							if _HumanoidRootPart ~= nil then
								_HumanoidRootPart = _HumanoidRootPart:FindFirstChild("HumanoidRootPart")
							end
							local HumanoidRootPart = _HumanoidRootPart
							local _result = HumanoidRootPart
							if _result ~= nil then
								local _exp_1 = _result:GetChildren()
								local _arg0_1 = function(v, i)
									local Found = false
									local Smokes = {}
									if v:IsA("Smoke") then
										Found = true
										local _smokes = Smokes
										local _arg0_2 = #Smokes
										table.insert(_smokes, _arg0_2 + 1, v)
									end
									if Found == false then
										local ThisSmoke = Instance.new("Smoke")
										ThisSmoke.Parent = HumanoidRootPart
									else
										local _smokes = Smokes
										local _arg0_2 = function(c, _)
											c:Destroy()
										end
										for _k, _v in ipairs(_smokes) do
											_arg0_2(_v, _k - 1, _smokes)
										end
									end
								end
								for _k, _v in ipairs(_exp_1) do
									_arg0_1(_v, _k - 1, _exp_1)
								end
							end
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "glitter") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						local Reciever = nil
						local _exp = Players:GetPlayers()
						local _arg0 = function(Player, i)
							local _name = Player.Name
							local _arg0_1 = Arguments[3]
							local _condition = { string.find(_name, _arg0_1) }
							if not _condition then
								local _displayName = Player.DisplayName
								local _arg0_2 = Arguments[3]
								_condition = { string.find(_displayName, _arg0_2) }
							end
							if _condition then
								Reciever = Player.Name
							end
						end
						for _k, _v in ipairs(_exp) do
							_arg0(_v, _k - 1, _exp)
						end
						if Reciever ~= nil then
							local Character = Workspace:FindFirstChild(Reciever)
							local _HumanoidRootPart = Character
							if _HumanoidRootPart ~= nil then
								_HumanoidRootPart = _HumanoidRootPart:FindFirstChild("HumanoidRootPart")
							end
							local HumanoidRootPart = _HumanoidRootPart
							local _result = HumanoidRootPart
							if _result ~= nil then
								local _exp_1 = _result:GetChildren()
								local _arg0_1 = function(v, i)
									local Found = false
									local Sparkles = {}
									if v:IsA("Sparkles") then
										Found = true
										local _sparkles = Sparkles
										local _arg0_2 = #Sparkles
										table.insert(_sparkles, _arg0_2 + 1, v)
									end
									if Found == false then
										local ThisSparkle = Instance.new("Sparkles")
										ThisSparkle.Parent = HumanoidRootPart
									else
										local _sparkles = Sparkles
										local _arg0_2 = function(c, _)
											c:Destroy()
										end
										for _k, _v in ipairs(_sparkles) do
											_arg0_2(_v, _k - 1, _sparkles)
										end
									end
								end
								for _k, _v in ipairs(_exp_1) do
									_arg0_1(_v, _k - 1, _exp_1)
								end
							end
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "fling") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						local Reciever = nil
						local _exp = Players:GetPlayers()
						local _arg0 = function(Player, i)
							local _name = Player.Name
							local _arg0_1 = Arguments[3]
							local _condition = { string.find(_name, _arg0_1) }
							if not _condition then
								local _displayName = Player.DisplayName
								local _arg0_2 = Arguments[3]
								_condition = { string.find(_displayName, _arg0_2) }
							end
							if _condition then
								Reciever = Player.Name
							end
						end
						for _k, _v in ipairs(_exp) do
							_arg0(_v, _k - 1, _exp)
						end
						if Reciever ~= nil then
							local Character = Workspace:FindFirstChild(Reciever)
							local _HumanoidRootPart = Character
							if _HumanoidRootPart ~= nil then
								_HumanoidRootPart = _HumanoidRootPart:FindFirstChild("HumanoidRootPart")
							end
							local HumanoidRootPart = _HumanoidRootPart
							local Force = Instance.new("BodyForce")
							Force.Force = Vector3.new(100, 9999, 100)
							Force.Parent = HumanoidRootPart
							-- Reloads the Player in a separate thread due to this function being paused when using task.wait()
							coroutine.resume(ReloadCharacter_SeparateThread, (Players:GetPlayerFromCharacter(Character)))
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "explode") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						local Reciever = nil
						local _exp = Players:GetPlayers()
						local _arg0 = function(Player, i)
							local _name = Player.Name
							local _arg0_1 = Arguments[3]
							local _condition = { string.find(_name, _arg0_1) }
							if not _condition then
								local _displayName = Player.DisplayName
								local _arg0_2 = Arguments[3]
								_condition = { string.find(_displayName, _arg0_2) }
							end
							if _condition then
								Reciever = Player.Name
							end
						end
						for _k, _v in ipairs(_exp) do
							_arg0(_v, _k - 1, _exp)
						end
						if Reciever ~= nil then
							local Character = Workspace:FindFirstChild(Reciever)
							local _HumanoidRootPart = Character
							if _HumanoidRootPart ~= nil then
								_HumanoidRootPart = _HumanoidRootPart:FindFirstChild("HumanoidRootPart")
							end
							local HumanoidRootPart = _HumanoidRootPart
							local Pos
							local _result = HumanoidRootPart
							if _result ~= nil then
								_result = _result:IsA("BasePart")
							end
							if _result then
								Pos = HumanoidRootPart.Position
							end
							if type(Pos) == "vector" then
								local Exp = Instance.new("Explosion")
								local _result_1 = Pos
								if _result_1 ~= nil then
									_result_1 = _result_1.X
								end
								local _result_2 = Pos
								if _result_2 ~= nil then
									_result_2 = _result_2.Y
								end
								local _result_3 = Pos
								if _result_3 ~= nil then
									_result_3 = _result_3.Z
								end
								Exp.Position = Vector3.new(_result_1, _result_2, _result_3)
								Exp.Parent = HumanoidRootPart
							end
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "shutdown") then
					local _exp = Players:GetPlayers()
					local _arg0 = function(Player, i)
						local Date = os.date("*t", os.time())
						local _fn = Player
						local _shutdown = Settings.Messages.Shutdown
						local _name = Player.Name
						local _userId = Player.UserId
						local _hour = Date.hour
						local _min = Date.min
						local _day = Date.day
						local _month = Date.month
						local _year = Date.year
						_fn:Kick(string.format(_shutdown, _name, _userId, _hour, _min, _day, _month, _year))
					end
					for _k, _v in ipairs(_exp) do
						_arg0(_v, _k - 1, _exp)
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "walkspeed") or CurrentUtils:FindStringInCommandArgument(Arguments, 1, "ws") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						if string.lower(Arguments[3]) == "me" or string.lower(Arguments[3]) == "myself" then
							local Character = self.Player.Character
							local _Humanoid = Character
							if _Humanoid ~= nil then
								_Humanoid = _Humanoid:FindFirstChild("Humanoid")
							end
							local Humanoid = _Humanoid
							if Arguments[4] ~= nil and Arguments[4] ~= "" then
								local WalkSpeed = tonumber(Arguments[4])
								if WalkSpeed ~= nil and WalkSpeed >= 0 then
									local _result = Humanoid
									if _result ~= nil then
										_result = _result:IsA("Humanoid")
									end
									if _result then
										Humanoid.WalkSpeed = WalkSpeed
									end
								end
							end
						else
							local Reciever = nil
							local _exp = Players:GetPlayers()
							local _arg0 = function(Player, i)
								local _name = Player.Name
								local _arg0_1 = Arguments[3]
								local _condition = { string.find(_name, _arg0_1) }
								if not _condition then
									local _displayName = Player.DisplayName
									local _arg0_2 = Arguments[3]
									_condition = { string.find(_displayName, _arg0_2) }
								end
								if _condition then
									Reciever = Player.Name
								end
							end
							for _k, _v in ipairs(_exp) do
								_arg0(_v, _k - 1, _exp)
							end
							if Reciever ~= nil then
								local Character = Workspace:FindFirstChild(Reciever)
								local _Humanoid = Character
								if _Humanoid ~= nil then
									_Humanoid = _Humanoid:FindFirstChild("Humanoid")
								end
								local Humanoid = _Humanoid
								if Arguments[4] ~= nil and Arguments[4] ~= "" then
									local WalkSpeed = tonumber(Arguments[4])
									if WalkSpeed ~= nil and WalkSpeed >= 0 then
										local _result = Humanoid
										if _result ~= nil then
											_result = _result:IsA("Humanoid")
										end
										if _result then
											Humanoid.WalkSpeed = WalkSpeed
										end
									end
								end
							end
						end
					end
				elseif CurrentUtils:FindStringInCommandArgument(Arguments, 1, "jumppower") or CurrentUtils:FindStringInCommandArgument(Arguments, 1, "jp") then
					if Arguments[3] ~= nil and Arguments[3] ~= "" then
						if string.lower(Arguments[3]) == "me" or string.lower(Arguments[3]) == "myself" then
							local Character = self.Player.Character
							local _Humanoid = Character
							if _Humanoid ~= nil then
								_Humanoid = _Humanoid:FindFirstChild("Humanoid")
							end
							local Humanoid = _Humanoid
							if Arguments[4] ~= nil and Arguments[4] ~= "" then
								local JumpPower = tonumber(Arguments[4])
								if JumpPower ~= nil and JumpPower >= 0 then
									local _result = Humanoid
									if _result ~= nil then
										_result = _result:IsA("Humanoid")
									end
									if _result then
										Humanoid.JumpPower = JumpPower
									end
								end
							end
						else
							local Reciever = nil
							local _exp = Players:GetPlayers()
							local _arg0 = function(Player, i)
								local _name = Player.Name
								local _arg0_1 = Arguments[3]
								local _condition = { string.find(_name, _arg0_1) }
								if not _condition then
									local _displayName = Player.DisplayName
									local _arg0_2 = Arguments[3]
									_condition = { string.find(_displayName, _arg0_2) }
								end
								if _condition then
									Reciever = Player.Name
								end
							end
							for _k, _v in ipairs(_exp) do
								_arg0(_v, _k - 1, _exp)
							end
							if Reciever ~= nil then
								local Character = Workspace:FindFirstChild(Reciever)
								local _Humanoid = Character
								if _Humanoid ~= nil then
									_Humanoid = _Humanoid:FindFirstChild("Humanoid")
								end
								local Humanoid = _Humanoid
								if Arguments[4] ~= nil and Arguments[4] ~= "" then
									local JumpPower = tonumber(Arguments[4])
									if JumpPower ~= nil and JumpPower >= 0 then
										local _result = Humanoid
										if _result ~= nil then
											_result = _result:IsA("Humanoid")
										end
										if _result then
											Humanoid.JumpPower = JumpPower
										end
									end
								end
							end
						end
					end
				end
			else
				return nil
			end
		end
	end
end
return {
	CommandWorker = CommandWorker,
}
