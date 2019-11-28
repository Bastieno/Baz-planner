<template>
  <div>
    <ActivityItemUpdate
      v-if="isUpdateActive"
      :activity="activity"
      :categories="categories"
      @toggleUpdate="changeUpdateState"
    />
    <ActivityItemDetails
      v-else
      :activity="activity"
      :categories="categories"
      @toggleUpdate="changeUpdateState"
    />
  </div>
</template>

<script>
import ActivityItemDetails from './ActivityItemDetails'
import ActivityItemUpdate from './ActivityItemUpdate'

export default {
  components: { ActivityItemDetails, ActivityItemUpdate },
  props: {
    activity: {
      type: Object,
      required: true
    },
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUpdateActive: false
    }
  },
  methods: {
    changeUpdateState(condition) {
      this.isUpdateActive = condition
    },
  }
}
</script>

<style scoped>

</style>
