<template>
  <div :class="$style.contacts">
    <layout-dashboard-header title="Categories">
      <template #action>
        <custom-button
          type="primary"
          :disabled="!selectedRows.length"
          @click="handleUpdate(selectedRows.map((c) => c._id!))"
        >
          Mark as done</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content" v-loading="status === 'pending'">
      <layout-dashboard-filter
        search-name="Contacts"
        @search="search"
        @sort="handleSort"
      />
      <dashboard-contact-table
        :list="data"
        v-model:pagination="pagination"
        v-model:selected-rows="selectedRows"
        @preview="navigateTo(`/dashboard/contact/${$event}`)"
        @update="handleUpdate([$event])"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '~/utils'

definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

/** Table ref */
const selectedRows = ref<Contact[]>([])

/** Modal ref */
const isOpen = ref<boolean>(false)
const currentId = ref<string | undefined>(undefined)

/** Filter and pagination */
const filter = ref<ContactFilter>({
  name: '',
  sort: ''
})
const pagination = ref<Pagination>({
  page: 1,
  limit: 10
})

const handleSearch = debounce((query: string) => {
  filter.value.name = query || undefined
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}, 500)

const search = (query: string) => {
  handleSearch(query.trim())
}

const handleSort = (sort: string) => {
  filter.value.sort = sort
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}

const handleUpdate = async (ids: string[]) => {
  ElMessageBox.confirm('Do you want to mark as done?', 'Confirm', {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        await $contactService.updateContacts(ids)
        done()
      } else {
        done()
      }
    }
  })
    .then(async () => {
      ElNotification.success({
        title: 'Contacts updated successfully',
        message: 'Contacts has been updated'
      })
      reloadList()
    })
    .catch(() => {
      // catch error
    })
}

const reloadList = () => {
  isOpen.value = false
  refresh()
}

const { data, status, refresh } = await useAsyncData(
  'contacts',
  async () => {
    return await $contactService.getContacts(filter.value, pagination.value)
  },
  {
    watch: [filter, pagination]
  }
)
</script>

<style lang="postcss" module>
.contacts {
  display: block;
}
.content {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
