<template>
  <VNavigationDrawer
    temporary
    :width="500"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Agregar cliente"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Name -->
              <VCol cols="6">
                <VTextField
                  v-model="name"
                  :rules="[requiredValidator]"
                  label="Nombre"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="6">
                <VTextField
                  v-model="surnames"
                  :rules="[requiredValidator]"
                  label="Apellido"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Correo"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Mobile -->
              <VCol cols="12">
                <VTextField
                  v-model="mobile"
                  :rules="[requiredValidator]"
                  label="Telefono"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12">
                <VTextField
                  v-model="organization"
                  :rules="[requiredValidator]"
                  label="Country"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <VTextField
                  v-model="taxid"
                  :rules="[requiredValidator]"
                  label="Country"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <VTextField
                  v-model="customer_mode_id"
                  :rules="[requiredValidator]"
                  label="Country"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Role -->
              <VCol cols="12">
                <VTextField
                  v-model="externalid"
                  :rules="[requiredValidator]"
                  label="Country"
                  density="compact"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {
  emailValidator,
  requiredValidator,
} from '@validators'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'customerData',
])

const isFormValid = ref(false)
const refForm = ref()
const organization = ref('s')
const taxid = ref('s')
const name = ref('a')
const surnames = ref('a')
const email = ref('a@ds.com')
const mobile = ref('as')
const customer_mode_id = ref(1)
const externalid = ref(1)

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('customerData', {
        organization: organization.value,
        taxid: taxid.value,
        name: name.value,
        surnames: surnames.value,
        email: email.value,
        mobile: mobile.value,
        customer_mode_id: customer_mode_id.value,
        externalid: externalid.value,
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>
