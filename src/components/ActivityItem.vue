<template>
  <article class="post">
    <h4>{{activity.title}}</h4>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" alt="">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Francis Bax</a> updated {{activity.updatedAt}} minutes ago &nbsp;
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
export default {
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  computed: {
    assignProgressColor() {
      const { progress } = this.activity
      debugger
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
