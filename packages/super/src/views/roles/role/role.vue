<script>
import { formatDate } from '@lib/utils/format-date'

const mock = {
  "createdAt": "2019-08-06T09:43:00Z",
  "id": "92882992",
  "updatedAt": "2019-08-06T09:43:00Z",
  "name": "Admin",
  "products": ['Suncorp', 'Rewards'],
}

export default {
  name: "Role",
  computed: {
    role() {
      return mock
    },
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
  },
}
</script>

<template>
  <main-layout
    :title="role.name"
    back
  >
    <el-card>
      <div
        slot="header"
      >
        Role Details
      </div>
      <div class="datalist">
        <dt>Date Created</dt>
        <dd>{{ formatDate(role.createdAt, 'DD/MM/YYYY HH:mm') }}</dd>

        <dt>Last Update Date</dt>
        <dd>{{ formatDate(role.updatedAt, 'DD/MM/YYYY HH:mm') }}</dd>

        <dt>
          Role ID/dt>
        </dt><dd>{{ role.id }}</dd>

        <dt>Product assigned</dt>
        <dd>{{ role.products.join(', ') }}</dd>
      </div>
    </el-card>
  </main-layout>
</template>
