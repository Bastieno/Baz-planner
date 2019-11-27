import fakeApi from '../lib/fakeApi'

const generateUid = () => Math.floor(new Date * Math.random())

export const fetchActivities = () => {
  return fakeApi.get('activities', {force: true})
}

export const fetchCategories = () => {
  return fakeApi.get('categories', {force: true})
}

export const fetchUser = () => ({
  name: 'Francis Bastieno',
  id: '-Aj34jknvncx98812'
})

export const createNewActivity = (activity) => {
    activity.id = generateUid()
    activity.createdAt = new Date
    activity.updatedAt = new Date
    activity.progress = 0

    return fakeApi.post('activities', { ...activity })
}

export const deleteActivity = (activity) => {
  return fakeApi.delete('activities', activity)
}



