import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

Blockly.Blocks['time_init'] = {
    init: function () {
        this.appendDummyInput("tmp")
            .appendField("同步时间")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['time_init'] = function () {
    pythonGenerator.definitions_['ntptime'] = `import ntptime\n`;
    pythonGenerator.definitions_['RTC'] = `from machine import RTC\n`;

    return `ntptime.host="cn.pool.ntp.org"\nntptime.settime()\n(year, month, day, weekday, hours, minutes, seconds, subseconds) = RTC().datetime()\nRTC().datetime((year, month, day, weekday, hours+8, minutes, seconds, subseconds))\n`;
};
Blockly.Blocks['time_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("当前时间");
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Number");
    }
};
pythonGenerator.forBlock['time_get'] = function () {
    pythonGenerator.definitions_['time'] = `import time\n`;

    return [`f'{time.localtime()[0]}年{time.localtime()[1]}月{time.localtime()[2]}日 {time.localtime()[3]}:{time.localtime()[4]}:{time.localtime()[5]}'` ,Order.ATOMIC];
};
Blockly.Blocks['alarm'] = {
    init: function () {
        this.appendValueInput("value_h_")
            .appendField("闹钟 ");
        this.appendValueInput("value_m_")
            .appendField("时")
        this.appendDummyInput()
            .appendField("分");
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null)

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['alarm'] = function (block) {
    pythonGenerator.definitions_['_thread'] = `import _thread\n`;
    pythonGenerator.definitions_['time'] = `import time\n`;

    let value_h_ = pythonGenerator.valueToCode(block, 'value_h_', Order.ATOMIC);
    let value_m_ = pythonGenerator.valueToCode(block, 'value_m_', Order.ATOMIC);

    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode === "") innerBlocksCode = "            "
    let temp = ''
    for (const i of innerBlocksCode.split('\n')) {
        temp += `        ${i}\n`
    }
    pythonGenerator.definitions_[`alarm_callback`] = `def alarm_callback(h,m):\n    while True:\n        if time.localtime()[3] == h and time.localtime()[4] == m:\n${temp}            break\n        time.sleep(1)\n    _thread.exit()\n`;

    return `_thread.start_new_thread(alarm_callback, [${value_h_}, ${value_m_}])\n`
};
Blockly.Blocks['interval'] = {
    init: function () {
        this.appendValueInput("value_s_")
            .appendField("定时器 每");
        this.appendDummyInput()
            .appendField("秒执行一次");
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
pythonGenerator.forBlock['interval'] = function (block) {
    pythonGenerator.definitions_['Timer'] = `from machine import Timer\n`;

    let value_s_ = pythonGenerator.valueToCode(block, 'value_s_', Order.ATOMIC);

    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode === "") innerBlocksCode = "    pass\n"

    pythonGenerator.definitions_[`Timer_callback`] = `def Timer_callback(e):\n${innerBlocksCode}\n`;

    return `Timer(3).init(period=${value_s_ * 1000},mode=Timer.PERIODIC,callback=Timer_callback)\n`
};
Blockly.Blocks['interval_stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("中断计时器");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#D2691E");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['interval_stop'] = function () {
    pythonGenerator.definitions_['Timer'] = `from machine import Timer\n`;

    return `Timer(3).deinit()\n`
};