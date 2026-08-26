<script setup>
const props = defineProps({
    modelValue: { type: Number, default: 8 },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'extract']);

function onInput(e) {
    emit('update:modelValue', parseInt(e.target.value));
}
</script>

<template>
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Extraction Options</h3>

        <div class="space-y-4">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <label class="text-sm font-medium text-gray-700">Number of Colors</label>
                    <span class="text-sm font-bold text-indigo-600">{{ modelValue }}</span>
                </div>
                <input
                    type="range"
                    :value="modelValue"
                    min="5"
                    max="20"
                    step="1"
                    :disabled="disabled"
                    @input="onInput"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                />
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5</span>
                    <span>20</span>
                </div>
            </div>

            <button
                @click="$emit('extract')"
                :disabled="disabled"
                class="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {{ disabled ? 'Extracting...' : 'Extract Colors' }}
            </button>
        </div>
    </div>
</template>
