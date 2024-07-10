import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

Blockly.Blocks['wait_time'] = {
    init: function () {
        this.appendValueInput("value_time_")
            .appendField("等待");
        this.appendDummyInput()
            .appendField("秒");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['wait_time'] = function (block) {
    pythonGenerator.definitions_['time'] = `import time\n`;
    let value_time_ = pythonGenerator.valueToCode(block, 'value_time_', Order.ATOMIC);

    return `time.sleep(${value_time_})\n`;
};
Blockly.Blocks['get_ldr'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("环境亮度");
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['get_ldr'] = function (block) {
    pythonGenerator.definitions_['ldr'] = `from leight import ldr\n`;
    pythonGenerator.definitions_['ldr_init'] = `light=ldr()\n`;

    return [`light.read()`, Order.ATOMIC];
};
Blockly.Blocks['get_sound'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("环境声音");
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['get_sound'] = function (block) {
    pythonGenerator.definitions_['sound'] = `from leight import sound\n`;
    pythonGenerator.definitions_['sound_init'] = `sd=sound()\n`;

    return [`sd.read()`, Order.ATOMIC];
};
Blockly.Blocks['get_hall'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("霍尔传感器");
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['get_hall'] = function (block) {
    pythonGenerator.definitions_['hall'] = `from leight import hall\n`;
    pythonGenerator.definitions_['hall_init'] = `hl=hall()\n`;

    return [`hl.read()`,Order.ATOMIC];
};
Blockly.Blocks['get_radar'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("人体雷达");
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['get_radar'] = function (block) {
    pythonGenerator.definitions_['radar'] = `from leight import radar\n`;
    pythonGenerator.definitions_['radar_init'] = `rd=radar()\n`;

    return [`rd.read()`, Order.ATOMIC];
};
Blockly.Blocks['get_lightness'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("台灯亮度");
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['get_lightness'] = function (block) {
    pythonGenerator.definitions_['led'] = `from leight import led\n`;

    return [`led.get_lightness()`, Order.ATOMIC];
};
Blockly.Blocks['btn'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("手势按键 当")
            .appendField(new Blockly.FieldDropdown([
                ["A键单击", "touch1_click"],
                ["A键双击", "touch1_dclick"],
                ["A键长按", "touch1_longClick"],
                ["B键单击", "touch2_click"],
                ["B键双击", "touch2_dclick"],
                ["B键长按", "touch2_longClick"],
                ["上滑","touch2_to_touch1"],
                ["下滑","touch1_to_touch2"],
            ]), "value_status_")
            .appendField("时")
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['btn'] = function (block) {
    pythonGenerator.definitions_['touch'] = `from button_action import touch\n`;

    let value_status_ = block.getFieldValue('value_status_');
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode==="")innerBlocksCode="    pass\n"

    pythonGenerator.definitions_[`${value_status_}`] = `def ${value_status_}_func():\n${innerBlocksCode}\n`;

    return `touch.action_change('${value_status_}',${value_status_}_func)\n`
};
Blockly.Blocks['voice'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("语音指令 当说")
            .appendField(new Blockly.FieldDropdown([
                ["开灯", "01"],
                ["关灯", "00"],
                ["调亮", "02"],
                ["调暗", "03"],
                ["嘛咪嘛咪哄", "04"],
                ["急急如律令", "05"],
                ["巴拉巴拉","06"],
                ["玛卡巴卡","07"],
            ]), "value_status_")
            .appendField("时")
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['voice'] = function (block) {
    pythonGenerator.definitions_['voice'] = `from leight import voice\n`;

    let value_status_ = block.getFieldValue('value_status_');
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode==="")innerBlocksCode="    pass\n"

    pythonGenerator.definitions_[`${value_status_}`] = `def voice_${value_status_}_func():\n${innerBlocksCode}\n`;

    return `voice('${value_status_}',voice_${value_status_}_func)\n`
};