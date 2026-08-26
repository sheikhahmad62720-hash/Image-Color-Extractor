<script setup>
defineProps({
    color: { type: Object, required: true },
});
</script>

<template>
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Dominant Color</h3>

        <div class="flex flex-col items-center gap-4">
            <div
                class="h-24 w-full rounded-xl ring-1 ring-gray-200"
                :style="{ backgroundColor: color.hex }"
            ></div>

            <div class="text-center">
                <p class="text-2xl font-bold text-gray-800 font-mono">{{ color.hex }}</p>
                <p class="mt-1 text-sm font-semibold text-indigo-600">{{ color.percentage }}% of image</p>
            </div>
        </div>
    </div>
</template>
