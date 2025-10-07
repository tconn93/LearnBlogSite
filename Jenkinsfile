pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'cd frontend'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "deploying website"'
      }
    }
  }
}
