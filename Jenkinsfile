pipeline {
    agent any
    stages {
        stage('Deploy frontend') {
            steps {
                dir('/home/malde/projects/frontend') {
                    sh 'git fetch origin main'
                    sh 'git reset --hard origin/main'
                    
                    withCredentials([
                        string(credentialsId: 'GOOGLE_CLIENT_ID', variable: 'GOOGLE_CLIENT_ID'),
                        string(credentialsId: 'API_BASE_URL', variable: 'API_BASE_URL')
                    ]) {
                        sh "docker build \
                            --build-arg VITE_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
                            --build-arg VITE_API_BASE_URL=${API_BASE_URL} \
                            -t frontend-image ."
                    }
                }
                
                dir('/home/malde/projects/infrastructure') {
                    sh 'docker compose up -d'
                    sh 'docker image prune -f'
                }
            }
        }
    }
}