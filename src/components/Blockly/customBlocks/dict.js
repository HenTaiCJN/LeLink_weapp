import * as Blockly from 'blockly/core'
import {pythonGenerator, Order} from 'blockly/python';

Blockly.Blocks['dict_creat'] = {
    init: function () {
        this.appendValueInput("value_dict_name")
            .appendField("创建字典变量")
        this.appendValueInput("value_dict_init")
            .appendField("并初始化为")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['dict_creat'] = function (block) {
    let value_dict_name = pythonGenerator.valueToCode(block, 'value_dict_name', Order.ATOMIC).slice(1,-1);
    let value_dict_init = pythonGenerator.valueToCode(block, 'value_dict_init', Order.ATOMIC).slice(1,-1);

    pythonGenerator.definitions_[`var_${value_dict_name}`] = `${value_dict_name}=None\n`;

    let code = `${value_dict_name}=${value_dict_init}\n`;
    return code
};
Blockly.Blocks['dict_key_get'] = {
    init: function () {
        this.appendValueInput("value_dict_name")
            .appendField("获取字典变量")
        this.appendValueInput("value_dict_key_")
            .appendField("键为")
        this.appendDummyInput()
            .appendField("的值")
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Object");
    }
};
pythonGenerator.forBlock['dict_key_get'] = function (block) {
    let value_dict_name = pythonGenerator.valueToCode(block, 'value_dict_name', Order.ATOMIC).slice(1,-1);
    let value_dict_key_ = pythonGenerator.valueToCode(block, 'value_dict_key_', Order.ATOMIC);

    let code = `${value_dict_name}.get(${value_dict_key_},None)`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['dict_value_add'] = {
    init: function () {
        this.appendValueInput("value_dict_name")
            .appendField("为字典变量")
        this.appendValueInput("value_dict_add")
            .appendField("添加键值对")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['dict_value_add'] = function (block) {
    let value_dict_name = pythonGenerator.valueToCode(block, 'value_dict_name', Order.ATOMIC).slice(1,-1);
    let value_dict_add = pythonGenerator.valueToCode(block, 'value_dict_add', Order.ATOMIC).slice(1,-1);


    let code = `${value_dict_name}.update(${value_dict_add})\n`;
    return code
};
Blockly.Blocks['dict_key_del'] = {
    init: function () {
        this.appendValueInput("value_dict_name")
            .appendField("删除字典变量中")
        this.appendValueInput("value_dict_key_")
            .appendField("键为")
        this.appendDummyInput()
            .appendField("的值")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['dict_key_del'] = function (block) {
    let value_dict_name = pythonGenerator.valueToCode(block, 'value_dict_name', Order.ATOMIC).slice(1,-1);
    let value_dict_key_ = pythonGenerator.valueToCode(block, 'value_dict_key_', Order.ATOMIC);

    let code = `${value_dict_name}.pop(${value_dict_key_})`;
    return code
};
Blockly.Blocks['json_to_dict'] = {
    init: function () {
        this.appendValueInput("value_json")
            .appendField("将JSON")
        this.appendValueInput("value_dict_name")
            .appendField("转为字典变量")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['json_to_dict'] = function (block) {
    pythonGenerator.definitions_[`json`] = `import json\n`;
    let value_json = pythonGenerator.valueToCode(block, 'value_json', Order.ATOMIC);
    let value_dict_name = pythonGenerator.valueToCode(block, 'value_dict_name', Order.ATOMIC).slice(1,-1);

    pythonGenerator.definitions_[`var_${value_dict_name}`] = `${value_dict_name}=None\n`;

    let code = `${value_dict_name}=json.loads(${value_json})\n`;
    return code
};