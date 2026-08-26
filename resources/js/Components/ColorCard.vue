<script setup>
import { ref } from 'vue';

const props = defineProps({
    color: { type: Object, required: true },
});

const copiedField = ref('');

async function copyToClipboard(text, field) {
    try {
        await navigator.clipboard.writeText(text);
        copiedField.value = field;
        setTimeout(() => { copiedField.value = ''; }, 1500);
    } catch {
        // Clipboard API not available
    }
}
</script>

<template>
    <div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
        <div class="h-28 w-full" :style="{ backgroundColor: color.hex }"></div>

        <div class="p-4 space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">HEX</span>
                <div class="flex items-center gap-2">
                    <span class="font-mono text-sm font-semibold text-gray-800">{{ color.hex }}</span>
                    <button
                        @click="copyToClipboard(color.hex, 'hex')"
                        class="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        title="Copy HEX"
                    >
                        <svg v-if="copiedField !== 'hex'" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <svg v-else class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">RGB</span>
                <div class="flex items-center gap-2">
                    <span class="font-mono text-xs text-gray-600">{{ color.rgb }}</span>
                    <button
                        @click="copyToClipboard(color.rgb, 'rgb')"
                        class="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        title="Copy RGB"
                    >
                        <svg v-if="copiedField !== 'rgb'" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <svg v-else class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">HSL</span>
                <div class="flex items-center gap-2">
                    <span class="font-mono text-xs text-gray-600">{{ color.hsl }}</span>
                    <button
                        @click="copyToClipboard(color.hsl, 'hsl')"
                        class="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        title="Copy HSL"
                    >
                        <svg v-if="copiedField !== 'hsl'" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <svg v-else class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="border-t border-gray-100 pt-3">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Usage</span>
                <p class="mt-1 text-lg font-bold text-gray-800">{{ color.percentage }}%</p>
            </div>
        </div>
    </div>
</template>
