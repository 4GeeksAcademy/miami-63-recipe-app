import React, {useState, useEffect} from 'react'

export const Search = () => {
    const [search, setSearch] = useState("")
    const searchData = async() => { 
        try {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.API_KEY, 
                "Allow-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                "query": search
            })
        }
        fetch('https://api.nal.usda.gov/fdc/v1/foods/search', opts)
        .then(response => response.json())
        .then(data => console.log(data))
      } catch (error) {
          console.log("Error searching image", error)
      }

    }
   
  return (
    <div className="search">
      <h1>Search</h1>
      <input value={search} placeholder="Search Ingredient" onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={()=>searchData()}>Search</button>
    </div>
  )
}

