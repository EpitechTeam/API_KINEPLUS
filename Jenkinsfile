node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'export NODE_ENV=production'
      sh 'printenv'
    }
    stage('Install dependencies'){
      sh 'sudo docker-compose build'
    }
    stage('Deploy'){
      if (env.BRANCH_NAME == 'master'){
        sh 'sudo docker-compose up -d'
      }
    }
  }
  catch (err) {
    throw err
  }
}
