<script setup>
import { ref, nextTick } from 'vue';
import { Head } from '@inertiajs/vue3';
import { extractColors } from '@/Utils/colorExtractor';
import ImageUploader from '@/Components/ImageUploader.vue';
import ImagePreview from '@/Components/ImagePreview.vue';
import ExtractionControls from '@/Components/ExtractionControls.vue';
import DominantColor from '@/Components/DominantColor.vue';
import ColorPalette from '@/Components/ColorPalette.vue';

const imageUrl = ref('');
const fileName = ref('');
const fileSize = ref(0);
const imgWidth = ref(0);
const imgHeight = ref(0);
const numColors = ref(8);
const colors = ref([]);
const isExtracting = ref(false);
const imageElement = ref(null);

function onFileSelected(file) {
    resetState();
    imageUrl.value = URL.createObjectURL(file);
    fileName.value = file.name;
    fileSize.value = file.size;

    const img = new Image();
    img.onload = () => {
        imgWidth.value = img.naturalWidth;
        imgHeight.value = img.naturalHeight;
        imageElement.value = img;
    };
    img.src = imageUrl.value;
}

async function onExtract() {
    if (!imageElement.value || isExtracting.value) return;

    isExtracting.value = true;
    colors.value = [];

    await nextTick();

    try {
        colors.value = extractColors(imageElement.value, numColors.value);
    } catch {
        // Extraction failed
    } finally {
        isExtracting.value = false;
    }
}

function resetState() {
    if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
    }
    imageUrl.value = '';
    fileName.value = '';
    fileSize.value = 0;
    imgWidth.value = 0;
    imgHeight.value = 0;
    colors.value = [];
    isExtracting.value = false;
    imageElement.value = null;
}
</script>

<template>
    <Head title="ColorExtract" />

    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <header class="mb-10 text-center">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                    Color<span class="text-indigo-600">Extract</span>
                </h1>
                <p class="mt-2 text-lg text-gray-500">Image Color Extractor</p>
                <p class="mt-1 text-sm text-gray-400">Extract beautiful colors from any image.</p>
            </header>

            <div class="space-y-6">
                <ImageUploader v-if="!imageUrl" @file-selected="onFileSelected" />

                <template v-if="imageUrl">
                    <ImagePreview
                        :image-url="imageUrl"
                        :file-name="fileName"
                        :file-size="fileSize"
                        :width="imgWidth"
                        :height="imgHeight"
                    />

                    <ExtractionControls
                        v-model="numColors"
                        :disabled="isExtracting"
                        @extract="onExtract"
                    />

                    <div v-if="isExtracting" class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 text-center">
                        <div class="inline-flex items-center gap-3">
                            <svg class="h-5 w-5 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <div>
                                <p class="font-semibold text-gray-800">Analyzing Image...</p>
                                <p class="text-sm text-gray-500">Extracting dominant colors...</p>
                            </div>
                        </div>
                    </div>

                    <template v-if="colors.length > 0 && !isExtracting">
                        <DominantColor :color="colors[0]" />
                        <ColorPalette :colors="colors" />
                    </template>

                    <div class="text-center">
                        <button
                            @click="resetState"
                            class="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload New Image
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
