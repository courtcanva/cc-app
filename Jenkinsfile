pipeline {
agent any
	environment {
    VERSION = VersionNumber(projectStartDate: '2022-05-11', versionNumberString: '${BUILDS_ALL_TIME,XXXX}')  
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
	     stage('Test') {
            steps {
                echo 'Testing..., Version number is $VERSION'
            }
        }
	stage('Master Brach Deploy') {
		when {
		  branch 'master'
		}
		steps {
		  echo 'Deploying Code from master branch'
		  sh 'aws s3 sync .out s3://uat.design.courtcanva.com'
        }
     }
	
  }
}
