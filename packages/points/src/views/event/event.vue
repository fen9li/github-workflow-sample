<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'
import EditModal from './modals/event-modal'
import DeleteModal from './modals/delete-modal'
import ParamModal from './modals/param-modal'
import DeleteParamModal from './modals/delete-param-modal'

import userMock from '@tests/__fixtures__/event'

export default {
  name: 'EventPoints',
  components: {
    DataBox,
    DataList,
    EditModal,
    DeleteModal,
    ParamModal,
    DeleteParamModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      event: {},
      loading: false,
      modals: {
        param: false,
        edit: false,
        delete: false,
        deleteParam: false,
      },
      selectedParam: null,
      paramId: null,
      parameters: [
        {
          id: "dsads",
          name: "Name",
          value: "Favorite Vegetable",
        },
        {
          id: "dasdasd",
          name: "Type",
          value: "String",
        },
        {
          id: "dasvas",
          name: "Required",
          value: "Yes",
        },
        {
          id: "asev23v3",
          name: "Default",
          value: "Potato",
        },
      ],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true

      this.event = { ...userMock }

      this.loading = false
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    handleCommand(command) {
      if (command === 'param') this.selectedParam = null
      this.modals[command] = true
    },
    onParamEditClick(id) {
      this.selectedParam = this.parameters[0]
      this.modals.param = true
    },
    onParamDeleteClick(id) {
      this.paramId = id
      this.modals.deleteParam = true
    },
  },
}
</script>

<template>
  <main-layout
    :title="event.name"
    :loading="loading"
    back
  >
    <div slot="header">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <el-button
          :class="$style.button"
          size="small"
        >
          <i
            class="el-icon-more"
            :class="$style.buttonIcon"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="param">
            Add Parameter
          </el-dropdown-item>
          <el-dropdown-item command="edit">
            Edit Event
          </el-dropdown-item>
          <el-dropdown-item command="delete">
            Delete Event
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <data-box
      header="Event Details"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(event.createdAt) }}</dd>

        <dt>Event ID</dt>
        <dd>{{ event.id || '—' }}</dd>

        <dt>Event Name</dt>
        <dd>{{ event.name || '—' }}</dd>

        <dt>Event Slug</dt>
        <dd>{{ event.slug || '—' }}</dd>

        <dt>Event Type</dt>
        <dd>{{ event.type || '—' }}</dd>

        <dt>Event Default Value</dt>
        <dd>{{ event.defaultValue || '—' }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ event.providerName || '—' }}</dd>
      </data-list>
      <hr :class="['divider-primary', 'info-block__divider']">

      <div :class="$style.title">
        Parameters
      </div>


      <div :class="$style.parameters">
        <div
          v-for="param in parameters"
          :key="param.id"
          :class="$style.parameter"
        >
          <div :class="$style.paramName">
            {{ param.name }}
          </div>
          <div :class="$style.paramValue">
            {{ param.value }}
          </div>
          <div :class="$style.icons">
            <span
              @click="onParamEditClick"
            >
              <el-icon
                name="edit"
              />
            </span>
            <span
              @click="onParamDeleteClick(param.id)"
            >
              <el-icon
                name="delete"
              />
            </span>
          </div>
        </div>
      </div>
    </data-box>

    <edit-modal
      v-if="modals.edit"
      :visible.sync="modals.edit"
      :event="event"
      @close-modal="modals.edit = false"
    />

    <delete-modal
      v-if="modals.delete"
      :id="id"
      :visible.sync="modals.delete"
      @close-modal="modals.delete = false"
    />

    <param-modal
      v-if="modals.param"
      :visible.sync="modals.param"
      :param="selectedParam"
      @close-modal="modals.param = false"
    />

    <delete-param-modal
      v-if="modals.deleteParam"
      :id="paramId"
      :visible.sync="modals.deleteParam"
      @close-modal="modals.deleteParam = false"
    />
  </main-layout>
</template>


<style lang="scss" module>
.title {
  padding: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.button {
  height: 2rem;

  :global {
    .el-icon--right {
      margin-left: 0.6rem;
    }
  }
}

.buttonIcon {
  transform: rotate(90deg);
}

.parameters {
  width: 60%;
  padding: rem(8px 16px);
  background: #eee;
  border-radius: rem(8px);
}

.parameter {
  display: flex;
  padding: rem(8px);

  &:hover .icons {
    opacity: 1;
  }
}

.paramName {
  flex-basis: 40%;
}

.paramValue {
  flex-basis: 40%;
  font-weight: bold;
}

.icons {
  flex-basis: 20%;
  text-align: right;
  opacity: 0;
  transition: opacity 0.15s;

  i {
    margin-left: rem(8px);
    cursor: pointer;
  }

  :global {
    .el-icon-edit {
      color: var(--color-primary);
    }
    .el-icon-delete {
      color: var(--color-error);
    }
  }
}
</style>
