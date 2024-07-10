import * as Blockly from 'blockly/core'
import {Order, pythonGenerator} from 'blockly/python';

Blockly.Blocks['wifi_conn'] = {
    init: function () {
        this.appendValueInput("value_ssid_")
            .setCheck("String")
            .appendField("wifi名称:");
        this.appendValueInput("value_psw_")
            .setCheck("String")
            .appendField("wifi密码:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#13B013");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['wifi_conn'] = function (block) {
    pythonGenerator.definitions_['wifi'] = 'from leight import wifi'
    let value_ssid_ = pythonGenerator.valueToCode(block, 'value_ssid_', Order.ATOMIC);
    let value_psw_ = pythonGenerator.valueToCode(block, 'value_psw_', Order.ATOMIC);
    return `wifi.connect(${value_ssid_},${value_psw_})\n`;
};
Blockly.Blocks['iot_conn'] = {
    init: function () {
        this.appendValueInput("value_id_")
            .setCheck("String")
            .appendField("连接MQTT ClientID：");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#13B013");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['iot_conn'] = function (block) {
    pythonGenerator.definitions_['mqttclient'] = 'from leight import mqttclient'
    let value_id_ = pythonGenerator.valueToCode(block, 'value_id_', Order.ATOMIC);
    return `mqttclient.connect(server="cloud.leihoorobot.com",port=1883,client_id=${value_id_})\n`;
};
Blockly.Blocks['msg_send'] = {
    init: function () {
        this.appendValueInput("value_topic_")
            .setCheck("String")
            .appendField("给主题");
        this.appendValueInput("value_msg_")
            .setCheck("String")
            .appendField("发布消息:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#13B013");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['msg_send'] = function (block) {
    pythonGenerator.definitions_['mqttclient'] = 'from leight import mqttclient'
    let value_topic_ = pythonGenerator.valueToCode(block, 'value_topic_', Order.ATOMIC);
    let value_msg_ = pythonGenerator.valueToCode(block, 'value_msg_', Order.ATOMIC);
    return `mqttclient.publish(${value_topic_},${value_msg_})\n`;
};
Blockly.Blocks['msg_get_once'] = {
    init: function () {
        this.appendValueInput("value_msg_")
            .setCheck("String")
            .appendField("从主题:");
        this.appendDummyInput()
            .appendField("接收一次消息")
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour("#13B013");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['msg_get_once'] = function (block) {
    pythonGenerator.definitions_['mqttclient'] = 'from leight import mqttclient'

    let value_msg_ = pythonGenerator.valueToCode(block, 'value_msg_', Order.ATOMIC);
    let code = `mqttclient.message(topic=${value_msg_})`;

    return [code, Order.ATOMIC];
};
Blockly.Blocks['msg_receive_do'] = {
    init: function () {
        this.appendValueInput("value_msg_")
            .setCheck("String")
            .appendField("当主题:");
        this.appendDummyInput()
            .appendField("收到消息时");
        this.appendStatementInput('INNER_BLOCKS')
            .setCheck(null)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#13B013");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
pythonGenerator.forBlock['msg_receive_do'] = function (block) {
    pythonGenerator.definitions_['mqttclient'] = 'from leight import mqttclient'

    let innerBlocksCode = pythonGenerator.statementToCode(block, 'INNER_BLOCKS');
    if (innerBlocksCode === "") innerBlocksCode = "    pass\n"

    let value_msg_ = pythonGenerator.valueToCode(block, 'value_msg_', Order.ATOMIC);

    pythonGenerator.definitions_[`iot_defin_msg_receive`] = `def msg_receive_func():\n${innerBlocksCode}`;
    return `mqttclient.received(topic=${value_msg_},callback=msg_receive_func)\n`;
};