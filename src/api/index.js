const activities = {
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
}

const generateUid = () => Math.floor(new Date * Math.random())

const canContinue = () => {
  const randomNumber = Math.floor(Math.random() * 10)
  console.log('randomNumber', randomNumber)
  if (randomNumber > 5) return true
  return false
}

export const fetchActivities = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (canContinue()) {
        resolve(activities)
      } else {
        reject('Network Failure. Please try again')
      }
    }, 2000);
  })
}

export const fetchCategories = () => ({
  '1546969049': { text: 'books' },
  '1546969225': { text: 'movies' }
})

export const createNewActivity = (activity) => {
  return new Promise ((resolve, reject) => {
    activity.id = generateUid()
    activity.createdAt = new Date
    activity.updatedAt = new Date
    activity.progress = 0

    resolve(activity)
  })
}

export const fetchUser = () => ({
  name: 'Francis Bastieno',
  id: '-Aj34jknvncx98812'
})


