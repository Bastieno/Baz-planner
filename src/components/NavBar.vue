<template>
  <div>
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ appFullName }}</h1>
        </div>
      </div>
    </nav>
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-menu is-active">
          <div class="navbar-start">
            <a class="navbar-item" :class="{'is-active': filterOption === 'all'}" @click="emitFilter('all')">All</a>
            <a class="navbar-item" :class="{'is-active': filterOption === 'inProgress'}" @click="emitFilter('inProgress')">In Progress</a>
            <a class="navbar-item" :class="{'is-active': filterOption === 'finished'}" @click="emitFilter('finished')">Finished</a>
            <a class="navbar-item" :class="{'is-active': filterOption === 'notStarted'}" @click="emitFilter('notStarted')">Not Started</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: 'Activity Planner',
      appAuthor: 'Bastieno',
      filterOption: 'all'
    }
  },
  computed: {
    appFullName() {
      return `${this.appName} by ${this.appAuthor}`
    },
  },
  methods: {
    emitFilter(filterOption) {
      this.filterOption = filterOption
      this.$emit('emittedFilter', filterOption)
    }
  }
}
</script>
