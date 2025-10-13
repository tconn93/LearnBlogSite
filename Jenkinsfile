pipeline {
  agent any
  tools {
        nodejs 'Node 24'  // Name from global config
    }
  stages {
    stage('Build') {
      steps {
        sh 'cd frontend'
        sh 'echo $USER'
        sh 'echo $HOME'
        sh 'pwd'
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
