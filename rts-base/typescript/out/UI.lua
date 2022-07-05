-- Compiled with roblox-ts v1.3.3
local TS = _G[script]
-- Early implementation, may not work since I never worked with Roact :(
-- This would be better if I compiled the package to game type and made this script in the Client but eh.
-- Still needs testing, will not be in use till someone manages to test it out.
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local TweenService = game:GetService("TweenService")
local Info = TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, false, 0)
local DirectTitleLabelFadeoutCoro = coroutine.create(function(Child)
	local FadeOutTL = TweenService:Create(Child, Info, {
		TextTransparency = 1,
	})
	FadeOutTL:Play()
	FadeOutTL.Completed:Wait()
	local _result = Child.Parent
	if _result ~= nil then
		_result:Destroy()
	end
end)
local FadeInThenOutTitleCoro = coroutine.create(function(RootElem)
	local TextChild = RootElem:FindFirstChild("Label")
	local _result = TextChild
	if _result ~= nil then
		_result = _result:IsA("TextLabel")
	end
	if _result then
		local FadeInTween1 = TweenService:Create(TextChild, Info, {
			TextTransparency = 0,
		})
		FadeInTween1:Play()
		FadeInTween1.Completed:Wait()
		task.wait(0.1)
		coroutine.resume(DirectTitleLabelFadeoutCoro, TextChild)
	end
end)
local function BuildTitleUI(MountLocation, TextContent)
	local Root = Roact.createElement("ScreenGui", {}, {
		Label = Roact.createElement("TextLabel", {
			Text = TextContent,
			Size = UDim2.new(0, 8, 0, 4),
		}, {
			Roact.createElement("UIPadding", {
				PaddingLeft = UDim.new(0.3, 0),
				PaddingBottom = UDim.new(0.3, 0),
				PaddingRight = UDim.new(0.3, 0),
				PaddingTop = UDim.new(0.3, 0),
			}),
		}),
	})
	Roact.mount(Root, MountLocation, "Title")
	coroutine.resume(FadeInThenOutTitleCoro, Root)
end
return {
	BuildTitleUI = BuildTitleUI,
}
