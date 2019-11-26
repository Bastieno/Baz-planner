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
  canContinue() {
    const randomNumber = Math.floor(Math.random() * 10)
    console.log('randomNumber', randomNumber)
    if (randomNumber > 5) return true
    return false
  }

  get(resource, { force = false }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (force || this.canContinue()) {
          resolve({...data[resource]})
        } else {
          reject(`Cannot fetch ${resource} as of this time.`)
        }
      }, 2000);
    })
  }

  post(resource, payload) {
    return new Promise((resolve, reject) => {
      data[resource][payload.id] = payload
      resolve(payload)
    })
  }
}

export default new fakeApi()
