import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const limit = 5;
  const debounceDelay = 1000;
  // const [triggerSwitch, setTriggerSwitch] = useState(false)
  const [searchStrVal, setSearchStrVal] = useState('')
  const [students, setStudents] = useState([])
  const [results, setResults] = useState([])
  const [selectedStudent, setSelectedStudent] = useState()
  const debounce = useRef({clear: null, time: null});

  const searchRef = useRef(null);
  
  const fetchNames = useCallback((nameStr, newLimit) => {
    console.log(`fetching for ${nameStr} with limit ${newLimit}`)
    fetch(`http://localhost:8080/search/name/${nameStr}/${newLimit}`)
    .then((data) => data.json())
    .then((data) => {

        setStudents((s) => {
          let filteredResults = [];
            for(let item of data){
              let eligible = true;
              for(let student of s){
                if(item.rollNumber === student.rollNumber){
                  eligible = false;
                  break;
                }
              }
              if(eligible){
                filteredResults.push(item)
              }
            }

            if(filteredResults.length > 0){
              return s.concat(filteredResults).sort((a,b) => a.name<b.name ? -1 : a.name>b.name ? 1 : 0)
            }
            else{
              console.log("no new results")
              return s
            }
        });
    })
  }, [])

  const searchStr = useCallback((nameStr) => {
      nameStr = nameStr.toLowerCase()
      let results = []
      for(let i0=0; i0<students.length && results.length < limit; i0++){
          if(students[i0].name.toLowerCase().startsWith(nameStr)) {
              results.push(students[i0])
          }
      }
        
      let newLimit = limit - results.length;
        let de = debounce.current;
        if(newLimit > 0){
          let delay = debounceDelay;
          if(de.time){
            let elapsed =  document.timeline.currentTime - de.time
            console.log(elapsed)
            console.log(de.delay)
            if(elapsed < de.delay){
              console.log("cleared timeout for id: ", de.clear)
              clearTimeout(de.clear);
              delay = de.delay - elapsed;
            }
            else{
              console.log("not cleared for ,", de.clear)
            }
          }
          else{
            console.log("no debounce.time for", de.clear)
          }
          let clear = setTimeout(() => fetchNames(nameStr, limit), delay);
          debounce.current = {clear: clear, time: document.timeline.currentTime, delay: delay}
        }

      for(let i0=0; i0<students.length && results.length< limit; i0++){
          if(students[i0].name.toLowerCase().includes(nameStr) && !results.find(it => it.name === students[i0].name)){
              results.push(students[i0])
          }
      }

      return results;
  }, [fetchNames, students])

  useEffect(() => {

    if(searchStrVal.length >= 3){
      let newResults = searchStr(searchStrVal)
      setResults(newResults)
    }
    else{
      setResults([])
    }

  }, [searchStrVal, searchStr])

  useEffect(()=> {
    console.log(students)
    console.log("results updated, new results: ", results)
  }, [results, students])

  function handleSelect(rollNumber){
    console.log(rollNumber)
    let selectedStudent = students.find(it => it.rollNumber === parseInt(rollNumber))
    setSelectedStudent(selectedStudent)
    console.log("selected student, ", selectedStudent)
  }

  window.onclick = (e) => {
    if(e.target !== searchRef.current){
      setSearchStrVal('')
    }
  }

  return (
    <div className="App">
      <div className='search-container'>
        <input ref={searchRef} className="searchbar" type='search' style={{width: '100%'}} value={searchStrVal} onChange={(e)=> setSearchStrVal(e.target.value)}/>
        <SearchResults results={results} handleSelect={handleSelect} searchStrVal={searchStrVal}/>
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
  );
}

function SearchResults({results, handleSelect, searchStrVal}){
  
  const getResultString = (result) => {
    if(!result){
      return
    }
    let name = result.name;
    let regex = new RegExp(searchStrVal, 'i')
    let match = regex.exec(name)
    if(!match){
      return <>{name}, Roll Number: {result.rollNumber}</>
    }
    let nameBefore = name.slice(0, match.index)
    let nameAfter = name.slice(match.index+match[0].length, name.length)
    return <>{nameBefore}<b>{match[0]}</b>{nameAfter}, Roll Number: {result.rollNumber}</>;
  }

  return(
        <div className="search-results-container">
          <div className='search-results'>
            {results.map((result) => 
              <div className="search-result" key={result.rollNumber} onClick={() => handleSelect(result.rollNumber)}>{getResultString(result)}</div>
            )}
          </div>
        </div>    
  )
}

export default App;
