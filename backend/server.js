const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}))
fs.readFile('students.json', (err, data) => {
    console.log(data)
})

const studentData = [
    {
        "name": "Amritpal Singh",
        "class": 10,
        "rollNumber": 10001
    },
    {
        "name": "Jaspreet Kaur",
        "class": 9,
        "rollNumber": 10002
    },
    {
        "name": "Harpreet Singh",
        "class": 10,
        "rollNumber": 10003
    },
    {
        "name": "Simran Kaur",
        "class": 1,
        "rollNumber": 10004
    },
    {
        "name": "Gurpreet Singh",
        "class": 8,
        "rollNumber": 10005
    },
    {
        "name": "Navjot Kaur",
        "class": 7,
        "rollNumber": 10006
    },
    {
        "name": "Daljeet Singh",
        "class": 6,
        "rollNumber": 10007
    },
    {
        "name": "Harmandeep Kaur",
        "class": 5,
        "rollNumber": 10008
    },
    {
        "name": "Jatinder Singh",
        "class": 4,
        "rollNumber": 10009
    },
    {
        "name": "Mandeep Kaur",
        "class": 3,
        "rollNumber": 10010
    },
    {
        "name": "Gagandeep Singh",
        "class": 2,
        "rollNumber": 10011
    },
    {
        "name": "Ravinder Kaur",
        "class": 1,
        "rollNumber": 10012
    },
    {
        "name": "Sukhdeep Singh",
        "class": 10,
        "rollNumber": 10013
    },
    {
        "name": "Baljit Kaur",
        "class": 9,
        "rollNumber": 10014
    },
    {
        "name": "Rajinder Singh",
        "class": 12,
        "rollNumber": 10015
    },
    {
        "name": "Harjot Kaur",
        "class": 11,
        "rollNumber": 10016
    },
    {
        "name": "Avneet Singh",
        "class": 8,
        "rollNumber": 10017
    },
    {
        "name": "Parminder Kaur",
        "class": 7,
        "rollNumber": 10018
    },
    {
        "name": "Jagdeep Singh",
        "class": 6,
        "rollNumber": 10019
    },
    {
        "name": "Ramandeep Kaur",
        "class": 5,
        "rollNumber": 10020
    },
    {
        "name": "Inderjeet Singh",
        "class": 12,
        "rollNumber": 10021
    },
    {
        "name": "Manpreet Kaur",
        "class": 11,
        "rollNumber": 10022
    },
    {
        "name": "Tajinder Singh",
        "class": 10,
        "rollNumber": 10023
    },
    {
        "name": "Kirandeep Kaur",
        "class": 9,
        "rollNumber": 10024
    },
    {
        "name": "Ravneet Singh",
        "class": 8,
        "rollNumber": 10025
    },
    {
        "name": "Jaskiran Kaur",
        "class": 7,
        "rollNumber": 10026
    },
    {
        "name": "Hardeep Singh",
        "class": 6,
        "rollNumber": 10027
    },
    {
        "name": "Rajwinder Kaur",
        "class": 5,
        "rollNumber": 10028
    },
    {
        "name": "Sandeep Singh",
        "class": 4,
        "rollNumber": 10029
    },
    {
        "name": "Pavneet Kaur",
        "class": 3,
        "rollNumber": 10030
    },
    {
        "name": "Gurjinder Singh",
        "class": 2,
        "rollNumber": 10031
    },
    {
        "name": "Harpreet Kaur",
        "class": 1,
        "rollNumber": 10032
    },
    {
        "name": "Jaswinder Singh",
        "class": 12,
        "rollNumber": 10033
    },
    {
        "name": "Davinder Kaur",
        "class": 11,
        "rollNumber": 10034
    },
    {
        "name": "Surinder Singh",
        "class": 10,
        "rollNumber": 10035
    },
    {
        "name": "Kanwaljit Kaur",
        "class": 9,
        "rollNumber": 10036
    },
    {
        "name": "Bhupinder Singh",
        "class": 8,
        "rollNumber": 10037
    },
    {
        "name": "Ranjit Kaur",
        "class": 7,
        "rollNumber": 10038
    },
    {
        "name": "Jatpreet Singh",
        "class": 6,
        "rollNumber": 10039
    },
    {
        "name": "Navneet Kaur",
        "class": 5,
        "rollNumber": 10040
    },
    {
        "name": "Taranjit Singh",
        "class": 4,
        "rollNumber": 10041
    },
    {
        "name": "Rajveer Kaur",
        "class": 3,
        "rollNumber": 10042
    },
    {
        "name": "Kamaljit Singh",
        "class": 2,
        "rollNumber": 10043
    },
    {
        "name": "Amarjeet Kaur",
        "class": 1,
        "rollNumber": 10044
    },
    {
        "name": "Satnam Singh",
        "class": 12,
        "rollNumber": 10045
    },
    {
        "name": "Paramjit Kaur",
        "class": 11,
        "rollNumber": 10046
    },
    {
        "name": "Gurcharan Singh",
        "class": 10,
        "rollNumber": 10047
    },
    {
        "name": "Balwinder Kaur",
        "class": 9,
        "rollNumber": 10048
    },
    {
        "name": "Kuldip Singh",
        "class": 8,
        "rollNumber": 10049
    },
    {
        "name": "Harmohan Kaur",
        "class": 7,
        "rollNumber": 10050
    }
]

function searchStr (nameStr, limit) {
    nameStr = nameStr.toLowerCase()
    let results = []
    for(let i0=0; i0<studentData.length && results.length <= limit; i0++){
        if(studentData[i0].name.toLowerCase().startsWith(nameStr)) {
            results.push(studentData[i0])
        }
    }

    for(let i0=0; i0<studentData.length && results.length<= limit; i0++){
        if(studentData[i0].name.toLowerCase().includes(nameStr) && !results.find(it => it.name === studentData[i0].name)){
            results.push(studentData[i0])
        }
    }

    return results;
}

app.get('/search/name/:nameStr/:limit', async(req, res) => {
    let nameStr = req.params.nameStr
    let limit = req.params.limit

    let results = searchStr(nameStr, limit)

    res.send(JSON.stringify(results))
})

const port = 8080;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})