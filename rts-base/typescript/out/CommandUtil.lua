-- Compiled with roblox-ts v1.3.3
local TS = _G[script]
local Settings = TS.import(script, script.Parent, "SysSettings").Settings
local Workspace = game.Workspace
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local CommandUtil
do
	CommandUtil = setmetatable({}, {
		__tostring = function()
			return "CommandUtil"
		end,
	})
	CommandUtil.__index = CommandUtil
	function CommandUtil.new(...)
		local self = setmetatable({}, CommandUtil)
		return self:constructor(...) or self
	end
	function CommandUtil:constructor()
	end
	function CommandUtil:CheckIfMessageIsCommandAsync(String)
		if string.sub(String, 0, 1) == Settings.CommandSettings.Prefix then
			return true
		else
			return false
		end
	end
	function CommandUtil:PostFromWebhookAsync(Type, Arguments)
		if string.lower(Type) == "message" then
			-- make sure Arguments[0] exists!
			local Message = nil
			TS.try(function()
				Message = Arguments[1]
			end, function(ex)
				error(ex)
			end)
			if Message == nil then
				return 1
			else
				local PostData = {
					Content = Message,
				}
				local Encoded = HttpService:JSONEncode(PostData)
				-- Sends the message basically
				HttpService:PostAsync(Settings.Data.WebhookURL, Encoded)
			end
		end
	end
	function CommandUtil:CheckIfPlayerFromStringExists(Name)
		local Reciever = nil
		local _exp = Players:GetPlayers()
		local _arg0 = function(Player, i)
			if { string.find(Player.Name, Name) } or { string.find(Player.DisplayName, Name) } then
				Reciever = Player.Name
			end
		end
		for _k, _v in ipairs(_exp) do
			_arg0(_v, _k - 1, _exp)
		end
		return Reciever
	end
	function CommandUtil:CheckIfCharacterWithNameExists(Name)
		local ExpectedCharacter = Workspace:FindFirstChild(Name)
		if Players:GetPlayerFromCharacter(ExpectedCharacter) ~= nil then
			local Player = Players:GetPlayerFromCharacter(ExpectedCharacter)
			local _result = Player
			if _result ~= nil then
				_result = _result.Character
			end
			return _result
		end
	end
	function CommandUtil:DoesCommandArgumentExist(Index, Arguments)
		if Arguments[Index + 1] ~= "" and Arguments[Index + 1] ~= nil then
			return true
		else
			return false
		end
	end
	function CommandUtil:FindStringInCommandArgument(t, i, String)
		local Result = nil
		local _arg0 = function()
			Result = { string.find(t[i + 1], String) }
		end
		local _success, _valueOrError = pcall(_arg0)
		local opResult = _success and {
			success = true,
			value = _valueOrError,
		} or {
			success = false,
			error = _valueOrError,
		}
		if opResult.success then
			if Result ~= {
				undefined = nil,
			} or (Result ~= nil or Result[1] ~= nil) then
				return true
			end
		else
			error(opResult.error)
			return false
		end
	end
end
return {
	CommandUtil = CommandUtil,
}
