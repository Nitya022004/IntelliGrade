project:
  name: IntelliGrade 🎓
  description: >
    IntelliGrade is a full-stack MERN (MongoDB, Express, React, Node.js) web application built for teachers to manage and analyze student performance data with CI/CD integration using GitHub Actions, Jenkins, Docker, and SonarQube.

features:
  - 👩‍🏫 Teacher login and subject selection
  - 📝 Student marks entry (CIE1, CIE2, External, Final)
  - 📊 Grade calculation and performance visualization
  - 📈 Pass percentage comparison with previous years
  - 🖨️ Export charts and reports as PDF
  - 🔐 Secured with JWT and environment-based secrets
  - ☁️ Deployed using Docker and Render
  - ✅ Code quality analysis via SonarQube

tech_stack:
  frontend: React + Tailwind CSS
  backend: Node.js + Express.js
  database: MongoDB Atlas
  cicd: GitHub Actions + Jenkins
  containerization: Docker, Docker Hub
  code_quality: SonarQube (local/cloud)
  deployment: Render

deployment:
  env_variables:
    backend:
      MONGO_URI: "<your MongoDB URI>"
      JWT_SECRET: "<your secret>"
      PORT: "5000"
    frontend:
      REACT_APP_API_URL: "https://intelligrade-backend.onrender.com"

local_setup:
  steps:
    - Clone the repo:
        - git clone https://github.com/Nitya022004/IntelliGrade.git
        - cd IntelliGrade
    - Install dependencies:
        - npm install
        - cd client && npm install
    - MongoDB:
        - Use local MongoDB or Atlas
    - Seed database:
        - node seed.js
    - Start servers:
        - node server.js # in root
        - npm start # in /client

docker:
  local:
    - docker-compose build
    - docker-compose up

cicd_flow:
  - GitHub Actions runs tests & triggers Jenkins
  - Jenkins runs SonarQube scan + builds Docker images
  - Docker images are pushed to Docker Hub
  - Render pulls latest image & redeploys

sample_output:
  note: Sample screenshots or reports available on request

author:
  name: Nitya
  github: "@Nitya022004"

license: MIT

notes:
  - Let me know if you need:
    - Version with build badges (CI, Docker, SonarCloud)
    - SonarCloud code quality badge
    - Academic-style formatted report
