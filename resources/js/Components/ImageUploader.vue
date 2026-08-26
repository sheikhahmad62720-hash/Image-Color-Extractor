<script setup>
import { ref } from 'vue';

const emit = defineEmits(['file-selected']);

const isDragging = ref(false);
const fileInput = ref(null);
const error = ref('');

const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxSize = 10 * 1024 * 1024;

function validateFile(file) {
    if (!file) return 'Please select an image file.';
    if (!allowedTypes.includes(file.type)) return 'Please upload a valid image (PNG, JPG, JPEG, WEBP).';
    if (file.size > maxSize) return 'Maximum file size is 10 MB.';
    return '';
}

function handleFile(file) {
    error.value = validateFile(file);
    if (!error.value) {
        emit('file-selected', file);
    }
}

function onDrop(e) {
    isDragging.value = false;
    const file = e.dataTransfer.files[0];
    handleFile(file);
}

function onDragOver(e) {
    e.preventDefault();
    isDragging.value = true;
}

function onDragLeave() {
    isDragging.value = false;
}

function onFileChange(e) {
    const file = e.target.files[0];
    handleFile(file);
}

function openPicker() {
    fileInput.value.click();
}
</script>

<template>
    <div
        @drop.prevent="onDrop"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        :class="[
            'relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 cursor-pointer',
            isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50',
        ]"
        @click="openPicker"
    >
        <input
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            class="hidden"
            @change="onFileChange"
        />

        <div class="flex flex-col items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
            </div>

            <div>
                <p class="text-lg font-semibold text-gray-700">
                    {{ isDragging ? 'Drop your image here' : 'Drag & Drop your image here' }}
                </p>
                <p class="mt-1 text-sm text-gray-500">or</p>
                <button type="button" class="mt-2 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click.stop="openPicker">
                    Browse Image
                </button>
            </div>

            <div class="text-xs text-gray-400">
                PNG &bull; JPG &bull; JPEG &bull; WEBP &mdash; Maximum 10 MB
            </div>

            <p class="text-xs text-green-600 font-medium">
                Your image stays in your browser. We don't upload or store your image.
            </p>
        </div>

        <p v-if="error" class="mt-4 text-sm text-red-600 font-medium">{{ error }}</p>
    </div>
</template>
