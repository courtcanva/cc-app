pipeline {
agent any
   environment {
      	GIT_HASH = GIT_COMMIT.take(7)
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
		    sh 'echo Version Number: "$GIT_HASH"';
            }
        }
	stage('Master Branch Deploy') {
		when {
		  branch 'master'
		}
		steps {
		  echo 'Deploying Code from master branch'
		  sh 'aws s3 sync out s3://uat.design.courtcanva.com'
        }
   }  
       stage('Master Branch Deploy to Standby') { 
	       when {
		  branch 'master'
		}
	       steps{
	           echo 'Zip Artifact File'
		   sh 'zip "$GIT_HASH".zip ./out/*'
		   echo 'Upload artifact zip file to frontend artifact repo'
		   sh 'aws s3 cp "$GIT_HASH".zip s3://frontend.artifact.repo'
		  }
       }
	stage('Clean Worksapce') {
		 steps{
			 cleanWs () 
		 }
	 }	  
	
    }
}
