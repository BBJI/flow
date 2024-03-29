<script setup>
import { ref, markRaw, onMounted } from "vue";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { MarkerType, VueFlow, useVueFlow } from "@vue-flow/core";
import CustomEdge from "./edges/CustomEdge/index.vue";
import {
	Plus,
	Download,
	Upload,
	ChatDotRound,
	MessageBox,
} from "@element-plus/icons-vue";
import { menus, components } from "./setting";
import { getServiceData } from "./service";
import ToolbarNode from "./nodes/ToolbarNode/index.vue";
import { generateNodeConfig, generateNodesAndEdges } from "./utils";
import {
	ElMessage,
	ElTooltip,
	ElButton,
	ElDrawer,
	ElInput,
	ElDialog,
} from "element-plus";

const { addEdges, addNodes } = useVueFlow();
const showDrawer = ref(false);
const menuList = menus.map((item) => ({
	config: {
		label: item.name,
		type: item.type,
		position: {
			x: parseInt(item.left, 10) || 500,
			y: parseInt(item.top, 10) || 150,
		},
		data: { ...item },
	},
	component: components[item.type],
}));
// 节点
const nodes = ref([]);
// 边
const edges = ref([]);
// 自定义节点
const nodeTypes = {};
for (let i = 0; i < menuList.length; i++) {
	const config = menuList[i].config;
	nodeTypes[config.type] = markRaw(ToolbarNode);
}
// 自定义边
const edgeTypes = {
	customEdge: markRaw(CustomEdge),
};
const importData = ref("");
const importDialogVisible = ref(false);

// 添加节点
const addNode = (config) => {
	addNodes(generateNodeConfig(config));
};
// 连接节点
const handleConnect = (params) => {
	const { source, target, sourceHandle, targetHandle } = params || {};
	// 连接节点不能为同一个
	if (source === target) return;
	addEdges([
		{
			id: `${source}_${sourceHandle}-${target}_${targetHandle}`,
			animated: true,
			type: "customEdge",
			markerEnd: MarkerType.ArrowClosed,
			...params,
		},
	]);
};
// 展示菜单
const handleShowDrawer = () => {
	showDrawer.value = true;
};
// 获取初始化数据
const getData = async () => {
	const data = await getServiceData();
	const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(data);
	nodes.value = newNodes;
	edges.value = newEdges;
};
// 导入
const handleImport = () => {
	importData.value = "";
	importDialogVisible.value = true;
};
// 导出
const handleExport = () => {
	const data = {
		nodeList: nodes.value.map((item) => item.data),
		lineList: edges.value.map((item) => item.data),
	};
	console.log(data);
};
// 调试对话
const handleTest = () => {
	const data = {
		nodeList: nodes.value.map((item) => item.data),
		lineList: edges.value.map((item) => item.data),
	};
	console.log(data);
};
// 保存
const handleSave = () => {
	const data = {
		nodeList: nodes.value.map((item) => item.data),
		lineList: edges.value.map((item) => item.data),
	};
	console.log(data);
};
// 关闭导入框
const closeImportDialog = () => {
	importDialogVisible.value = false;
};
// 提交导入数据
const submitImportData = () => {
	try {
		const { nodes: newNodes, edges: newEdges } = generateNodesAndEdges(
			JSON.parse(importData.value)
		);
		nodes.value = newNodes;
		edges.value = newEdges;
		importDialogVisible.value = false;
	} catch (err) {
		ElMessage.error("导入失败");
	}
};
onMounted(() => {
	getData();
});
</script>

<template>
	<div class="flow-container">
		<div class="flow-header">
			<el-tooltip content="导入配置" placement="bottom" effect="light">
				<el-button :icon="Download" @click="handleImport"></el-button>
			</el-tooltip>
			<el-tooltip content="导出配置" placement="bottom" effect="light">
				<el-button :icon="Upload" @click="handleExport"></el-button>
			</el-tooltip>
			<el-tooltip content="调试对话" placement="bottom" effect="light">
				<el-button :icon="ChatDotRound" @click="handleTest"></el-button>
			</el-tooltip>
			<el-tooltip content="保存" placement="bottom" effect="light">
				<el-button
					:icon="MessageBox"
					type="primary"
					@click="handleSave"
				></el-button>
			</el-tooltip>
		</div>
		<!-- 调出菜单按钮 -->
		<el-button
			v-if="!showDrawer"
			class="menu-btn"
			type="primary"
			:icon="Plus"
			circle
			@click="handleShowDrawer"
		/>
		<!-- 菜单 -->
		<el-drawer
			v-model="showDrawer"
			direction="ltr"
			:close-on-click-modal="false"
			:modal="false"
			size="100%"
			modal-class="drawer-modal"
		>
			<div class="drawer-modal-menu">
				<el-button
					v-for="(item, index) in menuList"
					:key="index"
					type="primary"
					@click="addNode(item.config)"
					>添加{{ item.config.label }}节点</el-button
				>
			</div>
		</el-drawer>
		<!-- 流程图 -->
		<div style="width: 100%; height: 100%">
			<VueFlow
				v-model:nodes="nodes"
				v-model:edges="edges"
				:node-types="nodeTypes"
				:edge-types="edgeTypes"
				fit-view-on-init
				@connect="handleConnect"
			>
				<Background pattern-color="rgb(213,213,213)" :gap="8" />
				<MiniMap />
				<Controls />
			</VueFlow>
		</div>
		<!-- 导入 -->
		<el-dialog
			v-model="importDialogVisible"
			title="导入"
			width="500"
			append-to-body
		>
			<el-input v-model="importData" type="textarea" :rows="10" />
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="closeImportDialog">关闭</el-button>
					<el-button type="primary" @click="submitImportData">确认</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss">
.flow-container {
	width: 100%;
	height: 100%;
	.flow-header {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: 0 10px;
		border-bottom: 1px solid rgb(223, 226, 234);
		align-items: center;
		user-select: none;
		background: #fbfbfc;
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 20px);
		height: 50px;
		z-index: 999;
	}
	.menu-btn {
		position: fixed;
		left: 30px;
		top: 80px;
		z-index: 9999;
	}
	.drawer-modal {
		width: 300px;
		&-menu {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
}
</style>
