<script setup>
import { Position, Handle, useVueFlow } from "@vue-flow/core";

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(["id", "label", "selected"]);
const { removeNodes } = useVueFlow();
// 删除节点
const handleRemove = () => {
	removeNodes(props.id);
};
</script>

<template>
	<div class="chat-enter-container">
		<div class="chat-enter-top">
			<div class="chat-enter-header">
				<img class="chat-enter-icon" src="../../../assets/vue.svg" />
				<div class="chat-enter-title">{{ label }}</div>
			</div>
			<div class="chat-enter-desc">
				当用户发送一个内容后，流程将会从这个模块开始执行
			</div>
		</div>
		<div class="chat-enter-bottom">
			<Handle
				class="node-handle"
				id="userQuestion"
				type="source"
				:position="Position.Right"
			>
				<div class="node-desc">用户问题</div>
			</Handle>
		</div>
	</div>
</template>

<style scoped lang="scss">
.chat-enter-container {
	.chat-enter-top {
		border-bottom: 1px solid #e8e8e8;
		padding: 10px;
		.chat-enter-header {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 10px;
			.chat-enter-icon {
				width: 20px;
			}
			.chat-enter-title {
				font-size: 16px;
			}
		}
		.chat-enter-desc {
			font-size: 12px;
			padding: 10px 0;
		}
	}
	.chat-enter-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 40px;
		position: relative;
	}
}
</style>
