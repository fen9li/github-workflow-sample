export const state = {}

export const getters = {}

export const mutations = {}

export const actions = {
  UPDATE_TABLE({ commmit }, table) {
    const { processor } = table
    const initial = processor.data.length
    processor.loading = true

    const checkUpdate = setInterval(async () => {
      await processor.getData()

      const updated = processor.data.length

      if(updated !== initial) {
        clearInterval(checkUpdate)
        processor.loading = false
      }
    }, 1000)
  }
}
