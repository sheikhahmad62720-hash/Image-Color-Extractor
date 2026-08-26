<script setup>
import { ref } from 'vue';
import { downloadPalette } from '@/Utils/paletteDownloader';
import ColorCard from './ColorCard.vue';

const props = defineProps({
    colors: { type: Array, required: true },
});

const copiedAll = ref(false);

async function copyAllColors() {
    const hexValues = props.colors.map(c => c.hex).join('\n');
    try {
        await navigator.clipboard.writeText(hexValues);
        copiedAll.value = true;
        setTimeout(() => { copiedAll.value = false; }, 2000);
    } catch {
        // Clipboard API not available
    }
}

function handleDownload() {
    downloadPalette(props.colors);
}
</script>

<template>
    <div class="space-y-6">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Color Palette</h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ColorCard
                v-for="(color, index) in colors"
                :key="index"
                :color="color"
            />
        </div>

        <div class="flex flex-wrap gap-3">
            <button
                @click="copyAllColors"
                class="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <svg v-if="!copiedAll" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {{ copiedAll ? 'Colors copied' : 'Copy All Colors' }}
            </button>

            <button
                @click="handleDownload"
                class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Palette
            </button>
        </div>
    </div>
</template>
