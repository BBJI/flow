import { customAlphabet } from "nanoid";
import { MarkerType } from "@vue-flow/core";

// 生成随机字符串
export const random = (
	num = 9,
	alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) => {
	const nanoid = customAlphabet(alphabet, num);
	return nanoid();
};
// 生成新增节点配置
export const generateNodeConfig = (config) => {
    const id = random()
    config.data.id = id
    return {
		id,
		class: (node) => [
			"custom-node-container",
			{ "custom-node-selected": node.selected },
		],
		...config,
	}
};
// 根据配置数据赋值节点和边
export const generateNodesAndEdges = (data) => {
	const nodes =
		data?.nodeList?.map((item) => {
			return {
				class: (node) => [
					"custom-node-container",
					{ "custom-node-selected": node.selected },
				],
				id: item.id,
				label: item.name,
				type: item.type,
				position: { x: parseInt(item.left, 10), y: parseInt(item.top, 10) },
				data: { ...item },
			};
		}) || [];
	const edges =
		data?.lineList?.map((item) => {
			return {
				id: `${item.from}-${item.to}`,
				animated: true,
				type: "customEdge",
				markerEnd: MarkerType.ArrowClosed,
				source: item.from,
				target: item.to,
				data: { ...item },
			};
		}) || [];
    return {nodes, edges}
};