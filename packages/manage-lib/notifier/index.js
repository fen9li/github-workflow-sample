import { Notification } from 'element-ui'

export default function(params) {
  const {
    response,
    errorTitle = 'Error',
    errorMsg = 'Unable to perform an action',
    successTitle = 'Success',
    successMsg = 'Action Successfully performed'
  } = params
  const [error] = response
  if(error) {
    if(error.violations) {
      const violations = Object.keys(error.violations)
      violations.forEach(violation => {
        setTimeout(() => {
          Notification({
            type: 'error',
            title: errorTitle,
            message: `${violation}: ${error.violations[violation][0]}` || errorMsg,
          })
        }, 50)
      })
    } else {
      Notification({
        type: 'error',
        title: errorTitle,
        message: error.message || errorMsg
      })
    }
  } else {
    Notification({
      type: 'success',
      title: successTitle,
      message: successMsg
    })
  }
  return new Promise(resolve => {
    resolve(!error)
  })
}
