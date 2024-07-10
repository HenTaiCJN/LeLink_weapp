import * as Blockly from 'blockly/core'
import {pythonGenerator, Order} from 'blockly/python';

const pins_const = [
    ["D0", "0"],
    ["D1", "1"],
    ["D2", "2"],
    ["D3", "3"],
    ["D4", "4"],
    ["D5", "5"],
    ["D6", "6"],
    ["D7", "7"],
    ["D8", "8"],
    ["D9", "9"],
    ["D10", "10"],
    ["D11", "11"],
    ["D12", "12"],
    ["D13", "13"],
    ["D14", "14"],
    ["D15", "15"],
    ["AD0", "AD0"],
    ["AD1", "AD1"],
    ["AD2", "AD2"],
]
const pins_other = [
    ["内置", ""],
    ["port1", "port=1"],
    ["port2", "port=2"],
    ["port3", "port=3"],
    ["port4", "port=4"],

]
Blockly.Blocks['pin_read_digital'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("读取引脚")
            .appendField(new Blockly.FieldDropdown(pins_const), "value_pin_")
            .appendField("的数字值");
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['pin_read_digital'] = function (block) {
    pythonGenerator.definitions_['pin'] = `from educore import pin\n`;

    let value_pin_ = block.getFieldValue('value_pin_');
    pythonGenerator.definitions_[`pin_${value_pin_}`] = `pin_${value_pin_}=pin(${value_pin_})\n`;

    let code = `pin_${value_pin_}.read_digital()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['pin_write_digital'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("设置引脚")
            .appendField(new Blockly.FieldDropdown(pins_const), "value_pin_")
            .appendField("数字值为")
            .appendField(new Blockly.FieldDropdown([
                ["高电平", "1"],
                ["低电平", "0"],
            ]), "value_digital_");
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
pythonGenerator.forBlock['pin_write_digital'] = function (block) {
    pythonGenerator.definitions_['pin'] = `from educore import pin\n`;

    let value_pin_ = block.getFieldValue('value_pin_');
    pythonGenerator.definitions_[`pin_${value_pin_}`] = `pin_${value_pin_}=pin(${value_pin_})\n`;

    let value_digital_ = block.getFieldValue('value_digital_');
    let code = `pin_${value_pin_}.write_digital(${value_digital_})\n`;
    return code
};
Blockly.Blocks['pin_read_analog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("读取引脚")
            .appendField(new Blockly.FieldDropdown(pins_const), "value_pin_")
        this.appendDummyInput()
            .appendField("的模拟值(ADC)")
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['pin_read_analog'] = function (block) {
    pythonGenerator.definitions_['pin'] = `from educore import pin\n`;

    let value_pin_ = block.getFieldValue('value_pin_');
    pythonGenerator.definitions_[`pin_${value_pin_}`] = `pin_${value_pin_}=pin(${value_pin_})\n`;

    let code = `pin_${value_pin_}.read_analog()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['pin_write_analog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("设置引脚")
            .appendField(new Blockly.FieldDropdown(pins_const), "value_pin_")
            .appendField("模拟值(PWM)为")
        this.appendValueInput("value_pwm_")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['pin_write_analog'] = function (block) {
    pythonGenerator.definitions_['pin'] = `from educore import pin\n`;

    let value_pin_ = block.getFieldValue('value_pin_');
    pythonGenerator.definitions_[`pin_${value_pin_}`] = `pin_${value_pin_}=pin(${value_pin_})\n`;

    let value_pwm_ = pythonGenerator.valueToCode(block, 'value_pwm_', Order.ATOMIC);
    let code = `pin_${value_pin_}.write_analog(value=${value_pwm_})`;
    return code
};
Blockly.Blocks['port_all'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [["不使用", "None"],...pins_other, ...pins_const,]
            ), "value_port_")
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['port_all'] = function (block) {
    let value_port_ = block.getFieldValue('value_port_');
    return [value_port_, Order.ATOMIC]
};
Blockly.Blocks['pins'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [["不使用", "None"],...pins_const]
            ), "value_port_")
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['pins'] = function (block) {
    let value_port_ = block.getFieldValue('value_port_');
    return [value_port_, Order.ATOMIC]
};
Blockly.Blocks['ports'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(
                [["不使用", "None"],...pins_other]
            ), "value_port_")
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['ports'] = function (block) {
    let value_port_ = block.getFieldValue('value_port_');
    return [value_port_, Order.ATOMIC]
};
Blockly.Blocks['port_free'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("自定义通道")
        this.appendValueInput("value_port_")
            .setCheck("String");
        this.setInputsInline(true);
        this.setColour("#039A9A");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Array");
    }
};
pythonGenerator.forBlock['port_free'] = function (block) {
    var value_port_ = pythonGenerator.valueToCode(block, 'value_port_', Order.ATOMIC);
    return [value_port_.slice(1, -1), Order.ATOMIC]
};