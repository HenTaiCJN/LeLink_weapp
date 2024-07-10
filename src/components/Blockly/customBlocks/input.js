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
    pythonGenerator.definitions_['sleep'] = `import time\n`;
    let value_time_ = pythonGenerator.valueToCode(block, 'value_time_', Order.ATOMIC);

    return `time.sleep(${value_time_})\n`;
};
Blockly.Blocks['hcsr'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("读取超声波数据")
        this.appendValueInput("value_road_trig")
            .appendField(" trig=")
        this.appendValueInput("value_road_echo")
            .appendField(" echo=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.appendDummyInput()
            .appendField("单位")
            .appendField(new Blockly.FieldDropdown([
                ["厘米", "cm"],
                ["毫米", "mm"],
            ]), "value_status_")
        this.setInputsInline(false);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['hcsr'] = function (block) {
    pythonGenerator.definitions_['Ultrasonic'] = `from educore import ultrasonic\n`;

    let value_road_trig = pythonGenerator.valueToCode(block, 'value_road_trig', Order.ATOMIC);
    let value_road_echo = pythonGenerator.valueToCode(block, 'value_road_echo', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);
    let value_status_ = block.getFieldValue('value_status_');

    let definitions
    if (value_road_trig !== "None" && value_road_echo !== "None") {
        definitions = `Ultrasonic_${value_road_trig}_${value_road_echo}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=ultrasonic(trig=${value_road_trig},echo=${value_road_echo},port=None)`;
    } else {
        definitions = `Ultrasonic_${value_road_port.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=ultrasonic(trig=None,echo=None,${value_road_port})`;
    }

    let code
    if (value_status_ === "cm") code = `${definitions}.distance()`;
    else code = `${definitions}.distance_mm()`;

    return [code, Order.ATOMIC]
};
Blockly.Blocks['singlebutton'] = {
    init: function () {
        this.appendValueInput("value_road_")
            .appendField("当外部按钮被按下时 在通道")
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
pythonGenerator.forBlock['singlebutton'] = function (block) {
    pythonGenerator.definitions_['button'] = `from educore import button\n`;

    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode==="")innerBlocksCode="    pass\n"

    let definitions = `button_${value_road_.replace('=', '')}`

    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=button(${value_road_})`;
    pythonGenerator.definitions_[`${definitions}_def`] = `def ${definitions}_func():\n${innerBlocksCode}\n`;

    return `${definitions}.event_pressed = ${definitions}_func`
};
    Blockly.Blocks['btn'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("当板载按钮")
            .appendField(new Blockly.FieldDropdown([
                ["A", "a"],
                ["B", "b"],
            ]), "value_status_")
            .appendField("按下时")
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
    pythonGenerator.definitions_['button'] = `from educore import button\n`;

    let value_status_ = block.getFieldValue('value_status_');
    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode==="")innerBlocksCode="    pass\n"

    let definitions = `button_${value_status_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=button(button.${value_status_})`;
    pythonGenerator.definitions_[`${definitions}_def`] = `def ${definitions}_func():\n${innerBlocksCode}\n`;

    return `${definitions}.event_pressed = ${definitions}_func`
};
Blockly.Blocks['dhtsensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("读取温湿度传感器的")
            .appendField(new Blockly.FieldDropdown([
                ["温度", "0"],
                ["湿度", "1"],
            ]), "value_status_")
        this.appendValueInput("value_road_")
            .appendField(" 在通道")
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['dhtsensor'] = function (block) {
    pythonGenerator.definitions_['dht'] = `from educore import dht\n`;

    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);
    let value_status_ = block.getFieldValue('value_status_');

    let definitions = `dht_${value_road_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=dht(${value_road_})`;

    let code = `${definitions}.read()[${value_status_}]`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['lightsensor'] = {
    init: function () {
        this.appendValueInput("value_road_")
            .appendField("读取光敏传感器的值 在通道")
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['lightsensor'] = function (block) {
    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);

    pythonGenerator.definitions_['light'] = `from educore import light\n`;

    let definitions = `light_${value_road_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=light(${value_road_})`;

    let code = `${definitions}.read()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['soundsensor'] = {
    init: function () {
        this.appendValueInput("value_road_")
            .appendField("读取声敏传感器模拟值 在通道")
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['soundsensor'] = function (block) {
    pythonGenerator.definitions_['sound'] = `from educore import sound\n`;

    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);
    let definitions = `sound_${value_road_.replace('=', '')}`
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=sound(${value_road_})`;

    let code = `${definitions}.read()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['compass_more'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("读取指南针的方向值")
        this.appendValueInput("value_road_sda")
            .appendField(" sda=")
        this.appendValueInput("value_road_scl")
            .appendField(" scl=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.setInputsInline(false);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['compass_more'] = function (block) {
    pythonGenerator.definitions_['compass'] = `from educore import compass\n`;

    let value_road_sda = pythonGenerator.valueToCode(block, 'value_road_sda', Order.ATOMIC);
    let value_road_scl = pythonGenerator.valueToCode(block, 'value_road_scl', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);

    let definitions
    if (value_road_sda !== "None" && value_road_scl !== "None") {
        definitions = `compass_${value_road_sda}_${value_road_scl}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=compass(sda=${value_road_sda},scl=${value_road_scl},port=None)\n${definitions}.adjust()`;
    } else {
        definitions = `compass_${value_road_port.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=compass(sda=None,scl=None,${value_road_port})\n${definitions}.adjust()`;
    }

    let code = `${definitions}.direction()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['atmos'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("读取大气压数据")
        this.appendValueInput("value_road_sda")
            .appendField(" sda=")
        this.appendValueInput("value_road_scl")
            .appendField(" scl=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.setInputsInline(false);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['atmos'] = function (block) {
    pythonGenerator.definitions_['pressure'] = `from educore import pressure\n`;

    let value_road_sda = pythonGenerator.valueToCode(block, 'value_road_sda', Order.ATOMIC);
    let value_road_scl = pythonGenerator.valueToCode(block, 'value_road_scl', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);

    let definitions
    if (value_road_sda !== "None" && value_road_scl !== "None") {
        definitions = `pressure_${value_road_sda}_${value_road_scl}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=pressure(sda=${value_road_sda},scl=${value_road_scl},port=None)\n`;
    } else {
        definitions = `pressure_${value_road_port.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=pressure(sda=None,scl=None,${value_road_port})\n`;
    }

    let code = `${definitions}.read()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['ds18b20'] = {
    init: function () {
        this.appendValueInput("value_road_")
            .appendField("获取测温针数据 在通道")
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['ds18b20'] = function (block) {
    pythonGenerator.definitions_['ds18b20'] = `from educore import ds18b20\n`;

    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);

    let definitions = `ds18b20_${value_road_.replace('=', '')}`;
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=ds18b20(${value_road_})`;

    let code = `${definitions}.read()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['tsd'] = {
    init: function () {
        this.appendValueInput("value_road_")
            .appendField("读取人体红外数据 在通道")
        this.setInputsInline(true);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['tsd'] = function (block) {
    pythonGenerator.definitions_['tsd'] = `from educore import tsd\n`;

    let value_road_ = pythonGenerator.valueToCode(block, 'value_road_', Order.ATOMIC);

    let definitions = `tsd_${value_road_.replace('=', '')}`;
    pythonGenerator.definitions_[`${definitions}`] = `${definitions}=tsd(${value_road_})`;

    let code = `${definitions}.read()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['accelerometer'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("读取加速度计数据")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["x轴", "X"],
                ["y轴", "Y"],
                ["z轴", "Z"],
                ["摇晃检测", 'shake']
            ]), "value_status_")
        this.appendValueInput("value_road_sda")
            .appendField(" sda=")
        this.appendValueInput("value_road_scl")
            .appendField(" scl=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.setInputsInline(false);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Any");
    }
};
pythonGenerator.forBlock['accelerometer'] = function (block) {
    pythonGenerator.definitions_['accelerometer'] = `from educore import accelerometer\n`;

    let value_road_sda = pythonGenerator.valueToCode(block, 'value_road_sda', Order.ATOMIC);
    let value_road_scl = pythonGenerator.valueToCode(block, 'value_road_scl', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);
    let value_status_ = block.getFieldValue('value_status_');

    let definitions
    if (value_road_sda !== "None" && value_road_scl !== "None") {
        definitions = `accelerometer_${value_road_sda}_${value_road_scl}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=accelerometer(sda=${value_road_sda},scl=${value_road_scl},port=None)\n`;
    } else {
        definitions = `accelerometer_${value_road_port.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}=accelerometer(sda=None,scl=None,${value_road_port})\n`;
    }

    let code = `${definitions}.${value_status_}()`;
    return [code, Order.ATOMIC]
};
Blockly.Blocks['rfid_init'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("搜索IC卡")
        this.appendValueInput("value_road_sda")
            .appendField(" sda=")
        this.appendValueInput("value_road_scl")
            .appendField(" scl=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['rfid_init'] = function (block) {
    pythonGenerator.definitions_['rfid'] = `from educore import rfid\n`;

    let value_road_sda = pythonGenerator.valueToCode(block, 'value_road_sda', Order.ATOMIC);
    let value_road_scl = pythonGenerator.valueToCode(block, 'value_road_scl', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);

    let definitions
    if (value_road_sda !== "None" && value_road_scl !== "None") {
        definitions = `rfid_${value_road_sda}_${value_road_scl}`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}= rfid(sda=${value_road_sda},scl=${value_road_scl},port=None)\n`;
    } else {
        definitions = `rfid_${value_road_port.replace('=', '')}_`
        pythonGenerator.definitions_[`${definitions}`] = `${definitions}= rfid(sda=None,scl=None,${value_road_port})\n`;
    }

    return `${definitions}sn=${definitions}.scanning(wait=True)\n`
};
Blockly.Blocks['rfid'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("获取IC卡序列号")
        this.appendValueInput("value_road_sda")
            .appendField(" sda=")
        this.appendValueInput("value_road_scl")
            .appendField(" scl=")
        this.appendValueInput("value_road_port")
            .appendField(" 端口")
        this.setInputsInline(false);
        this.setColour("#FFC003");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "String");
    }
};
pythonGenerator.forBlock['rfid'] = function (block) {
    let value_road_sda = pythonGenerator.valueToCode(block, 'value_road_sda', Order.ATOMIC);
    let value_road_scl = pythonGenerator.valueToCode(block, 'value_road_scl', Order.ATOMIC);
    let value_road_port = pythonGenerator.valueToCode(block, 'value_road_port', Order.ATOMIC);

    let definitions
    if (value_road_sda !== "None" && value_road_scl !== "None") {
        definitions = `rfid_${value_road_sda}_${value_road_scl}`
    } else {
        definitions = `rfid_${value_road_port.replace('=', '')}_`
    }

    var code = `${definitions}sn.serial_number()`;

    return [code, Order.ATOMIC]
};