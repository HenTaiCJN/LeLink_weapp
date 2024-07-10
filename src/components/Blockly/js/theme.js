import * as Blockly from 'blockly/core'

Blockly.Theme.defineTheme('LeLink', {
    name: 'LeLink',
    base: Blockly.Themes.Classic,
    categoryStyles: {
        logic_category: {
            colour: "#D435D4"
        },
        loop_category: {
            colour: "#5454BF"
        },
        math_category: {
            colour: "#039A9A"
        },
        text_category: {
            colour: "#257DB1"
        },
        list_category: {
            colour: "#035703"
        },
        variable_category:{
            colour: "#6969FF"
        },
        procedure_category:{
            colour: "#FF6680"
        },
        dict_category:{
            colour: "#D435D4"
        },
        pin_category:{
            colour: "#039A9A"
        },
        input_category:{
            colour: "#FFC003"
        },
        output_category:{
            colour: "#1CB3FF"
        },
        network_category:{
            colour: "#13B013"
        },
        broadcast_category:{
          colour: "#D2691E"
        },
        interval_category:{
            colour: "#FFCC99"
        }

    },
    blockStyles: {
        logic_blocks: {
            colourPrimary: "#D435D4",
        },
        loop_blocks: {
            colourPrimary: "#5454BF"
        },
        math_blocks: {
            colourPrimary: "#039A9A"
        },
        text_blocks: {
            colourPrimary: "#257DB1"
        },
        list_blocks: {
            colourPrimary: "#035703"
        },
        variable_blocks:{
            colourPrimary: "#6969FF"
        },
        procedure_blocks:{
            colourPrimary: "#FF6680"
        },
        dict_blocks:{
            colourPrimary: "#1CB3FF"
        },
        pin_blocks:{
            colourPrimary: "#039A9A"
        },
        input_blocks:{
            colourPrimary: "#FFC003"
        }
    },
    startHats: true
});