// Early implementation, may not work since I never worked with Roact :(
// This would be better if I compiled the package to game type and made this script in the Client but eh.
// Still needs testing, will not be in use till someone manages to test it out.

import Roact from "@rbxts/roact";

const TweenService = game.GetService("TweenService");
const Info = new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0, false, 0);

const DirectTitleLabelFadeoutCoro = coroutine.create((Child: TextLabel) => {
    const FadeOutTL = TweenService.Create(Child, Info, { TextTransparency: 1 });

    FadeOutTL.Play();
    FadeOutTL.Completed.Wait();

    Child.Parent?.Destroy();
})

const FadeInThenOutTitleCoro = coroutine.create((RootElem: ScreenGui) => {
    const TextChild: TextLabel | Instance | undefined = RootElem.FindFirstChild("Label");
    
    if (TextChild?.IsA("TextLabel")) {
        const FadeInTween1 = TweenService.Create(TextChild, Info, { TextTransparency: 0 });

        FadeInTween1.Play();

        FadeInTween1.Completed.Wait();

        task.wait(0.1);

        coroutine.resume(DirectTitleLabelFadeoutCoro, TextChild);
    }
});

export function BuildTitleUI(MountLocation: PlayerGui, TextContent: string) {
    const Root = <screengui>
        <textlabel Key="Label" Text={TextContent} Size={new UDim2(0, 8, 0, 4)}>
            <uipadding PaddingLeft={new UDim(0.3, 0)} PaddingBottom={new UDim(0.3, 0)} PaddingRight={new UDim(0.3, 0)} PaddingTop={new UDim(0.3, 0)}></uipadding>
        </textlabel>        
    </screengui>

    Roact.mount(Root, MountLocation, "Title");

    coroutine.resume(FadeInThenOutTitleCoro, Root);
}