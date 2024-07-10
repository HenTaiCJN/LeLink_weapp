import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

function hexToRgb(hex) {
    // 利用正则表达式提取16进制颜色值的红、绿、蓝分量
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // 将结果转换为整数并返回
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

Blockly.Blocks['output_print'] = {
    init: function () {
        this.appendValueInput("value_print_")
            .appendField("打印");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['output_print'] = function (block) {
    let value_print_ = pythonGenerator.valueToCode(block, 'value_print_', Order.ATOMIC);

    return `print(${value_print_})\n`;
};
Blockly.Blocks['motor_speed'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("设置电机")
        this.appendValueInput("value_road_in0")
            .appendField(" in0=")
        this.appendValueInput("value_road_in1")
            .appendField(" in1=")
        this.appendDummyInput("tmp2")
            .appendField(" 端口")
            .appendField(new Blockly.FieldDropdown([
                ["不使用", "None"],
                ["M1", "M1"],
                ["M2", "M2"],
            ]), "value_status_")
        this.appendValueInput("value_speed_")
            .setCheck("Number")
            .appendField("速度");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['motor_speed'] = function (block) {
    pythonGenerator.definitions_['parrot'] = `from educore import parrot\n`;

    let value_speed_ = pythonGenerator.valueToCode(block, 'value_speed_', Order.ATOMIC);
    let value_road_in0 = pythonGenerator.valueToCode(block, 'value_road_in0', Order.ATOMIC);
    let value_road_in1 = pythonGenerator.valueToCode(block, 'value_road_in1', Order.ATOMIC);
    let value_status_ = block.getFieldValue('value_status_');

    let definitions
    if (value_road_in0 !== "None" && value_road_in1 !== "None") {
        definitions = `parrot_${value_road_in0}_${value_road_in1}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=parrot(in0=${value_road_in0},in1=${value_road_in1})`;
    } else {
        definitions = `parrot_${value_status_.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=parrot(parrot.${value_status_})`;
    }

    if (value_speed_ > 100) value_speed_ = 100
    else if (value_speed_.replace(/[()]/g, '') < -100) value_speed_ = -100
    return `${definitions}.speed(${value_speed_})\n`;
};
Blockly.Blocks['play_tone'] = {
    init: function () {
        this.appendValueInput("value_tone_")
            .setCheck("String")
            .appendField("播放音调");
        this.appendValueInput("value_delay_")
            .appendField("每个音调播放");
        this.appendValueInput("value_road_")
            .appendField("秒 在通道")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['play_tone'] = function (block) {
    pythonGenerator.definitions_['buzzconst'] = 'from educore import speaker\n';

    let value_tone_ = pythonGenerator.valueToCode(block, 'value_tone_', Order.ATOMIC);
    let value_delay_ = pythonGenerator.valueToCode(block, 'value_delay_', Order.ATOMIC);
    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);

    let definitions = `speaker_${value_road_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=speaker(${value_road_})`;

    return `${definitions}.tone(${value_tone_.slice(1, -1)},${value_delay_ * 1000})\n`;
};
Blockly.Blocks['servo_move'] = {
    init: function () {
        this.appendValueInput("value_angle_")
            .setCheck("Number")
            .appendField("舵机移动到角度");
        this.appendValueInput("value_road_")
            .appendField("°  在通道")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['servo_move'] = function (block) {
    pythonGenerator.definitions_['servo'] = `from educore import servo\n`;

    let value_angle_ = pythonGenerator.valueToCode(block, 'value_angle_', Order.ATOMIC);
    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);

    let definitions = `servo_${value_road_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=servo(${value_road_})`;

    return `${definitions}.angle(value=${value_angle_})\n`;
};
Blockly.Blocks['oled_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("屏幕清空")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['oled_clear'] = function (block) {
    pythonGenerator.definitions_['oled'] = `from educore import oled\n`;

    return `oled.clear()\n`;
};
Blockly.Blocks['oled_print'] = {
    init: function () {
        this.appendValueInput("value_str_")
            .appendField("屏幕显示")
            .setCheck("String")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['oled_print'] = function (block) {
    pythonGenerator.definitions_['oled'] = `from educore import oled\n`;

    let value_str_ = pythonGenerator.valueToCode(block, 'value_str_', Order.ATOMIC);
    return `oled.print(${value_str_})`;
};
Blockly.Blocks['set_rgb'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("设置RGB灯带")
        this.appendValueInput("value_index_")
            .appendField("灯珠序号")
        this.appendValueInput("value_color_r")
            .appendField("r")
        this.appendValueInput("value_color_g")
            .appendField("g")
        this.appendValueInput("value_color_b")
            .appendField("b")
        this.appendValueInput("value_road_port")
            .appendField(" 在通道")
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['set_rgb'] = function (block) {
    pythonGenerator.definitions_['rgb'] = 'from educore import rgb\n';

    let value_index_ = pythonGenerator.valueToCode(block, 'value_index_', Order.ATOMIC);
    let value_color_r = pythonGenerator.valueToCode(block, 'value_color_r', Order.ATOMIC);
    let value_color_g = pythonGenerator.valueToCode(block, 'value_color_g', Order.ATOMIC);
    let value_color_b = pythonGenerator.valueToCode(block, 'value_color_b', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);

    let definitions = `rgb_${value_road_port.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=rgb(${value_road_port})`;

    return `${definitions}.write(index=${value_index_.slice(1, -1)},r=${value_color_r},g=${value_color_g},b=${value_color_b})\n`;
};
Blockly.Blocks['rgb_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("熄灭所有rgb灯珠")
        this.appendValueInput("value_road_port")
            .appendField(" 在通道")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['rgb_clear'] = function (block) {
    pythonGenerator.definitions_['rgb'] = `from educore import rgb\n`;

    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);
    let definitions = `rgb_${value_road_port.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=rgb(${value_road_port})`;

    return `${definitions}.clear()\n`;
};