import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';


Blockly.Blocks['HID_creat'] = {
    init: function () {
        this.appendValueInput("value_HID_name")
            .appendField("开启HID蓝牙 名称:")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['HID_creat'] = function (block) {
    Blockly.Python.definitions_[`HID`] = `from educore import HID\n`;

    let value_HID_name = Blockly.Python.valueToCode(block, 'value_HID_name', Blockly.Python.ORDER_ATOMIC);

    let code = `ble_hid=HID(name=${value_HID_name})\n`;
    return code
};
Blockly.Blocks['HID_is_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("判断HID是否连接")
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Boolean");
    }
};
Blockly.Python['HID_is_connect'] = function (block) {
    let code = `ble_hid.isconnected()`;
    return [code, Blockly.Python.ORDER_ATOMIC]
};
Blockly.Blocks['HID_send_code'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("发送指令 ")
            .appendField(new Blockly.FieldDropdown([
                ["鼠标单击", "HID.KeyboardCode.CLICK"],
                ["鼠标双击", "HID.KeyboardCode.DCLICK"],
                ["键盘空格", "HID.KeyboardCode.SPACE"],
            ]), "value_code_")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['HID_move'] = {
    init: function () {
        this.appendValueInput("value_x")
            .appendField("鼠标移动到 X:")
        this.appendValueInput("value_y")
            .appendField("Y:")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['HID_send_string'] = {
    init: function () {
        this.appendValueInput("value_str")
            .appendField("发送字符串:")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};