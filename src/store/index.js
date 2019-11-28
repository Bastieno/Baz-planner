import fakeApi from '../lib/fakeApi'
import Vue from 'vue'

const store = {
  state: {
    activities: {},
    categories: {},
  },
  generateUid() {
    return Math.floor(new Date * Math.random())
  },

  fetchActivities() {
    return fakeApi.get('activities', { force: true })
      .then(activities => {
        Object.keys(activities).map(key => {
          this.setItem('activities', key, activities[key])
        })
      })
    },

  fetchCategories() {
    return fakeApi.get('categories', { force: true })
      .then(categories => {
        Object.keys(categories).map(key => {
          this.setItem('categories', key, categories[key])
        })
      })
    },

  fetchUser () {
    return {
      name: 'Francis Bastieno',
      id: '-Aj34jknvncx98812'
    }
  },

  createNewActivity(activity) {
    activity.id = this.generateUid()
    activity.createdAt = new Date
    activity.updatedAt = new Date
    activity.progress = 0

    return fakeApi.post('activities', { ...activity })
      .then(createdActivity => {
        this.setItem('activities', createdActivity.id, createdActivity)
        return createdActivity
      })
  },

  deleteActivity(activity) {
    return fakeApi.delete('activities', activity)
      .then(deletedActivity => {
        Vue.delete(this.state.activities, deletedActivity.id)
      })
  },

  updateActivity(activity) {
    activity.updatedAt = new Date()
    return fakeApi.update('activities', activity)
      .then(updatedActivity => {
        this.setItem('activities', updatedActivity.id, updatedActivity)
        return updatedActivity
      })
  },

  setItem(resource, id, item) {
    Vue.set(this.state[resource], id, item)
  }
}

export default store
