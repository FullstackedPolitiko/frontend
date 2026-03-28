pipeline {
    agent any
    stages {
        stage('Deploy frontend') {
           
            steps {
                dir('/var/jenkins_home/projects/frontend') {
                   sh 'git fetch origin main'
                   sh 'git reset --hard origin/main'
                   sh 'docker build -t frontend-image .'
                }
                
                dir('/var/jenkins_home/projects/infrastructure') {
                   sh 'docker compose --version'    
                   sh 'docker compose up -d --no-deps frontend'
                }
            }
        }
    }
}