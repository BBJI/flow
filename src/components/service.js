export const getServiceData = async () => {
    return {
        "name": "新建流程",
        "nodeList": [
            {
            "id": "x21bnobip",
            "name": "起始节点",
            "type": "START",
            "left": "21px",
            "top": "100px",
            "ico": "el-icon-tickets",
            "state": ""
            },
            {
            "id": "z6z2x2jiok",
            "name": "应答节点",
            "type": "ANSWER",
            "left": "500px",
            "top": "50px",
            "ico": "el-icon-phone-outline",
            "state": ""
            },
            // {
            // "id": "ymvxt8kad",
            // "name": "回复节点",
            // "type": "SPEAK",
            // "left": "539px",
            // "top": "105px",
            // "ico": "el-icon-video-play",
            // "state": "",
            // "text": "你好，请提供地址？",
            // "waitTime": "3000"
            // },
            // {
            // "id": "u2gsxxnd8k",
            // "name": "挂机节点",
            // "type": "HANGUP",
            // "left": "557px",
            // "top": "358px",
            // "ico": "el-icon-phone",
            // "state": ""
            // },
            // {
            // "id": "is6lhv0f6t",
            // "name": "结束节点",
            // "type": "END",
            // "left": "930px",
            // "top": "359px",
            // "ico": "el-icon-tickets",
            // "state": ""
            // },
            // {
            // "id": "wb2r8dfi7k",
            // "name": "意向节点",
            // "type": "DETECT_INTENTION",
            // "left": "882px",
            // "top": "234px",
            // "ico": "el-icon-monitor",
            // "state": "",
            // "template": "```\n#{['conversation']}\n```\n\n根据以上角色的对话内容，#{['text']}，输出json格式如：{\"intent\": true or false}",
            // "jsonPath": "$.intent",
            // "text": "判断用户是否提供地址，提供为true，未提供为false"
            // },
            // {
            // "id": "xeudbz0cn8",
            // "name": "条件节点",
            // "type": "IF",
            // "left": "559px",
            // "top": "238px",
            // "ico": "el-icon-open",
            // "state": "",
            // "expression": "#{['input']}"
            // },
            // {
            // "id": "0eyn5tw3sn",
            // "name": "等待回复",
            // "type": "SPEAK_AND_DETECT",
            // "left": "878px",
            // "top": "108px",
            // "ico": "el-icon-headset",
            // "state": "",
            // "text": ""
            // }
        ],
        "lineList": [
            {
            "from": "x21bnobip",
            "to": "z6z2x2jiok"
            },
            // {
            // "from": "z6z2x2jiok",
            // "to": "ymvxt8kad"
            // },
            // {
            // "from": "u2gsxxnd8k",
            // "to": "is6lhv0f6t"
            // },
            // {
            // "from": "wb2r8dfi7k",
            // "to": "xeudbz0cn8"
            // },
            // {
            // "from": "xeudbz0cn8",
            // "to": "u2gsxxnd8k",
            // "label": "true"
            // },
            // {
            // "from": "xeudbz0cn8",
            // "to": "ymvxt8kad",
            // "label": "false"
            // },
            // {
            // "from": "ymvxt8kad",
            // "to": "0eyn5tw3sn"
            // },
            // {
            // "from": "0eyn5tw3sn",
            // "to": "wb2r8dfi7k"
            // }
        ],
        "id": "5zqeyj"
    }
}