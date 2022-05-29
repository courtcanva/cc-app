pipeline {
        agent any
        environment {
      	           GIT_HASH = GIT_COMMIT.take(7)
		   Version_ID = "$BUILD_NUMBER" + "-" + "$GIT_HASH" + "-" + "$BUILD_TIMESTAMP"
		   NEXT_PUBLIC_UAT_URL = "$NEXT_PUBLIC_UAT_URL"
		   NEXT_PUBLIC_TEST_API = "$NEXT_PUBLIC_TEST_API"
		   NEXT_PUBLIC_API = "$NEXT_PUBLIC_API"		
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
		               echo 'Upload main branch artifact to front-end artifact repo'
				  sh 'aws s3 cp "1.0.$Version_ID".zip ${FrontEndRepo}'
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
		  stage('Clean Worksapce') {
		          steps{
			       cleanWs () 
		          }
	          }	  	
        }
}
