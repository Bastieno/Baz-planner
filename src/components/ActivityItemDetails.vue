<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i class="fa fa-cog activity-settings" @click="toggleActionButtons" />
    </div>
    <p>{{ capitalize(categories[activity.category].text) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" alt="">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Francis Bax</a> updated {{ activity.updatedAt | formatTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>Progress: <span :style="{ color: assignProgressColor }"> {{ activity.progress }} %</span></span>
      </div>
    </div>
    <div v-show="isDisplayed" class="activity-control">
      <a href="" class="button is-warning" @click.prevent="$emit('toggleUpdate', true)">Edit</a>
      <a href="" class="button is-danger" @click.prevent="deleteActivity(activity)">Delete</a>
    </div>
    <hr class="divider">
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
      isDisplayed: false
    }
  },
  computed: {
    assignProgressColor() {
      const { progress } = this.activity
      if (progress <= 0) {
        return 'red'
      } else if (progress <= 50) {
        return 'orange'
      } else {
        return 'green'
      }
    }
  },
  methods: {
    toggleActionButtons() {
      this.isDisplayed = !this.isDisplayed
    },
    deleteActivity(activity) {
      store.deleteActivity({...activity})
    }
  }
}
</script>

<style lang="scss" scoped>
.post > h4 {
  margin-bottom: 5px
}

.activity-title {
  margin-bottom: 5px;
  display: inline-block
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

hr.divider {
  margin: 32px 0px;
  border: 1px solid #ccc;
}

</style>
