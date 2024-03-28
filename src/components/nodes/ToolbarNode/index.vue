<script setup>
import { useVueFlow } from "@vue-flow/core";
import { NodeToolbar } from "@vue-flow/node-toolbar";
import { components } from "../../setting";
import { generateNodeConfig, random } from "../../utils";
import { ref } from "vue";
import { ElButton, ElDialog, ElInput } from "element-plus";

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps([
	"id",
	"label",
	"selected",
	"type",
	"position",
	"data",
]);
const { removeNodes, addNodes, updateNode } = useVueFlow();
const NodeComponent = components[props.type];
const renameDialogVisible = ref(false);
const renameVal = ref(props.label);

// 打开重名名对话框
const openRenameDialog = () => {
	renameDialogVisible.value = true;
};
// 提交重命名
const submitRename = () => {
	renameDialogVisible.value = false;
	updateNode(props.id, { label: renameVal.value });
};
// 关闭重命名对话框
const closeRenameDialog = () => {
	renameDialogVisible.value = false;
};
</script>

<template>
	<div>
		<NodeToolbar
			:is-visible="selected"
			:node-id="id"
			position="right"
			align="start"
		>
			<div class="toolbar-actions">
				<el-button size="small" @click="openRenameDialog">重命名</el-button>
				<el-button size="small" @click="removeNodes(id)">删除</el-button>
				<el-button
					size="small"
					@click="
						addNodes(
							generateNodeConfig({
								...props,
								id: random(),
								selected: false,
								position: { x: position.x + 100, y: position.y + 100 },
							})
						)
					"
					>复制</el-button
				>
			</div>
		</NodeToolbar>
		<NodeComponent v-bind="props" />
		<el-dialog
			v-model="renameDialogVisible"
			title="重命名"
			width="500"
			append-to-body
		>
			<el-input v-model="renameVal" />
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="closeRenameDialog">关闭</el-button>
					<el-button type="primary" @click="submitRename">确认</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
.dialog-footer {
	display: flex;
	gap: 10px;
	justify-content: flex-end;
}
</style>
../../setting../../utils
