<template>
  <div>
    <div>
      <VCard title="Clientes impagados">
        <VCardText class="d-flex flex-wrap gap-4">
          <VDialog
            v-model="dialogUploadVisible"
            max-width="550"
          >
            <!-- Dialog Content -->
            <DialogUploadCustomer @close-dialog="dialogUploadVisible = false" />
          </VDialog>

          <!-- 👉 Export button -->
          <VMenu transition="slide-y-transition">
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                variant="tonal"
                color="secondary"
              >
                Carga masiva
              </VBtn>
            </template>

            <VList
              nav
              :lines="false"
            >
              <VListItem
                v-for="item in itemsFileUpload"
                :key="item.value"
                :value="item.value"
                @click="item.value == 1 ? downloadCSV() : uploadCSV()"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.prependIcon"
                    class="me-3"
                  />
                </template>

                <VListItemTitle>
                  {{ item.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>

          <VSpacer />

          <div class="app-user-search-filter d-flex align-center">
            <!-- 👉 Search  -->
            <VTextField
              v-model="searchQuery"
              placeholder="Buscar cliente"
              density="compact"
              class="me-3"
            />

            <!-- 👉 Add user button -->
            <VBtn @click="addNewCustomerDrawerVisible = true">
              Agregar cliente
            </VBtn>
          </div>
        </VCardText>
        <VTable class="text-no-wrap">
          <!-- 👉 table head -->
          <thead>
            <tr>
              <th scope="col">
                Nombre
              </th>
              <th scope="col">
                email
              </th>
              <th scope="col">
                Telefono
              </th>
              <th scope="col">
                Fecha de creacion
              </th>
              <th scope="col">
                Acciones
              </th>
            </tr>
          </thead>

          <!-- 👉 table body -->
          <tbody>
            <tr
              v-for="(customer, index) in customers"
              :key="index"
            >
              <!-- 👉 Name -->
              <td class="text-capitalize text-high-emphasis">
                <span class="text-base">{{ customer.name }}</span>
              </td>

              <!-- 👉 Email -->
              <td class="text-capitalize text-high-emphasis">
                <span class="text-base">{{ customer.email }}</span>
              </td>

              <!-- 👉 Mobile -->
              <td class="text-capitalize text-high-emphasis">
                <span class="text-base">{{ customer.mobile }}</span>
              </td>

              <!-- 👉 Date -->
              <td class="text-capitalize text-high-emphasis">
                <span class="text-base">{{ moment(customer.created_at).format('DD/MM/YYYY') }}</span>
              </td>

              <!-- 👉 Actions -->
              <td
                class="text-center"
                style="width: 80px"
              >
                <MoreBtn
                  :menu-list="computedMoreList(customer.id)"
                  item-props
                />
              </td>
            </tr>
          </tbody>

          <!-- 👉 table footer  -->
          <tfoot v-if="loadingCustomers">
            <tr>
              <td
                colspan="7"
                class="text-center text-body-1"
              >
                <Loading />
              </td>
            </tr>
          </tfoot>
          <tfoot v-else-if="!loadingCustomers && !customers.length">
            <tr>
              <td
                colspan="7"
                class="text-center text-body-1"
              >
                No data available
              </td>
            </tr>
          </tfoot>
        </VTable>
        <VDivider />
        <!-- SECTION Pagination -->
        <VCardText class="d-flex flex-wrap justify-end gap-4 pa-2">
          <!-- 👉 Rows per page -->
          <div
            class="d-flex align-center"
            style="width: 171px"
          >
            <span class="text-no-wrap text-sm me-3">Rows per page:</span>
            <VSelect
              v-model="rowPerPage"
              density="compact"
              class="per-page-select"
              variant="plain"
              :items="[10, 20, 30, 50]"
            />
          </div>

          <!-- 👉 Pagination and pagination meta -->
          <div class="d-flex align-center">
            <h6 class="text-sm font-weight-regular">
              {{ paginationData }}
            </h6>
          </div>
          <VPagination
            v-model="currentPage"
            :length="totalPage"
            :total-visible="1"
            active-color="primary"
            size="small"
          />
        </VCardText>
      </VCard>
    </div>

    <!-- 👉 Add New User -->
    <AddNewCustomerDrawer
      v-model:isDrawerOpen="addNewCustomerDrawerVisible"
      @customer-data="addNewCustomer"
    />
  </div>
</template>

<script setup>
import { useCustomerStore } from '@/views/pages/customers/useCustomerStore'
import Loading from '../../components/loading.vue'
import DialogUploadCustomer from '../../components/customers/dialogUploadCustomers.vue'
import AddNewCustomerDrawer from '../../components/customers/addCustomer.vue'

const moment = inject('moment')

const customerStore = useCustomerStore()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalCustomers = ref(0)
const loadingCustomers = ref(false)
const customers = ref([])
const dialogUploadVisible = ref(false)
const addNewCustomerDrawerVisible = ref(false)


// 👉 Get users
const getCustomers = async () => {
  loadingCustomers.value = true
  await customerStore.getCustomers({
    // q: searchQuery.value,
    // status: selectedStatus.value,
    // plan: selectedPlan.value,
    // role: selectedRole.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value,
  }).then(response => {
    const res =  response.data

    if (res.success) {
      customers.value = res.data.items
      totalCustomers.value = res.pagination.total
      totalPage.value = res.data.count
      loadingCustomers.value = false
    }
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(getCustomers)

//👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = customers.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = customers.value.length + (currentPage.value - 1) * rowPerPage.value

  return `${ firstIndex }-${ lastIndex } of ${ totalCustomers.value }`
})

const downloadCSV =  () => {
  let csv = 'organization, taxid, name, surnames, email, mobile, customer_mode_id, externalid, group'
  const anchor = document.createElement('a')

  anchor.href = 'data:text/csvcharset=utf-8,' + encodeURIComponent(csv)
  anchor.target = '_blank'
  anchor.download = 'plantilla.csv'
  anchor.click()
}

const uploadCSV =  () => {
  dialogUploadVisible.value = true
}

const itemsFileUpload = [
  {
    title: 'Descargar plantilla',
    value: 1,
    prependIcon: 'bx-download',
  },
  {
    title: 'Cargar datos',
    value: 2,
    prependIcon: 'bx-cloud-upload',
  },
]

const addNewCustomer = customerData => {
  customerStore.addCustomer(customerData)

  // refetch User
  getCustomers()
}

const computedMoreList = computed(() => {
  return paramId => [
    {
      title: 'Detalle',
      value: 'view',
      prependIcon: 'bx-show',

      // to: {
      //   name: 'apps-user-view-id',
      //   params: { id: paramId },
      // },
    },
    {
      title: 'Edit',
      value: 'edit',
      prependIcon: 'bx-pencil',
    },
    {
      title: 'Delete',
      value: 'delete',
      prependIcon: 'bx-trash-alt',
    },
  ]
})
</script>


<style lang="scss">
.app-user-search-filter {
  inline-size: 385px;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}

.per-page-select {
  margin-block: auto;

  .v-field__input {
    align-items: center;
    padding: 2px;
    font-size: 14px;
  }

  .v-field__append-inner {
    align-items: center;
    padding: 0;
    margin-inline-start: -2.5rem;

    .v-icon {
      margin-inline-start: 0 !important;
    }
  }
}
</style>
