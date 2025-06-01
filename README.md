# IntelliGrade 🎓📊

A MERN stack-based teacher dashboard to track student performance, visualize results, and automate deployment with Docker and CI/CD.

---

## 🔑 Features

- Teacher Login with subject access  
- View subject-wise marks  
- Pie charts and grade analysis  
- Filter by subject and grade  
- Data seeding with sample teachers/students  
- Dockerized backend & frontend  
- CI/CD with GitHub Actions and Jenkins  

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (external)  
- **Visualization**: Chart.js  
- **CI/CD**: GitHub Actions & Jenkins  
- **Deployment**: Docker & Docker Compose  

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