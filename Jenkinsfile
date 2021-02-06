pipeline {
    agent any
    tools {
        nodejs 'node-class-ebook'
    }
    stages {
        stage('install dependencies') {
            steps {
                    sh 'yarn install'
            }
        }

        stage('build develop') {
            when {
                branch 'develop'
            }

            steps {
                    sh'export NODE_OPTIONS=--max_old_space_size=8192'
                    sh 'yarn run build:staging'
            }
        }

        stage('Send to s3 bucket') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                     credentialsId: 'awscredentials',
                      secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']])
                      {

                            dir('build')

                                sh 'aws s3 sync . s3://pro.educap.io --region eu-west-3'
                      }
            }
        }
    }

}


