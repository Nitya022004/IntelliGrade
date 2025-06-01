title: "IntelliGrade 🎓📊"
description: "A MERN stack-based teacher dashboard to track student performance, visualize results, and automate deployment with Docker and CI/CD."

features:
  - Teacher Login with subject access
  - View subject-wise marks
  - Pie charts and grade analysis
  - Filter by subject and grade
  - Data seeding with sample teachers/students
  - Dockerized backend & frontend
  - CI/CD with GitHub Actions and Jenkins

tech_stack:
  frontend: "React + Tailwind CSS"
  backend: "Node.js + Express"
  database: "MongoDB (external)"
  visualization: "Chart.js"
  ci_cd: "GitHub Actions & Jenkins"
  deployment: "Docker & Docker Compose"

run_locally:
  step_1_start_mongodb: |
    mongod
  step_2_seed_data:
    - cd server
    - node seed.js
    - .env_mongo_uri_local: "mongodb://localhost:27017/gradescope"
    - .env_mongo_uri_docker: "mongodb://host.docker.internal:27017/gradescope"
  step_3_run_app:
    - cd IntelliGrade
    - sudo docker-compose up
    - open: "http://localhost:3000"

sample_teachers:
  - name: "Neha"
    password: "neha123"
  - name: "Viji"
    password: "viji123"
  - name: "Shalini"
    password: "shalini123"

docker_hub:
  backend: "https://hub.docker.com/r/nitya222/intelligrade-backend"
  frontend: "https://hub.docker.com/r/nitya222/intelligrade-frontend"

ci_cd:
  github_actions: "Auto build on push"
  jenkins: "Local build job via webhook or polling"

project_structure:
  - client/: "React frontend"
  - server/: "Express backend + seed script"
  - docker-compose.yml: "Compose config"
  - .env: "Mongo URI & port"

HEAD
---

## 🧪 Run Locally

### 1. Start MongoDB

```bash
mongod
2. (Only once) Seed data
bash
Copy
Edit
cd server
node seed.js
Make sure your .env file has:

bash
Copy
Edit
MONGO_URI=mongodb://localhost:27017/gradescope
Then switch back .env to:

bash
Copy
Edit
MONGO_URI=mongodb://host.docker.internal:27017/gradescope
3. Run App
bash
Copy
Edit
cd IntelliGrade
sudo docker-compose up
Open: http://localhost:3000

👨‍🏫 Sample Teachers
Name	Password
Neha	neha123
Viji	viji123
Shalini	shalini123

🐳 Docker Hub
Backend: nitya222/intelligrade-backend

Frontend: nitya222/intelligrade-frontend

⚙️ CI/CD
GitHub Actions: Auto build on push

Jenkins: Local build job via webhook or polling

📁 Project Structure
arduino
Copy
Edit
client/               → React frontend  
server/               → Express backend + seed script  
docker-compose.yml    → Compose config  
.env                  → Mongo URI & port  

done.
=======
author:
  name: "Nityashree R"
  semester: "6th Sem CSE"
  college: "MR Ramaiah Institute of Technology"
>>>>>>> recover-detached
