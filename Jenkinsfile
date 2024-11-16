pipeline {
    environment {
        DOCKERHUB_CRED = credentials("DockerCredentials")
    }
    agent any
    tools {nodejs "NODEJS"} 
    stages {
        stages {
        stage("Stage 1: Git Clone") {
            steps {
                git credentialsId: 'GitHub-Credentials', url: 'https://github.com/kushal7551/SPE-FInal-Project.git', branch: 'main'
            }
        }

        stage("Stage 2: Backend Testing") {
            steps {
                sh '''
                cd backend
                npm install
                npm test
                '''
            }
        }

        stage("Stage 3: Frontend Testing") {
            steps {
                sh '''
                cd frontend
                npm install
                npm test
                '''
            }
        }

        stage("Stage 4: Build Docker Images") {
            steps {
                sh 'docker-compose build'
            }
        }

        stage("Stage 5: Push Docker Images") {
            steps {
                sh '''
                docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
                docker-compose push
                '''
            }
        }

        stage("Stage 6: Deploy Using Docker Compose") {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
