import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const limit = 5;
  var [triggerSwitch, setTriggerSwitch] = useState(false)
  var [searchStrVal, setSearchStrVal] = useState('')
  var [students, setStudents] = useState([])
  var [results, setResults] = useState([])
  var [selectedStudent, setSelectedStudent] = useState()

  function searchStr (nameStr) {
      nameStr = nameStr.toLowerCase()
      let results = []
      for(let i0=0; i0<students.length && results.length <= limit; i0++){
          if(students[i0].name.toLowerCase().startsWith(nameStr)) {
              results.push(students[i0])
          }
      }
        
      let newLimit = limit - results.length;
      if(newLimit > 0)
        fetchNames(nameStr, newLimit);

      for(let i0=0; i0<students.length && results.length<= limit; i0++){
          if(students[i0].name.toLowerCase().includes(nameStr) && !results.find(it => it.name === students[i0].name)){
              results.push(students[i0])
          }
      }

      return results;
  }

  function fetchNames(nameStr, newLimit){
    console.log(`fetching for ${nameStr} with limit ${newLimit}`)
    fetch(`http://localhost:8080/search/name/${nameStr}/${newLimit}`)
    .then((data) => data.json())
    .then((data) => {
      let filteredResults = [];
      for(let item of data){
        let eligible = true;
        for(let student of students){
          if(item.rollNumber === student.rollNumber){
            eligible = false;
            break;
          }
        }
        if(eligible){
          filteredResults.push(item)
        }
      }

      setStudents((s) => s.concat(filteredResults));
      if(filteredResults.length > 0){
        console.log("new students loaded")
        setTriggerSwitch(s => setTriggerSwitch(!s))
      }
      else{
        console.log("no new results")
      }
    })
  }

  useEffect(() => {

    if(searchStrVal.length >= 3){
      let newResults = searchStr(searchStrVal)
      setResults(newResults)
    }
    else{
      setResults([])
    }

  }, [searchStrVal, triggerSwitch])

  useEffect(()=> {
    console.log("results updated, new results: ", results)
  }, [results])

  function handleSelect(rollNumber){
    // let value = e.target.value
    // let rollNumber = value.slice(value.length-5, value.length)
 
    let selectedStudent = students.find(it => it.rollNumber === parseInt(rollNumber))
    setSelectedStudent(selectedStudent)
    console.log("selected student, ", selectedStudent)
  }

  return (
    <div className="App">
        {/* <input type='text' onChange={handleChange} value={searchStr}/> */}
      <div className='search-container'>
        <div className="searchbar-container">
        <input type='text' style={{width: '100%'}} value={searchStrVal} onChange={(e)=> setSearchStrVal(e.target.value)}/>
        {/* <select  style={{width: '100%'}} onChange={handleSelect}> */}
        {results.map((result) => 
          <div className="search-result" key={result.rollNumber} onClick={() => handleSelect(result.rollNumber)}>name: {result.name}, roll number: {result.rollNumber}</div>
        )}
        {/* </select> */}
        </div>
        <div className='selected-result'>
          {selectedStudent && 
            <section>
              <p className='selected-result-row'>Roll Number: {selectedStudent.rollNumber}</p>
              <p className='selected-result-row'>Name: {selectedStudent.name}</p>
              <p className='selected-result-row'>Class: {selectedStudent.class}</p>
            </section>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
