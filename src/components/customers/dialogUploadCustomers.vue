<template>
  <VCard title="Cargar archivo de clientes impagados">
    <DialogCloseBtn
      variant="text"
      size="small"
      @click="closeDialog"
    />

    <VCardText>
      <VRow>
        <VCol cols="12">
          <VFileInput
            v-model="file"
            :rules="rules"
            accept=".csv"
            label="Archivo"
          />
        </VCol>
      </VRow>
    </VCardText>

    <VCardText class="d-flex justify-end gap-2">
      <VBtn @click="closeDialog">
        Save
      </VBtn>
    </VCardText>
  </VCard>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['closeDialog'])

const file = ref()
const rules = [fileList => !fileList || !fileList.length || fileList[0].size < 100000000 || 'Archive size should be less than 100 MB!']


const closeDialog = () => {
  emit('closeDialog')
}
</script>