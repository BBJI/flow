<script setup>
import {
	BaseEdge,
	EdgeLabelRenderer,
	getBezierPath,
	useVueFlow,
} from "@vue-flow/core";
import { computed } from "vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";

const props = defineProps([
	"id",
	"sourceX",
	"sourceY",
	"targetX",
	"targetY",
	"sourcePosition",
	"targetPosition",
	"markerEnd",
	"style",
	"data",
	"selected",
]);

const { removeEdges } = useVueFlow();

const path = computed(() => getBezierPath(props));
</script>

<script>
export default {
	inheritAttrs: false,
};
</script>

<template>
	<BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />
	<EdgeLabelRenderer>
		<div
			v-if="selected"
			:style="{
				pointerEvents: 'all',
				position: 'absolute',
				transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
			}"
			class="nodrag nopan"
		>
			<el-button
				class="edge-close-button"
				:icon="CircleCloseFilled"
				text
				circle
				type="primary"
				@click="removeEdges(id)"
			/>
		</div>
	</EdgeLabelRenderer>
</template>

<style scoped lang="scss">
.edge-close-button:hover {
	background-color: rgba(255, 255, 255, 0) !important;
}
</style>
