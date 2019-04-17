@Library('ciinabox') _
pipeline {
  environment {
    AWS_REGION = 'ap-southeast-2'
    PROJECT_NAME = 'manage-v2-frontend'
    SOURCE_BUCKET = 'source.tools.loyaltycorp.com.au'
    DEV_ACCOUNT_ID = '517701979379'
    PROD_ACCOUNT_ID = '398184425460'
    OPS_ACCOUNT_ID = '599070804856'
    CIINABOX_ROLE = 'ciinabox'
    BUILD_VER = "${env.BRANCH_NAME}-${env.GIT_COMMIT.substring(0,7)}"
  }
  agent {
    node {
      label 'docker'
    }
  }
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Test Package') {
      agent {
        docker {
          image 'node'
          reuseNode true
        }
      }
      steps {
        sh "yarn"
        sh "yarn lint"
        sh "yarn unit"
      }
    }
  }
  post {
    always {
      deleteDir()
    }
  }
}
