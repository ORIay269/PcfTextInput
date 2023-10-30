import {IInputs} from "./generated/ManifestTypes";
export const updateDynamicStyles = (context: ComponentFramework.Context<IInputs>, inputElement: HTMLTextAreaElement): void => {

    //inputElement.setAttribute("placeholder", context.parameters.PlaceholderText.raw || "");
    //<property name="PlaceholderText" display-name-key="Placeholder Text" description-key="placeholder text" of-type="SingleLine.Text" usage="input" required="false" default-value="" />

    inputElement.style.fontFamily = context.parameters.FontFamily.raw || "Segoe UI, sans-serif";
    inputElement.style.borderRadius = `${context.parameters.BorderRadius.raw || 5}px`;
    inputElement.style.fontSize = `${context.parameters.FontSize.raw || 16}px`;
    inputElement.style.padding = `${context.parameters.Padding.raw || 5}px`;

};
export const ClearTextFunc = (context:ComponentFramework.Context<IInputs>, inputElement: HTMLTextAreaElement): void =>{
    if(context.parameters.ClearText.raw == true) {
        inputElement.value="";
        context.parameters.TextValue.raw="";
    }
}
