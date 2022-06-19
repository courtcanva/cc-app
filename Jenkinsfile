pipeline {
     agent any
     environment {
          AWS_ACCESS_KEY = credentials('aws-creds-sl')
          GIT_HASH = GIT_COMMIT.take(7)
          Version_ID = "$BUILD_NUMBER" + '-' + "$GIT_HASH" + '-' + "$BUILD_TIMESTAMP"
     }
     stages {
         stage('Install dependencies') {
                         steps {
                              sh 'npm i'
                    echo 'Building..'
                              echo "Running job: ${env.JOB_NAME}\n Build: ${env.BUILD_ID} - ${env.BUILD_URL}\nPepeline: ${env.RUN_DISPLAY_URL}"
                         }
          }
         stage('Build') {
               steps {
                    sh '. /var/jenkins_home/uat.env; npm run build'
               }
                    }
         stage('Export') {
               steps {
                    sh 'npm run export'
               }
                    }
         stage('Version Number') {
               steps {
                    echo "1.0.$Version_ID"
               }
                    }
         stage('Upload Main Branch Artifact Repo') {
               when {
                    branch 'main'
               }
               steps {
                    echo 'Zip Artifact File'
                    sh 'cd out; zip -r ../"1.0.$Version_ID".zip .'
                    echo 'Upload main branch artifact to front-end artifact repo'
                    sh 'aws s3 cp "1.0.$Version_ID".zip ${UATFrontEndRepo}'
               }
                    }
         stage('Main Branch Deploy') {
               when {
                    branch 'main'
               }
               steps {
                    echo 'Deploying artifact to UAT environment from main branch'
                    sh 'aws s3 sync out ${UATS3Bucket}'
               }
          }
         stage ('Approval') {
                when {
                    branch 'test/devops'
                }
              timeout(time: 1, unit: "MINUTES") {
                    input(id: 'Deploy Gate', message: 'Deploy to PROD?', ok: 'Deploy')
              }
          }
         stage('Install dependencies-prod') {
                         steps {
                              sh 'npm i'
                    echo 'Building..'
                              echo "Running job: ${env.JOB_NAME}\n Build: ${env.BUILD_ID} - ${env.BUILD_URL}\nPepeline: ${env.RUN_DISPLAY_URL}"
                         }
          }
          stage('Build-Prod') {
               when {
                    branch 'test/devops'
               }
               steps {
                    sh '. /var/jenkins_home/prod.env; npm run build'
               }
                    }
         stage('Export-Prod') {
              when {
                    branch 'test/devops'
               }
               steps {
                    sh 'npm run export'
               }
                    }
         stage('Version Number-Prod') {
              when {
                    branch 'test/devops'
               }
               steps {
                    echo "1.0.$Version_ID"
               }
                    }
          stage('Upload Main Branch Artifact Repo to Prod') {
               when {
                    branch 'main'
               }
               steps {
                    echo 'Zip Artifact File'
                    sh 'cd out; zip -r ../"1.0.$Version_ID".zip .'
                    echo 'Upload main branch artifact to front-end artifact repo'
                    sh 'aws s3 cp "1.0.$Version_ID".zip ${FrontEndRepo}'
               }
                    }
          stage ('Deploy To Prod') {
               when {
                    branch 'main'
               }
               steps {
                    echo 'Deploying artifact to PROD environment from main branch'
                    sh 'aws s3 sync out ${PRODS3Bucket}'
               }
          }
     }
     post {
          always {
               cleanWs()
          }
     }
}
