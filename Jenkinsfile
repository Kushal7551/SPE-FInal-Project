pipeline {
    environment {
        DOCKERHUB_CRED = credentials("DockerCredentials")
    }
    agent any
    tools {nodejs "NODEJS"} 
    stages {
        stage("Stage 1: Git Clone") {
            steps {
                sh '''
                [ -d SPE-FInal-Project ] && rm -rf SPE-FInal-Project
                git clone https://github.com/kushal7551/SPE-FInal-Project.git
                '''
                // git credentialsId: 'GitHub-Credentials', url: 'https://github.com/kushal7551/SPE-FInal-Project.git', branch: 'main'
            }
        }

        stage("Stage 2: Backend Testing") {
            steps {
                sh '''
                npm install jest --save-dev
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
                '''
            }
        }

        stage("Stage 4: Creating Docker Image for frontend") {
            steps {
                sh '''
                cd frontend
                ls
                /usr/local/bin/docker build -t kushal7551/frontend:latest .
                '''
            }
        }

        stage("Stage 5: Creating Docker Image for backend") {
            steps {
                sh '''
                cd backend
                /usr/local/bin/docker build -t kushal7551/backend:latest .
                '''
            }
        }

        stage("Stage 6: Push Frontend Docker Image") {
            steps {
                sh '''
                /usr/local/bin/docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
                /usr/local/bin/docker push kushal7551/frontend:latest
                '''
            }
        }

        stage("Stage 7: Push Backend Docker Image") {
            steps {
                sh '''
                /usr/local/bin/docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
                /usr/local/bin/docker push kushal7551/backend:latest
                '''
            }
        }

    }
}
