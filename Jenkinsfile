pipeline {
    environment {
        DOCKERHUB_CRED = credentials("DockerCredentials")
    }
    agent any
    tools {nodejs "NODEJS"} 
    stages {
        stage("Stage 1: Git Clone") {
            steps {
                // sh "rm -r SPE-FInal-Project"
                // sh "git clone https://github.com/Kushal7551/SPE-FInal-Project.git"
                git credentialsId: 'GitHub-Credentials', url: 'https://github.com/kushal7551/SPE-FInal-Project.git', branch: 'main'
                // sh "ls"
            }
        }
        stage("Stage 2: k"){
            steps{
                sh "node --version"
            }
        }

        // stage("Stage 2: Backend Testing") {
        //     steps {
        //         sh '''
        //         cd backend
        //         npm i
        //         cd tests
        //         npm install mocha chai sinon
        //         npm test
        //         '''
        //     }
        // }

        // stage("Stage 3: Build frontend") {
        //     steps {
        //         sh '''
        //         cd Talent-Bridge/frontend
        //         npm install
        //         npm run build
        //         '''
        //     }
        // }

        // stage("Stage 4: Creating Docker Image for frontend") {
        //     steps {
        //         sh '''
        //         cd Talent-Bridge/frontend
        //         docker build -t shouryap1/frontend:latest .
        //         '''
        //     }
        // }

        // stage("Stage 5: Creating Docker Image for backend") {
        //     steps {
        //         sh '''
        //         cd Talent-Bridge/backend
        //         docker build -t shouryap1/backend:latest .
        //         '''
        //     }
        // }

        // stage("Stage 6: Push Frontend Docker Image") {
        //     steps {
        //         sh '''
        //         docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
        //         docker push shouryap1/frontend:latest
        //         '''
        //     }
        // }

        // stage("Stage 7: Push Backend Docker Image") {
        //     steps {
        //         sh '''
        //         docker login -u ${DOCKERHUB_CRED_USR} -p ${DOCKERHUB_CRED_PSW}
        //         docker push shouryap1/backend:latest
        //         '''
        //     }
        // }
    }
}
