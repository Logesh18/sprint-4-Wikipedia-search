import { useState,useEffect } from "react";
const url=`https://en.wikipedia.org/w/api.php?origin=*&limit=10&action=opensearch&limit=20&format=json&search=`;
const UrlValidator=()=>{
    const [searchItem,setSearchItem]=useState("Programming");
    const [content,setContent]=useState([]);
    const [urlContent,setUrl]=useState([]);
    useEffect(()=>{
        if(searchItem.length===0){
            const time=setTimeout(()=>{
                document.getElementById("suggestionContainer").style.display="none";
                console.log("timed out-1");
            },200);    
            return ()=>clearTimeout(time);
        }
        else{
            const time=setTimeout(()=>{
                fetch(url+`${searchItem}`).then(response => {
                    return response.json()
                }).then(data => {
                    setContent(data[1])
                    setUrl(data[3])
                })
                document.getElementById("suggestionContainer").style.display="block";
                console.log("timed out-2");
            },500);
            return ()=>clearTimeout(time);
        }  
    },[searchItem]);
    return (
        <div id="bodyContainer">
            <div id="searchContainer">
                <h1>Wiki Search</h1>
                <input type="search" data-testid="searchterm" id="searchterm" placeholder="Search..." value={searchItem} onChange={e=>setSearchItem(e.target.value)}/>
                <div id="suggestionContainer">
                    { content && urlContent ?
                        content.map((data,i)=>{
                            return <p key={i.toString()}><a data-testid="suggestion" id="suggestion" href={urlContent[i]}>{data}</a></p>
                        }) : null
                    }
                </div>
            </div>
        </div>
    )
}
export default UrlValidator;