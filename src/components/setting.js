import StartNode from "./nodes/StartNode/index.vue";
import AnswerNode from "./nodes/AnswerNode/index.vue";

export const components = {
    START: StartNode,
    ANSWER: AnswerNode,
}

export const menus = [
    {
		name: "起始节点",
		type: "START",
	},
	{
		name: "应答节点",
		type: "ANSWER",
	},
]