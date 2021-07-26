pipeline {
    agent any
    tools {
        nodejs 'node-js'
    }
    stages {
        stage('install dependencies') {
            steps {
                    sh 'yarn install'
            }
        }
        stage("Code Quality Check via SonarQube")
        {
            steps {
            
            script {
                 def scannerHome = tool 'sonarqube-scanner'
    
           withSonarQubeEnv("sonarqube-server") {
           sh "${scannerHome}/bin/sonar-scanner \
                -Dsonar.projectKey=educap-pro-front \
                -Dsonar.sources=. \
                -Dsonar.host.url=https://sonar.educap.io \
                -Dsonar.login=admin \
                -Dsonar.password=admin"
               } 
           }
        }
        }

        stage('build develop') {
            steps {
                    
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
                        {
                                sh "aws s3 sync . s3://pro.educap.io --region eu-west-3 --cache-control 'max-age=31536000'"
                                sh "aws cloudfront create-invalidation --distribution-id E1X9N0F59LRLQ7 --paths '/*'"
                        
                      }
            }
        }
    }
}

}