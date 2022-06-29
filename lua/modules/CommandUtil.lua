local CommandUtil = {}

function CommandUtil.CheckIfMessageIsCommandAsync(String: string)
    if String:sub(0, 1) == "/" then
        return true
    else
        return false
    end
end

return CommandUtil