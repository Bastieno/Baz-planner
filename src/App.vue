<template>
  <div id="activityApp">
    <NavBar @emittedFilter="setFilterValue" />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate :categories="categories" />
        </div>
        <div class="column is-9">
          <div class="box content" :class="{fetching: isFetching, 'has-error': error}">
            <div v-if="error">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="isFetching">
                Loading...
              </div>
              <div v-if="isDataLoaded">
                <ActivityItem
                  v-for="activity in filterActivities"
                  :key="activity.id"
                  :activity="activity"
                  :categories="categories"
                />
              </div>
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
import NavBar from './components/NavBar'
import store from './store'
import fakeApi from './lib/fakeApi'

export default {
  name: 'App',
  components:{ ActivityItem, ActivityCreate, NavBar },
  data () {
    const { state: { activities, categories } } = store
    return {
      isFormDisplayed: false,
      isFetching: false,
      error: null,
      user: {},
      activities,
      categories,
      filterValue: 'all'
    }
  },
  computed: {
    activitiesLength() {
      return Object.keys(this.activities).length
    },
    categoriesLength() {
      return Object.keys(this.categories).length
    },
    isDataLoaded() {
      return this.activitiesLength && this.categoriesLength
    },
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
    },
    filterActivities() {
     switch (this.filterValue) {
       case 'all':
         return this.activities
        case 'inProgress':
          return Object.values(this.activities).filter(activity => activity.progress > 0 && activity.progress < 100)
        case 'finished':
          return Object.values(this.activities).filter(activity => activity.progress == 100)
        case 'notStarted':
          return Object.values(this.activities).filter(activity => activity.progress == 0)
       default:
         return this.activities;
     }
    }
  },
  created() {
    if (!localStorage.getItem('activity-data')) {
      fakeApi.seedLocalStorage()
    }

    this.isFetching = true
    store.fetchActivities()
      .then(activities => {
        this.isFetching = false
      })
      .catch(error => {
        this.error = error
        this.isFetching = false
      })

    store.fetchCategories().then(categories => {})

    this.user = store.fetchUser()
  },
  methods: {
    setFilterValue(filterOption) {
      this.filterValue = filterOption
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
