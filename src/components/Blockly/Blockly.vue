<script setup lang="ts">
import * as Blockly from 'blockly/core'
import * as Zh from 'blockly/msg/zh-hans';
import '@/components/Blockly/js/custom_category'
import '@/components/Blockly/js/toolbox_style.css'
import '@/components/Blockly/js/theme'
import 'blockly/blocks';
import 'blockly/python';

import options from '@/components/Blockly/config/options.json'
import toolbox from '@/components/Blockly/config/toolbox.json'
import '@/components/Blockly/customBlocks/func'
import '@/components/Blockly/customBlocks/var'
import '@/components/Blockly/customBlocks/dict'
import '@/components/Blockly/customBlocks/input'
import '@/components/Blockly/customBlocks/output'
import '@/components/Blockly/customBlocks/network'
import '@/components/Blockly/customBlocks/radio'
import '@/components/Blockly/customBlocks/time'

import {onMounted, ref} from "vue";
import {WorkspaceSvg} from "blockly/core/workspace_svg";
import {pythonGenerator} from "blockly/python";
import {ElMessage} from "element-plus";
import {CaretRight, Checked, Search} from "@element-plus/icons-vue";

let mainUrl='https://cloud.leihoorobot.com/w/lelink_weapp/index.html'
let props = {data: {index: 'cloud-0', item: {xml: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'}}}

let blocklyId = props.data.index
let workspace: WorkspaceSvg
const codeLook = ref(false)
const codeLookContent = ref('')

onMounted(() => {
    handleParam()
    blockInit()

})

function btoaZH(str: string) {
    const uint8Array = new TextEncoder().encode(str);

    return btoa(String.fromCharCode(...uint8Array));
}

function atobZH(base64Encoded: string) {
    const decodedUint8Array = new Uint8Array(atob(base64Encoded).split("").map(char => char.charCodeAt(0)));

    return new TextDecoder().decode(decodedUint8Array);
}

let project_id = ''

function handleParam() {
    const url = window.location.href;
    console.log(url);
// 创建一个 URL 对象
    const urlObj = new URL(url);

// 获取所有的 URL 参数
    const params = new URLSearchParams(urlObj.search);

// 示例：获取名为 'paramName' 的参数值
    project_id = params.get('project_id');

    props.data.item.xml = atobZH(params.get('xml'));
}

function blockInit() {
    //缩进设置
    pythonGenerator.INDENT = '    ';


    Blockly.setLocale(Zh)
    options.toolbox = toolbox
    //@ts-ignore
    workspace = Blockly.inject(blocklyId, options);
    console.log(props.data.item.xml);
    let dom = Blockly.utils.xml.textToDom(props.data.item.xml)
    Blockly.Xml.domToWorkspace(dom, workspace);
    setTimeout(workspaceResize, 100)

}

function workspaceResize() {
    Blockly.svgResize(workspace);
    workspace.scrollCenter()
}

function run() {
    let code=pythonGenerator.workspaceToCode(workspace)
    code = code.replaceAll('\t', '    ')
    let unicodeStr = code.replace(/[\u4e00-\u9fa5，。！？：；、（）—《》‘’“”]/g, function (char) {
        return "\\u" + char.charCodeAt(0).toString(16);
    });
    code = encodeURIComponent(btoa(unicodeStr))

    let dom = Blockly.Xml.workspaceToDom(workspace)
    let xml = encodeURIComponent(btoaZH(Blockly.Xml.domToText(dom)));

    window.location.replace(`${mainUrl}?type=codeup&xml=${xml}&project_id=${project_id}&code=${code}`);
}

function save() {
    let dom = Blockly.Xml.workspaceToDom(workspace)
    let arr = props.data.index.split('-')

    if (arr[0] === 'local') {
        let xml = encodeURIComponent(Blockly.Xml.domToText(dom));
        let data_json = JSON.parse(localStorage.getItem('LeLinkLeightLocalProject'))
        let index = data_json.findIndex(i => i.id === parseInt(arr[1]))

        data_json[index].xml = xml

        localStorage.setItem('LeLinkLeightLocalProject', JSON.stringify(data_json))
        ElMessage({type: "success", message: "成功"})

    } else if (arr[0] === 'cloud') {
        let xml = encodeURIComponent(btoaZH(Blockly.Xml.domToText(dom)));

        window.location.replace(`${mainUrl}?type=save&xml=${xml}&project_id=${project_id}`);
    }
}

function codeLookOpen() {
    codeLook.value = true
    codeLookContent.value = pythonGenerator.workspaceToCode(workspace)
}

</script>

<template>
    <div style="width: 100%;text-align: center;margin-bottom: 10px;max-height: 7vh;">
        <el-tooltip class="box-item" effect="dark" content="运行" placement="top" :hide-after=0>
            <el-button type="success" @click="run" :icon="CaretRight" circle size="default"/>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="保存记录" placement="top" :hide-after=0>
            <el-button type="success" @click="save" :icon="Checked" circle size="default"/>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="查看代码" placement="top" :hide-after=0>
            <el-button type="success" @click="codeLookOpen" :icon="Search" circle size="default"/>
        </el-tooltip>
    </div>

    <div style="height:93vh;">
        <div :id="blocklyId" style="height: inherit"/>
    </div>
    <el-drawer v-model="codeLook" title="code" :with-header="false">
        <pre>{{ codeLookContent }}</pre>
    </el-drawer>
</template>

<style scoped>
</style>