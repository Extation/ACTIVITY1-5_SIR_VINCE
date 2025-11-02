# 🚀 QUICKSTART GUIDE

Quick commands to run Activities 1-5.

-------------------------------------------------------------------------------------

KILL ALL RUNNUNG PROCESSES FIRST TO MAKE SURE THERE ARE NO PROBLEMS WHEN THE PORTS ARE RUNNING.

RUN THIS COMMAND
-taskkill /f /IM node.exe

## 📌 Ports

| Activity | Backend | Frontend |
|----------|---------|----------|
| Activity 1 | 3001 | 3101 |
| Activity 2 | 3002 | 3102 |
| Activity 3 | 3006 | 3106 |
| Activity 4 | 3004 | 3104 |
| Activity 5 | 3005 | 3105 |

-------------------------------------------------------------------------------------

## Activity 1: To-Do List

Backend:
bash
cd ACTIVITY1/backend
npm install
npm run start:dev


Frontend:
bash
cd ACTIVITY1/frontend
npm install
npm start


Open: http://localhost:3101

---

## Activity 2: Lanesra Note

Backend:
bash
cd ACTIVITY2/backend
npm install
npm run start:dev


Frontend:
bash
cd ACTIVITY2/frontend
npm install
npm start


Open: http://localhost:3102

-------------------------------------------------------------------------------------

## Activity 3: Bookshelf

Backend:
bash
cd ACTIVITY3/bookshelf-backend
npm install
npm run start:dev


Frontend:
bash
cd ACTIVITY3/bookshelf-frontend
npm install
npm start


Open: http://localhost:3106

-------------------------------------------------------------------------------------


## Activity 4: Weather App

Backend:
bash
cd ACTIVITY4/backend
npm install
npm run start:dev


Frontend:
bash
cd ACTIVITY4/frontend
npm install
npm start


Open: http://localhost:3104

Note: Requires OpenWeatherMap API key in ACTIVITY4/backend/.env

-------------------------------------------------------------------------------------

## Activity 5: Blog Platform

Backend:
bash
cd ACTIVITY5/Activity5/backend-nestjs
npm install
npm run start:dev


Frontend:
bash
cd ACTIVITY5/Activity5/frontend
npm install
npm start


Open: http://localhost:3105

-------------------------------------------------------------------------------------

## 🛠️ Troubleshooting

Port in use?
powershell
.\kill-all-ports.ps1


Module errors?
bash
rm -rf node_modules package-lock.json
npm install


-------------------------------------------------------------------------------------



