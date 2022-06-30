export class CommandUtil {
    constructor() {}

    CheckIfMessageIsCommandAsync(String: string) {
        if (String.sub(0, 1) == "/") {
            return true;
        } else {
            return false;
        }
    }
}
