const express = require('express')
const cors = require('cors')
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}))

var filesRead = 0;
const files = ['students.json', 'students2.json', 'students3.json']
const studentData = []

function searchStr (nameStr, limit) {
    nameStr = nameStr.toLowerCase()
    let results = []
    for(let i0=0; i0<studentData.length && results.length < limit; i0++){
        if(studentData[i0].name.toLowerCase().startsWith(nameStr)) {
            results.push(studentData[i0])
        }
    }

    for(let i0=0; i0<studentData.length && results.length< limit; i0++){
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

    while(results.length < limit && filesRead < files.length){
        console.log(".....loading new file")

        let data = await fs.readFile(files[filesRead++], 'utf8');
        let dataJSON = JSON.parse(data)
        studentData.push(...dataJSON)
        results = searchStr(nameStr, limit)
    }

    res.send(JSON.stringify(results))
})

const port = 8080;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})