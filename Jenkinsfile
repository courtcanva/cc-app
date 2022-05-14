pipeline {
        agent any
        environment {
      	           GIT_HASH = GIT_COMMIT.take(7)
		   Version_ID = "$BUILD_NUMBER" + "-" + "$GIT_HASH" + "-" + "$BUILD_TIMESTAMP"
        }
        stages{
                   stage('Install dependencies') {
                         steps {
                              sh 'npm i'
		              echo 'Building..'
                              echo "Running job: ${env.JOB_NAME}\n Build: ${env.BUILD_ID} - ${env.BUILD_URL}\nPepeline: ${env.RUN_DISPLAY_URL}"
                         }
                   }   
                    stage('Build') {
                          steps {
                               sh 'npm run build'
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
	                  steps{
	                       echo 'Zip Artifact File' 
		               sh 'zip "1.0.$Version_ID".zip ./out/*'
		               echo 'Upload main branch artifact to UAT frontend artifact repo'
		               sh 'aws s3 cp "1.0.$Version_ID".zip s3://frontend.artifact.repo/courtcanva.app.artifact.repo/'
		          }
                   }
	            stage('Main Branch Deploy') {
		          when {
		               branch 'feature/ccd-0008-front-end-jenkins-file'
		          }
		          steps {
		               echo 'Deploying artifact to UAT environment from main branch'
                         sh 'export uatS3=`cat uatenv`'
		               sh 'aws s3 sync out "$uatS3"'
                          }
                  }  
		stage('Clean Worksapce') {
		          steps{
			       cleanWs () 
		          }
	          }	  	
        }
}
