<script setup>
import { computed } from 'vue';

const props = defineProps({
    imageUrl: { type: String, required: true },
    fileName: { type: String, default: '' },
    fileSize: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
});

const formattedSize = computed(() => {
    const bytes = props.fileSize;
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return bytes + ' B';
});

const fileType = computed(() => {
    const name = props.fileName.toLowerCase();
    if (name.endsWith('.png')) return 'PNG';
    if (name.endsWith('.webp')) return 'WEBP';
    return 'JPEG';
});
</script>

<template>
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Image Preview</h3>

        <div class="flex justify-center">
            <img
                :src="imageUrl"
                alt="Uploaded preview"
                class="max-h-80 rounded-xl object-contain ring-1 ring-gray-200"
            />
        </div>

        <div class="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span class="font-medium">{{ width }} &times; {{ height }}</span>
            <span class="text-gray-300">|</span>
            <span>{{ fileType }}</span>
            <span class="text-gray-300">|</span>
            <span>{{ formattedSize }}</span>
        </div>
    </div>
</template>
