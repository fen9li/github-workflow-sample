export const state = {}

export const getters = {}

export const mutations = {}

export const actions = {
  UPDATE_TABLE({ commmit }, payload) {
    const { processor } = payload
    const initial = processor.data

    const checkUpdate = setInterval(async () => {
      await processor.getData()

      const updated = processor.data

      // Elastic does not delete item immediately, there is a delay. A solution below is to make sure the deleted item is no longer appeared in table
      if(payload.removedItem) {
        const index = updated.findIndex(item => item.id === payload.removedItem)
        if(index === -1) {
          clearInterval(checkUpdate)
        }
      } else if(updated.length !== initial.length) {
        clearInterval(checkUpdate)
      }
    }, 1000)
  }
}
