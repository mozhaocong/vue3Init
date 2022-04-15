<template>
    <a-layout style="padding: 0 24px 24px;overflow: auto">
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="app-main">
            <router-view v-slot="{ Component }">
                <!--                <keep-alive  :include="includeList" :max="10">-->
                <keep-alive v-if="route.meta.keepAlive" :include="includeList" :max="10">
                    <component :is="Component"  :key="route.fullPath"/>
                </keep-alive>
                <component v-else :is="Component"  :key="route.fullPath"/>
            </router-view>
        </a-layout-content>
    </a-layout>

</template>

<script lang="ts">
import {defineComponent, computed, watch, toRefs, reactive} from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'Content',
	setup() {
		const route = useRoute()

        const state = reactive<{ includeList: any[] }>({
            includeList: []
        })
        watch(() => route,(newVal:any)=>{
            if(newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1){
                state.includeList.push(newVal.name);
            }
        },{deep:true, immediate: true}) // 开启深度监听
		return {
			route,
            ...toRefs(state)
		}
	}
})
</script>
