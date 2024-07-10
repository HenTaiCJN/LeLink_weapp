import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

Blockly.Blocks['radio_init'] = {
    init: function () {
        this.appendValueInput("value_ssid_")
            .appendField("无线广播识别码设置");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['radio_init'] = function (block) {
    pythonGenerator.definitions_['radio'] = `from leight import radio\n`;
    let value_ssid_ = pythonGenerator.valueToCode(block, 'value_ssid_', Order.ATOMIC);
    pythonGenerator.definitions_['radio_init'] = `r=radio(${value_ssid_})\n`;

    return ``;
};
Blockly.Blocks['radio_switch'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("无线广播")
            .appendField(new Blockly.FieldDropdown([
                ["开启", "on"],
                ["关闭", "off"],
            ]), "value_status_")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['radio_switch'] = function (block) {
    pythonGenerator.definitions_['radio'] = `from leight import radio\n`;

    let value_status_ = block.getFieldValue('value_status_');

    return `r.${value_status_}()\n`
};
Blockly.Blocks['radio_send'] = {
    init: function () {
        this.appendValueInput("value_msg_")
            .appendField("广播消息");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['radio_send'] = function (block) {
    pythonGenerator.definitions_['radio'] = `from leight import radio\n`;
    let value_msg_ = pythonGenerator.valueToCode(block, 'value_msg_', Order.ATOMIC);

    return `r.send(${value_msg_})`;
};
Blockly.Blocks['radio_setcb'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("当无线广播收到消息时")
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['radio_setcb'] = function (block) {
    pythonGenerator.definitions_['radio'] = `from leight import radio\n`;
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode==="")innerBlocksCode="    pass\n"

    pythonGenerator.definitions_[`radio_callback`] = `def radio_callback():\n${innerBlocksCode}\n`;

    return `r.setcb(radio_callback)\n`
};
Blockly.Blocks['radio_recv'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("接收消息");
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['radio_recv'] = function () {
    pythonGenerator.definitions_['radio'] = `from leight import radio\n`;

    return [`r.recv()`,Order.ATOMIC];
};