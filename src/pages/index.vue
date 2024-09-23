<script setup lang="ts">
const { $logger } = useNuxtApp();
onMounted(() => {
    $logger.info('onMounted');
})
</script>

<template>
    <div>
        <button @click="$logger.warn('Button Clicked')">Click Me</button>
    </div>
</template>