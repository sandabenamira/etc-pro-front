pipeline {
    agent any

    tools {
        nodejs "node-class-ebook"
        }
    stages {
        
        stage('install dependencies') {
            steps { 
                    sh 'yarn install'
            }
        }

        stage('build and deploy to aws prod') {
            steps { 

                   sh "export NODE_OPTIONS=--max_old_space_size=8192"

                   withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                     credentialsId: 'awscredentials',
                      secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) 
                      {
                     sh 'yarn run build:staging'
                     dir("build") {

                     sh "aws s3 sync . s3://www.d-app.educap.io --region eu-west-3"
                     sh "aws s3 sync . s3://d-app.educap.io --region eu-west-3"
                     }
                }
        }
        }
        
    }
    post { 
        always { 
            deleteDir()
        }
    }
}