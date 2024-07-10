import * as Blockly from 'blockly/core'
import {pythonGenerator, Order} from 'blockly/python';

Blockly.Blocks['func'] = {
    init: function () {
        this.appendValueInput("value_func_name_")
            .setCheck("String")
            .appendField("函数名:");
        this.appendValueInput("value_func_param_")
            .setCheck("String")
            .appendField("参数:");
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null);
        this.appendValueInput("value_func_return_")
            .appendField("返回");
        this.setInputsInline(true);
        this.setColour("#FF6680");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['func'] = function (block) {
    let value_func_name_ = pythonGenerator.valueToCode(block, 'value_func_name_', Order.ATOMIC);
    value_func_name_ = value_func_name_.slice(1, -1)
    let value_func_param_ = pythonGenerator.valueToCode(block, 'value_func_param_', Order.ATOMIC);
    value_func_param_ = value_func_param_.slice(1, -1)
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode === "") innerBlocksCode = "    pass\n"
    let value_func_return_ = pythonGenerator.valueToCode(block, 'value_func_return_', Order.ATOMIC);
    pythonGenerator.definitions_[`func_${value_func_name_}`] = `def ${value_func_name_}(${value_func_param_}):\n${innerBlocksCode}    return ${value_func_return_}`;
    let code = ``;
    return code;
};
Blockly.Blocks['func_use'] = {
    init: function () {
        this.appendValueInput("value_func_name_")
            .setCheck("String")
            .appendField("使用函数:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF6680");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['func_use'] = function (block) {
    let value_func_name_ = pythonGenerator.valueToCode(block, 'value_func_name_', Order.ATOMIC);
    value_func_name_ = value_func_name_.slice(1, -1)
    let code = `${value_func_name_}\n`;
    return code;
};
Blockly.Blocks['math_mod'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("取余数 ");
        this.appendValueInput("value_value_1")
            .setCheck("Number")
        this.appendValueInput("value_value_2")
            .setCheck("Number")
            .appendField("mod");
        this.setOutput(true, "Number");
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['math_mod'] = function (block, generator) {
    let value_value_1 = generator.valueToCode(block, 'value_value_1', Order.ATOMIC);
    let value_value_2 = generator.valueToCode(block, 'value_value_2', Order.ATOMIC);
    let code = `${value_value_1} % ${value_value_2}`;
    return [code, Order.ATOMIC];
};
