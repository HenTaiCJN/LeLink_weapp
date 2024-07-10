import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

// function hexToRgb(hex) {
//     // 利用正则表达式提取16进制颜色值的红、绿、蓝分量
//     let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     // 将结果转换为整数并返回
//     return result ? [
//         parseInt(result[1], 16),
//         parseInt(result[2], 16),
//         parseInt(result[3], 16)
//     ] : null;
// }

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
Blockly.Blocks['lightness'] = {
    init: function () {
        this.appendValueInput("value_speed_")
            .appendField("设置灯光亮度为")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['lightness'] = function (block) {
    pythonGenerator.definitions_['led'] = `from leight import led\n`;

    let value_speed_ = pythonGenerator.valueToCode(block, 'value_speed_', Order.ATOMIC);

    return `led.set_lightness(${value_speed_})\n`;
};
Blockly.Blocks['light_on'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("开灯")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['light_on'] = function () {
    pythonGenerator.definitions_['led'] = 'from leight import led\n';


    return `led.on()\n`;
};
Blockly.Blocks['light_off'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("关灯")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['light_off'] = function () {
    pythonGenerator.definitions_['led'] = 'from leight import led\n';


    return `led.off()\n`;
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
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['set_rgb'] = function (block) {
    pythonGenerator.definitions_['rgb'] = 'from leight import rgb\n';

    let value_index_ = pythonGenerator.valueToCode(block, 'value_index_', Order.ATOMIC);
    let value_color_r = pythonGenerator.valueToCode(block, 'value_color_r', Order.ATOMIC);
    let value_color_g = pythonGenerator.valueToCode(block, 'value_color_g', Order.ATOMIC);
    let value_color_b = pythonGenerator.valueToCode(block, 'value_color_b', Order.ATOMIC);

    return `rgb.write(${value_index_.slice(1, -1)},${value_color_r},${value_color_g},${value_color_b})\n`;
};
Blockly.Blocks['play_tone'] = {
    init: function () {
        this.appendValueInput("value_tone_")
            .setCheck("String")
            .appendField("播放音调");
        this.appendValueInput("value_delay_")
            .appendField(" 持续");
        this.appendDummyInput()
            .appendField("秒")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['play_tone'] = function (block) {
    pythonGenerator.definitions_['speaker'] = 'from leight import speaker\n';

    let value_tone_ = pythonGenerator.valueToCode(block, 'value_tone_', Order.ATOMIC);
    let value_delay_ = pythonGenerator.valueToCode(block, 'value_delay_', Order.ATOMIC);

    return `speaker.tone(${value_tone_.slice(1, -1)},${value_delay_ * 1000})\n`;
};
Blockly.Blocks['char'] = {
    init: function () {
        this.appendValueInput("value_str_")
            .appendField("投射字符")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['char'] = function (block) {
    pythonGenerator.definitions_['char'] = `from leight import char\n`;

    let value_str_ = pythonGenerator.valueToCode(block, 'value_str_', Order.ATOMIC);

    return `char.display(${value_str_})\n`;
};
Blockly.Blocks['carousel'] = {
    init: function () {
        this.appendValueInput("value_str_")
            .appendField("投射走马灯")
        this.appendValueInput("value_speed_")
            .appendField(" 速度")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['carousel'] = function (block) {
    pythonGenerator.definitions_['carousel'] = `from leight import carousel\n`;

    let value_str_ = pythonGenerator.valueToCode(block, 'value_str_', Order.ATOMIC);
    let value_speed_ = pythonGenerator.valueToCode(block, 'value_speed_', Order.ATOMIC);

    pythonGenerator.definitions_['carousel_init'] = `scroll=carousel()\n`;

    return `scroll.loop(${value_str_},${value_speed_})\n`;
};
Blockly.Blocks['carousel_stop'] = {
    init: function () { this.appendDummyInput()
        .appendField("停止走马灯")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['carousel_stop'] = function () {
    pythonGenerator.definitions_['carousel'] = `from leight import carousel\n`;

    pythonGenerator.definitions_['carousel_init'] = `scroll=carousel()\n`;

    return `scroll.stop()\n`;
};


Blockly.Blocks['set_light_matrix'] = {
    init: function () {
        this.appendValueInput("value_matrix_")
            .setCheck("Array")
            .appendField("投射点阵");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['set_light_matrix'] = function (block) {
    pythonGenerator.definitions_['led'] = 'from leight import led';
    let value_matrix_ = pythonGenerator.valueToCode(block, 'value_matrix_', Order.ATOMIC);

    return `led.led_ctrl_multiple(${value_matrix_})\n`;
};

// @ts-ignore
Blockly.FieldCheckbox.CHECK_CHAR = "●"
Blockly.Blocks['matrix_led_matrix'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("点阵");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L01")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L02")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L03")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L04")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L05")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L06")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L07")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L08");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L09")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L10")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L11")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L12")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L13")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L14")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L15")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L16");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L17")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L18")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L19")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L20")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L21")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L22")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L23")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L24");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L25")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L26")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L27")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L28")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L29")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L30")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L31")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L32");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L33")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L34")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L35")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L36")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L37")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L38")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L39")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L40");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L41")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L42")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L43")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L44")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L45")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L46")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L47")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L48");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L49")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L50")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L51")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L52")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L53")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L54")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L55")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L56");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L57")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L58")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L59")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L60")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L61")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L62")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L63")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "L64");
        this.setOutput(true, "Array");
        this.setColour("#1CB3FF");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['matrix_led_matrix'] = function (block) {
    let L01 = (block.getFieldValue('L01') === 'TRUE') ? "1" : "0";
    let L02 = (block.getFieldValue('L02') === 'TRUE') ? "1" : "0";
    let L03 = (block.getFieldValue('L03') === 'TRUE') ? "1" : "0";
    let L04 = (block.getFieldValue('L04') === 'TRUE') ? "1" : "0";
    let L05 = (block.getFieldValue('L05') === 'TRUE') ? "1" : "0";
    let L06 = (block.getFieldValue('L06') === 'TRUE') ? "1" : "0";
    let L07 = (block.getFieldValue('L07') === 'TRUE') ? "1" : "0";
    let L08 = (block.getFieldValue('L08') === 'TRUE') ? "1" : "0";
    let L09 = (block.getFieldValue('L09') === 'TRUE') ? "1" : "0";
    let L10 = (block.getFieldValue('L10') === 'TRUE') ? "1" : "0";
    let L11 = (block.getFieldValue('L11') === 'TRUE') ? "1" : "0";
    let L12 = (block.getFieldValue('L12') === 'TRUE') ? "1" : "0";
    let L13 = (block.getFieldValue('L13') === 'TRUE') ? "1" : "0";
    let L14 = (block.getFieldValue('L14') === 'TRUE') ? "1" : "0";
    let L15 = (block.getFieldValue('L15') === 'TRUE') ? "1" : "0";
    let L16 = (block.getFieldValue('L16') === 'TRUE') ? "1" : "0";
    let L17 = (block.getFieldValue('L17') === 'TRUE') ? "1" : "0";
    let L18 = (block.getFieldValue('L18') === 'TRUE') ? "1" : "0";
    let L19 = (block.getFieldValue('L19') === 'TRUE') ? "1" : "0";
    let L20 = (block.getFieldValue('L20') === 'TRUE') ? "1" : "0";
    let L21 = (block.getFieldValue('L21') === 'TRUE') ? "1" : "0";
    let L22 = (block.getFieldValue('L22') === 'TRUE') ? "1" : "0";
    let L23 = (block.getFieldValue('L23') === 'TRUE') ? "1" : "0";
    let L24 = (block.getFieldValue('L24') === 'TRUE') ? "1" : "0";
    let L25 = (block.getFieldValue('L25') === 'TRUE') ? "1" : "0";
    let L26 = (block.getFieldValue('L26') === 'TRUE') ? "1" : "0";
    let L27 = (block.getFieldValue('L27') === 'TRUE') ? "1" : "0";
    let L28 = (block.getFieldValue('L28') === 'TRUE') ? "1" : "0";
    let L29 = (block.getFieldValue('L29') === 'TRUE') ? "1" : "0";
    let L30 = (block.getFieldValue('L30') === 'TRUE') ? "1" : "0";
    let L31 = (block.getFieldValue('L31') === 'TRUE') ? "1" : "0";
    let L32 = (block.getFieldValue('L32') === 'TRUE') ? "1" : "0";
    let L33 = (block.getFieldValue('L33') === 'TRUE') ? "1" : "0";
    let L34 = (block.getFieldValue('L34') === 'TRUE') ? "1" : "0";
    let L35 = (block.getFieldValue('L35') === 'TRUE') ? "1" : "0";
    let L36 = (block.getFieldValue('L36') === 'TRUE') ? "1" : "0";
    let L37 = (block.getFieldValue('L37') === 'TRUE') ? "1" : "0";
    let L38 = (block.getFieldValue('L38') === 'TRUE') ? "1" : "0";
    let L39 = (block.getFieldValue('L39') === 'TRUE') ? "1" : "0";
    let L40 = (block.getFieldValue('L40') === 'TRUE') ? "1" : "0";
    let L41 = (block.getFieldValue('L41') === 'TRUE') ? "1" : "0";
    let L42 = (block.getFieldValue('L42') === 'TRUE') ? "1" : "0";
    let L43 = (block.getFieldValue('L43') === 'TRUE') ? "1" : "0";
    let L44 = (block.getFieldValue('L44') === 'TRUE') ? "1" : "0";
    let L45 = (block.getFieldValue('L45') === 'TRUE') ? "1" : "0";
    let L46 = (block.getFieldValue('L46') === 'TRUE') ? "1" : "0";
    let L47 = (block.getFieldValue('L47') === 'TRUE') ? "1" : "0";
    let L48 = (block.getFieldValue('L48') === 'TRUE') ? "1" : "0";
    let L49 = (block.getFieldValue('L49') === 'TRUE') ? "1" : "0";
    let L50 = (block.getFieldValue('L50') === 'TRUE') ? "1" : "0";
    let L51 = (block.getFieldValue('L51') === 'TRUE') ? "1" : "0";
    let L52 = (block.getFieldValue('L52') === 'TRUE') ? "1" : "0";
    let L53 = (block.getFieldValue('L53') === 'TRUE') ? "1" : "0";
    let L54 = (block.getFieldValue('L54') === 'TRUE') ? "1" : "0";
    let L55 = (block.getFieldValue('L55') === 'TRUE') ? "1" : "0";
    let L56 = (block.getFieldValue('L56') === 'TRUE') ? "1" : "0";
    let L57 = (block.getFieldValue('L57') === 'TRUE') ? "1" : "0";
    let L58 = (block.getFieldValue('L58') === 'TRUE') ? "1" : "0";
    let L59 = (block.getFieldValue('L59') === 'TRUE') ? "1" : "0";
    let L60 = (block.getFieldValue('L60') === 'TRUE') ? "1" : "0";
    let L61 = (block.getFieldValue('L61') === 'TRUE') ? "1" : "0";
    let L62 = (block.getFieldValue('L62') === 'TRUE') ? "1" : "0";
    let L63 = (block.getFieldValue('L63') === 'TRUE') ? "1" : "0";
    let L64 = (block.getFieldValue('L64') === 'TRUE') ? "1" : "0";
    let code = `[\n`+
        `${L57},${L58},${L59},${L60},${L61},${L62},${L63},${L64},\n` +
        `${L49},${L50},${L51},${L52},${L53},${L54},${L55},${L56},\n` +
        `${L41},${L42},${L43},${L44},${L45},${L46},${L47},${L48},\n` +
        `${L33},${L34},${L35},${L36},${L37},${L38},${L39},${L40},\n` +
        `${L25},${L26},${L27},${L28},${L29},${L30},${L31},${L32},\n` +
        `${L17},${L18},${L19},${L20},${L21},${L22},${L23},${L24},\n` +
        `${L09},${L10},${L11},${L12},${L13},${L14},${L15},${L16},\n` +
        `${L01},${L02},${L03},${L04},${L05},${L06},${L07},${L08}\n]`
    return [code, Order.ATOMIC];
};
Blockly.Css.register(`
  .blocklyCheckbox {
    fill: white !important;
    stroke: black !important;
  }
`);