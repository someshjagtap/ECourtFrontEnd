pipeline {
    agent any
    
    stages {
        stage('NodeJS Setup') {
            steps {
                 bat 'npm install'
            }
        }
        stage('Build') {
            steps {
               bat "npm run build:${params.BUILD_ENV}"
            }
        }
    }   
}