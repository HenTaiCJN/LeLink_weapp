import * as Blockly from 'blockly/core'

class CustomCategory extends Blockly.ToolboxCategory {
    /**
     * Constructor for a custom category.
     * @override
     */
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
    /** @override */
    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }
    /** @override */
    /** @override */
    setSelected(isSelected){
        // We do not store the label span on the category, so use getElementsByClassName.
        var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            // Change the background color of the div to white.
            this.rowDiv_.style.backgroundColor = 'white';
            // Set the colour of the text to the colour of the category.
            labelDom.style.color = this.colour_;
            this.iconDom_.style.color = this.colour_;
        } else {
            // Set the background back to the original colour.
            this.rowDiv_.style.backgroundColor = this.colour_;
            // Set the text back to white.
            labelDom.style.color = 'white';
            this.iconDom_.style.color = 'white';
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
    /** @override */
    createIconDom_() {
        const iconImg = document.createElement('img');
        if (this.toolboxItemDef_.categorystyle)
            iconImg.src = 'static/png/'+this.toolboxItemDef_.categorystyle+'.png';
        // iconImg.src='png/colour_category.png'
        else
            iconImg.src = 'static/png/logo_only.svg';
        iconImg.alt = '';
        iconImg.width = '40';
        iconImg.height = '40';
        return iconImg;
    }
}


Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);