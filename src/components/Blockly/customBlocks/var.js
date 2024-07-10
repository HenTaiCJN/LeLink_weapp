import * as Blockly from 'blockly/core'
import {pythonGenerator, Order} from 'blockly/python';

Blockly.Blocks['var_set'] = {
    init: function () {
        this.appendValueInput("value_var_name_")
            .appendField("给变量:")
            .setCheck("String")
        this.appendValueInput("value_var_v_")
            .appendField("赋值:")
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['var_set'] = function (block) {
    let value_var_name_ = pythonGenerator.valueToCode(block, 'value_var_name_', Order.ATOMIC);
    value_var_name_ = value_var_name_.slice(1, -1)
    let value_var_v_ = pythonGenerator.valueToCode(block, 'value_var_v_', Order.ATOMIC);

    pythonGenerator.definitions_[`var_${value_var_name_}`] = `${value_var_name_}=None\n`;

    let code = `${value_var_name_}=${value_var_v_}\n`;
    return code;
};
Blockly.Blocks['var_use'] = {
    init: function () {
        this.appendValueInput("value_var_name_")
            .appendField("使用变量:")
            .setCheck("String")
        this.setInputsInline(true)
        this.setOutput(true,null)
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['var_use'] = function (block) {
    let value_var_name_ = pythonGenerator.valueToCode(block, 'value_var_name_', Order.ATOMIC);
    value_var_name_=value_var_name_.slice(1,-1)

    pythonGenerator.definitions_[`var_${value_var_name_}`] = `${value_var_name_}=None\n`;

    let code = `${value_var_name_}`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['var_use_global'] = {
    init: function () {
        this.appendValueInput("value_var_name_")
            .appendField("声明全局变量:")
            .setCheck("String")
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['var_use_global'] = function (block) {
    let value_var_name_ = pythonGenerator.valueToCode(block, 'value_var_name_', Order.ATOMIC);
    value_var_name_=value_var_name_.slice(1,-1)

    pythonGenerator.definitions_[`var_${value_var_name_}`] = `${value_var_name_}=None\n`;

    let code = `global ${value_var_name_}\n`;
    return code
};