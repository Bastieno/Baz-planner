<template>
  <div class="activity-form">
    <a v-if="!isFormDisplayed" class="button is-primary is-block is-alt is-large" @click="toggleFormDisplay">New Activity</a>
    <div v-if="isFormDisplayed" class="create-form">
      <h2>Create Activity</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="newActivity.title" class="input" type="text" placeholder="Read a Book">
          </div>
        </div>
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <textarea v-model="newActivity.notes" class="textarea" placeholder="Write some notes here" />
          </div>
        </div>
        <div class="field">
          <label class="label">Categories</label>
          <select v-model="newActivity.category" class="select">
            <option disabled value="">Please select a category</option>
            <option
              v-for="category in categories"
              :key="category.text"
              :value="category.id"
            >
              {{ category.text }}
            </option>
          </select>

        </div>
        <div class="field is-grouped">
          <div class="control">
            <button :disabled="!isFormValid" class="button is-link" @click.prevent="createActivity">Create</button>
          </div>
          <div class="control">
            <button class="button is-danger" @click="toggleFormDisplay">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFormDisplayed: false,
      newActivity: {
        title: '',
        notes: '',
        category: '',
      },
    }
  },
  computed: {
    isFormValid() {
      return this.newActivity.title && this.newActivity.notes && this.newActivity.category
    }
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplayed = !this.isFormDisplayed
    },
    resetActivity() {
      this.newActivity.title = ''
      this.newActivity.notes = ''
      this.newActivity.category = ''
    },
    createActivity() {
      store.createNewActivity({...this.newActivity})
        .then(createdActivity => {
          this.resetActivity()
          this.isFormDisplayed = false
      })
    }
  }
}
</script>

<style>

</style>
