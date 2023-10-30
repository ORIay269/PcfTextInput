import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {ClearTextFunc, updateDynamicStyles } from "./UpdateFunctions" ;

export class TextInput4 implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private context: ComponentFramework.Context<IInputs>;
    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    textarea: HTMLTextAreaElement; 
    defaultLoaded = false;
    
    constructor()
    {

    }

    
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        const cssStyles = `
        border: solid 1px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 2px 3px #e0e0e0;
        outline: none;
        direction: rtl;
        resize: none;
        background-color: #f5f5f5;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        `;
        this.context = context;
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.textarea = document.createElement("textarea");

        this.container.appendChild(this.textarea);

        this.textarea.oninput = this.onTextAreaChanged;
        this.textarea.onchange = this.onTextAreaChanged;

        //this.textarea.rows = 1;
        this.textarea.setAttribute("style",cssStyles);

        this.textarea.addEventListener("focus", this.onFocus);
        this.textarea.addEventListener("blur", this.onBlur);
    }

    onTextAreaChanged = (): void => {

        this.notifyOutputChanged(); 
    }


    private onFocus = (): void => {     
    };


    private onBlur = (): void => {

    };


    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        updateDynamicStyles(context,this.textarea);
        ClearTextFunc(context,this.textarea);
        
        const value = context.parameters.TextValue;
        let disabled = context.mode.isControlDisabled;
        let masked = false;

        if(value && value.security) {
                masked = !value.security.readable;
                disabled = disabled || masked || !value.security.editable;
        }

            
        if (!this.defaultLoaded || context.updatedProperties.indexOf("TextValue") > -1) {
                this.defaultLoaded = true;
                const newValue = masked ? "****" : value.raw as string;
                this.textarea.value = newValue;
        }
    }

    
    public getOutputs(): IOutputs
    {
        if(this.context.parameters.ClearText.raw == true){
            return {TextValue: ""}
        }
        else{
        return {TextValue:  this.textarea.value};
        }
    }

    
    public destroy(): void
    {
    }
}
