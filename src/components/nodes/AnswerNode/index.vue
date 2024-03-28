<script setup>
import { Position, Handle, useVueFlow } from "@vue-flow/core";
import { ref } from "vue";
import { ElForm, ElFormItem, ElSelect, ElOption } from "element-plus";

const props = defineProps(["id", "label", "selected", "data"]);

const { removeNodes } = useVueFlow();

const answerArea2Data = ref({
	model: "",
});
const rules = ref({
	model: [{ required: true, message: "请选择AI模型", trigger: "change" }],
});

// 删除节点
const handleRemove = (props) => {
	removeNodes(props.id);
};
</script>

<template>
	<div class="answer-container">
		<div class="answer-top">
			<div class="answer-header">
				<img class="answer-icon" src="../../../assets/vue.svg" />
				<div class="answer-title">{{ label }}</div>
			</div>
			<div class="answer-desc">AI大模型对话</div>
		</div>
		<div class="answer-input">输入</div>
		<div class="answer-area1">
			<Handle
				class="node-handle"
				id="answerEmit"
				type="source"
				:position="Position.Left"
			>
				<div class="node-desc">触发器</div>
			</Handle>
			<Handle
				class="node-handle handle-end"
				id="answerEnd"
				type="source"
				:position="Position.Right"
			>
				<div class="node-desc">模块调用结束</div>
			</Handle>
		</div>
		<div class="answer-area2">
			<el-form label-position="top" :model="answerArea2Data" :rules="rules">
				<el-form-item label="AI 模型" prop="model">
					<el-select
						class="nodrag nowheel"
						v-model="answerArea2Data.model"
						placeholder="请选择AI模型"
						size="small"
						@change="
							(val) => {
								data.model = val;
							}
						"
					>
						<el-option label="模型1" value="model1" />
						<el-option label="模型2" value="model2" />
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div class="answer-area3">
			<Handle
				class="node-handle"
				id="userQuestion1"
				type="source"
				:position="Position.Left"
			>
				<div class="node-desc">用户问题</div>
			</Handle>
			<Handle
				class="node-handle handle-end"
				id="userQuestion2"
				type="source"
				:position="Position.Right"
			>
				<div class="node-desc">用户问题</div>
			</Handle>
		</div>
		<div class="answer-output">输出</div>
	</div>
</template>

<style scoped lang="scss">
.answer-container {
	width: 300px;
	.answer-top {
		border-bottom: 1px solid #e8e8e8;
		padding: 10px;
		.answer-header {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 10px;
			.answer-icon {
				width: 20px;
			}
			.answer-title {
				font-size: 16px;
			}
		}
		.answer-desc {
			font-size: 12px;
			padding: 10px 0;
			text-align: left;
		}
	}
	.answer-input,
	.answer-output {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		background-color: rgb(248, 248, 248);
		padding: 10px;
	}
	.answer-area1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		height: 40px;
		border-top: 1px solid #e8e8e8;
		.handle-end {
			border-color: rgb(231, 209, 24);
		}
	}
	.answer-area2 {
		padding: 10px;
	}
	.answer-area3 {
		position: relative;
		height: 40px;
		border-bottom: 1px solid #e8e8e8;
	}
}
</style>
