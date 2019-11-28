const data = {
  activities: {
    '1546968934': {
      id: '1546968934',
      title: 'Learn Vue.js',
      notes: 'I started today and it was not good.',
      progress: 0,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    '1546969212': {
      id: '1546969212',
      title: 'Read Witcher Books',
      notes: 'These books are super nice',
      progress: 50,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    }
  },
  categories: {
    '1546969049': { text: 'books', id: '1546969049' },
    '1546969225': { text: 'movies', id: '1546969225' }
  }
}

class fakeApi {
  seedLocalStorage() {
    this.commitData(data)
  }

  commitData(data) {
    localStorage.setItem('activity-data', JSON.stringify(data) )
  }

  getData() {
    const data = localStorage.getItem('activity-data')
    return JSON.parse(data)
  }

  canContinue() {
    const randomNumber = Math.floor(Math.random() * 10)
    if (randomNumber > 5) return true
    return false
  }

  get(resource, { force = false }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (force || this.canContinue()) {
          const data = this.getData()
          resolve({...data[resource]})
        } else {
          reject(`Cannot fetch ${resource} as of this time.`)
        }
      }, 2000);
    })
  }

  post(resource, payload) {
    return new Promise((resolve, reject) => {
      const data = this.getData()
      data[resource][payload.id] = payload
      this.commitData(data)
      resolve(payload)
    })
  }

  delete(resource, payload) {
    return new Promise((resolve, reject) => {
      const data = this.getData()
      delete data[resource][payload.id]
      this.commitData(data)
      resolve(payload)
    })
  }
}

export default new fakeApi()
