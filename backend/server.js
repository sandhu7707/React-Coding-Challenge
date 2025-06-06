const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors({origin: 'http://localhost:3000'}))

var filesRead = 0;
const files = ['students.json', 'students2.json', 'students3.json']
const studentData = []

async function searchStr (nameStr, limit, offset) {
    nameStr = nameStr.toLowerCase()
    let scanned = []
    let results = []
    let currentOffset = 0;
    let hasMore = false;
    
    if(studentData.length === 0){
        await loadNewFile()
    }

    for(let i0=0; ; i0++){
        if(results.length === limit){
            hasMore = true;
            break;
        }
        else if(i0 === studentData.length-1){
            break;
        }
        if(studentData[i0].name.toLowerCase().startsWith(nameStr)) {
            if(currentOffset >= offset){
                results.push(studentData[i0])
            }
            currentOffset++;
            scanned.push(studentData[i0])
        }
    }

    for(let i0=0; ; i0++){
        if(results.length === limit){
            hasMore = true;
            break;
        }
        else if(i0 === studentData.length-1){
            break;
        }
        if(studentData[i0].name.toLowerCase().includes(nameStr) && !scanned.find(it => it.name === studentData[i0].name)){
            if(currentOffset >= offset){
                results.push(studentData[i0])
            }
            currentOffset++;
            scanned.push(studentData[i0])
        }
    }

    while(results.length < limit && filesRead < files.length){
        await loadNewFile()
        return searchStr(nameStr, limit, offset)
    }

    return {results: results, hasMore: hasMore};
}

async function loadNewFile(){
    console.log(".....loading new file")
    let data = await fs.readFile("./" + files[filesRead++], 'utf8');
    let dataJSON = JSON.parse(data)
    studentData.push(...dataJSON)
    studentData.sort()
}

const fs = require('fs').promises;
app.get('/search/name/:nameStr', async(req, res) => {
    let nameStr = req.params.nameStr

    let limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let offset = req.query.offset ? parseInt(req.query.offset) : 0; 

    let data = await searchStr(nameStr, limit, offset)

    console.log(`returning ${data.results.length} results`)
    res.send(JSON.stringify(data))
})


const port = 8080;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})