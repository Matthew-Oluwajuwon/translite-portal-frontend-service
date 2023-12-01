pipeline {
  agent any
  stages {
    stage("build") {
      steps {
        sh """
          docker build -t translite-frontend-docker:latest .
        """
      }
    }
    stage("remove-old") {
      steps {
        sh """
          docker rm -f translite-frontend-service
        """
      }
    }
    stage("run") {
      steps {
        sh """
          docker run -d -p 8002:8002 --name translite-frontend-service translite-frontend-docker
        """
      }
    }
  }
}