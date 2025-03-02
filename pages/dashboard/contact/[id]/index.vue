<template>
  <div :class="$style.update" v-loading="isLoading">
    <layout-dashboard-header title="Contact Details">
      <template #action>
        <custom-button type="default" @click="navigateTo('/dashboard/contact')">
          Back</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.container">
      <div :class="$style.item">
        <div :class="$style.label">Name:</div>
        <div :class="$style.content">{{ contact?.name }}</div>
      </div>
      <div :class="$style.item">
        <div :class="$style.label">Email:</div>
        <div :class="$style.content">{{ contact?.email }}</div>
      </div>
      <div :class="$style.item">
        <div :class="$style.label">Created at:</div>
        <div :class="$style.content">
          {{ formatDate(contact?.createdAt) }} ({{
            fromNow(contact?.createdAt)
          }})
        </div>
      </div>
      <div :class="$style.item">
        <div :class="$style.label">Subject:</div>
        <div :class="$style.content">{{ contact?.subject }}</div>
      </div>
      <div :class="$style.item">
        <div :class="$style.label">Type:</div>
        <div :class="$style.content">{{ contact?.type }}</div>
      </div>
      <div :class="$style.item">
        <div :class="$style.label">Description:</div>
        <div :class="$style.content">{{ contact?.description }}</div>
      </div>
      <div :class="$style.item" :style="{ gridColumn: 'span 2' }">
        <div :class="$style.label">Message:</div>
        <div :class="$style.content">{{ contact?.content }}</div>
      </div>
      <div :class="$style.item">
        <custom-button
          type="primary"
          :disabled="contact?.isDone"
          @click="handleUpdate({ ...contact!, isDone: true })"
        >
          Mark as done</custom-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

const { id } = useRoute().params
const contact = ref<Contact | undefined>(undefined)

const isLoading = ref<boolean>(false)

const handleUpdate = async (param: Contact) => {
  if (!contact.value) return

  isLoading.value = true
  contact.value = await $contactService.updateContact(contact.value._id!, param)
  isLoading.value = false
}

const { data } = await useAsyncData('contact', async () => {
  return await $contactService.getContact(id.toString())
})

if (data.value) {
  contact.value = data.value
}

onMounted(async () => {
  if (contact.value && !contact.value.isRead) {
    await handleUpdate({ ...contact.value, isRead: true })
  }
})
</script>

<style lang="postcss" module>
.contact {
  position: relative;
}
.container {
  padding: 16px 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns for rows 1 and 2 */
  grid-template-rows: auto auto auto; /* 3 rows */
  gap: 16px;
}
.content {
  font-weight: 400;
}
.item {
  grid-column: span 1;
}
</style>
