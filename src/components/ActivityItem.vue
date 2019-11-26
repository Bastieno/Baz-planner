<template>
  <article class="post">
    <h4>{{activity.title}}</h4>
    <p>{{capitalize(categories[activity.category].text)}}</p>
    <p>{{activity.notes}}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" alt="">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Francis Bax</a> updated {{activity.updatedAt | formatTime }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span>Progress: <span :class="assignProgressColor"> {{ activity.progress}} %</span></span>
      </div>
    </div>
  </article>
</template>

<script>
import textUtility from '../mixins'
export default {
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
  mixins: [textUtility],
  computed: {
    assignProgressColor() {
      const { progress } = this.activity
      if (progress <= 0) {
        return {'color-red': true}
      } else if (progress <= 50) {
        return {'color-orange': true}
      } else {
        return {'color-green': true}
      }
    }
  }
}
</script>

<style>

.post > h4 {
  margin-bottom: 5px
}

.color-red {
  color: red
}

.color-orange {
  color: orange
}

.color-green {
  color: green
}

</style>
