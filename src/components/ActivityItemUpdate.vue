<template>
  <article class="post">
    <div class="activity-title">
      <!-- TODO: Add v-model -->
      <i class="fa fa-cog activity-settings" @click="isDisplayed = !isDisplayed" />
      <input v-model="updatedActivity.title" type="text" class="input">
    </div>
    <div class="activity-category">
      <!-- TODO: add v-model and iterate categories in option  -->
      <select v-model="updatedActivity.category" class="select">
        <option disabled value="">Please select one</option>
        <option v-for="category in categories"
                :key="category.id"
                :value="category.id">{{ category.text }}</option>
      </select>
    </div>
    <div class="control activity-notes">
      <!-- TODO: Add v-model here -->
      <textarea v-model="updatedActivity.notes"
                class="textarea"
                placeholder="Write some notes here" />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Francis Baz</a> updated {{ updatedActivity.updatedAt | formatTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <!-- TODO: Add v-model here -->
        <input id="progress"
               v-model="updatedActivity.progress"
               type="range"
               name="progress"
               min="0" max="100" value="90" step="10">
        <label for="progress">{{ updatedActivity.progress }} %</label>
      </div>
    </div>
    <div v-if="isDisplayed" class="activity-control">
      <!-- TODO: create function 'updateActivity' to console log 'activity' -->
      <a class="button is-warning" @click="updateActivity(updatedActivity)">Commit Update</a>
      <!-- TODO: Emit Event to Cancel Edit Mode -->
      <a class="button is-danger" @click="$emit('toggleUpdate', false)">Cancel</a>
    </div>
  </article>
</template>

<script>
import textUtility from '../mixins'
import store from '../store'

export default {
  mixins: [textUtility],
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
      isDisplayed: true,
      updatedActivity: {...this.activity}
    }
  },
  methods: {
    updateActivity(activity) {
      store.updateActivity(activity)
        .then(updatedItem => {
          console.log(updatedItem)
          this.$emit('toggleUpdate', false )
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .activity-title {
    margin-bottom: 10px;

    > i {
      margin-bottom: 10px;
    }
  }

  .activity-category {
    margin-bottom: 10px;
  }

  .activity-notes {
    margin-bottom: 10px;
  }

  .activity-settings {
    float: right;
    font-size: 22px;

    &:hover {
      cursor: pointer;
    }
  }

  .activity-control {
    margin: 20px 0 0 0;

    a {
      margin-right: 5px;
    }
  }

  .post .title {
    margin-bottom: 5px;
  }
</style>
