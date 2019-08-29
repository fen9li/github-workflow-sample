const fbAdmin = require('firebase-admin')
const { FieldValue } = fbAdmin.firestore
const serviceAccount = require('./fb-service-account-key.json')

fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount),
})

const db = fbAdmin.firestore()

async function getProvider(request) {
  const { providerName } = request.params
  const doc = await db
    .collection('configs')
    .doc('providers')
    .get()
  const providerData = doc.get(providerName)

  if (providerData) {
    return providerData
  } else {
    const err = new Error()

    err.statusCode = 404
    err.message = 'There is no such provider'

    throw err
  }
}

async function setProvider(request) {
  const { providerName } = request.params
  const doc = db.collection('configs').doc('providers')

  await doc.update({ [providerName]: request.body })

  return request.body
}

async function deleteProvider(request) {
  const { providerName } = request.params
  const doc = db.collection('configs').doc('providers')

  await doc.update({ [providerName]: FieldValue.delete() })

  return { removed: true }
}

module.exports = {
  getProvider,
  setProvider,
  deleteProvider,
}
