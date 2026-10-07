pipeline {

    agent any

    environment {
        registryProjet = 'registry.pulse.mg/dev/plot-tracking-front'
        app_name_tag = '1.0'
        commitIdLong = ''
        commitID = ''
        image = ''
        tag = ''
        dockerImage = ''
        PROJECT_NAME = sh(script: 'basename -s .git ${GIT_URL}', returnStdout: true).trim()
        RELEASE_VERSION = "${env.GIT_COMMIT}"
    }

    stages {
        ///////////////////OWASP DEPENDENCY CHECK ////////
        stage('Dependency Check') {
            steps {
                script {
                    dependencyCheck (
                        odcInstallation: "DP-check",
                        additionalArguments: "--format XML --scan ${WORKSPACE}"
                    )
                }
            }
        }

        ///////////////////OWASP DEPENDENCY PUBLISHER /////
        stage('Dependency Check Publisher') {
            steps {
                script {
                    step([$class: 'DependencyCheckPublisher', pattern: "**/dependency-check-report.xml", totalThresholdAnalysisExploitable: true, newThresholdAnalysisExploitable: true])
                }
            }
        }

        /////////////////// SONAR SCANNER /////////////////
        stage('Review Sonar') {
            steps {
                withSonarQubeEnv('sonar-devops') {
                    // set the analysis mode to incremental
                    script {
                        def scannerHome = tool 'Sonar_Scanner'
                        sh "${scannerHome}/bin/sonar-scanner -X -Dsonar.mode=incremental -Dsonar.qualitygate.wait=true -Dsonar.projectKey=${PROJECT_NAME} -Dsonar.projectVersion=${RELEASE_VERSION} -Dsonar.sources=src || true"
                    }                    
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Nettoyer l'espace de travail Jenkins après exécution
        }
    }
}
