<template>
  <div id="activityApp">
    <NavBar />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate @activityCreated="addActivity" :categories="categories" />
        </div>
        <div class="column is-9">
          <div class="box content" :class="{fetching: isFetching, 'has-error': error}">
            <div v-if="error">
              {{error}}
            </div>
            <div v-else>
              <div v-if="isFetching">
                Loading...
              </div>
              <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
                :categories="categories"
              />
            </div>
            <div v-if="!isFetching && !error">
              <div class="activity-length">{{ activityStatus }}</div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import ActivityItem from './components/ActivityItem'
import ActivityCreate from './components/ActivityCreate'
import NavBar from './components/NavBar';

import { fetchActivities, fetchCategories, fetchUser} from './api';

export default {
  name: 'app',
  components:{ ActivityItem, ActivityCreate, NavBar },
  data () {
    return {
      isFormDisplayed: false,
      isFetching: false,
      error: null,
      user: {},
      activities: {},
    }
  },
  computed: {
    activityLength() {
      return Object.keys(this.activities).length
    },
    activityStatus() {
      if (this.activityLength === 0) {
        return 'You have no activity'
      } else if (this.activityLength === 1) {
        return `You have ${this.activityLength} activity`
      } else {
        return `You have ${this.activityLength} activities`
      }
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return 'Nice to see some activity'
      } else if (this.activityLength >= 5) {
        return 'So many activities! Good Job!'
      } else {
        return 'No activity. So sad'
      }
    }
  },
  created() {
    this.isFetching = true
    fetchActivities()
      .then(activities => {
        this.activities = activities
        this.isFetching = false
      })
      .catch(error => {
        this.error = error
        this.isFetching = false
      })
    this.categories = fetchCategories()
    this.user = fetchUser()
  },
  methods: {
    addActivity(newActivity) {
      const { id } = newActivity
      Vue.set(this.activities, id, newActivity)

    }
  },
}
</script>

<style>
#activityApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  font-family: 'Open Sans', serif;
  background: #F2F6FA;
}

footer {
  background: #F2F6FA !important;
}

.fetching {
  border: 2px solid orange
}

.has-error {
  border: 2px solid red
}

.activity-motivation {
  float: right;
}

.activity-length {
  display: inline-block;
}

.topNav {
  border-bottom: 5px solid #3498DB
}

.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}

.container .columns {
  margin: 3rem 0;
}

.navbar-menu .navbar-item {
  padding: 0 2rem;
}

aside.menu {
  padding-top: 3rem
}

aside.menu .menu-list {
  line-height: 1.5;
}

aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700
}

.button.is-primary.is-alt {
 background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}

.media-left img {
  border-radius: 50%;
}

.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3
}

article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}

article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
