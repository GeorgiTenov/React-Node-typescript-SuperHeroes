import { useFetch } from "../hooks/useFetch";
import { useState,useEffect } from "react";
import ISuperHero from "../interfaces/ISuperHero";
import { Superhero } from "./Superhero";
import {Create} from "./Create";
import {Edit,idType} from "./Edit";


export const Home = () => {

    const [superHeroes,setSuperHeroes] = useState<ISuperHero[]>([]);
    const [create,setCreate] = useState<boolean>(false);
    const [edit,setEditPage] = useState<boolean>(false);
    const [oldHeroes,setOldHeroes] = useState<ISuperHero[]>([]);
    const [sortedHeroes,setSortedHeroes] = useState<ISuperHero[]>([]);

    const options = {
        method:"GET",
        headers:{
                "Content-type":"application/json",
                "Access-Control-Allow-Origin":"*"
    }
};
const fetchedData = useFetch("http://localhost:2000/heroes",options);

useEffect(()=>{
    setSuperHeroes(fetchedData);
},[fetchedData]);

useEffect(()=>{
    setSuperHeroes(sortedHeroes);
},[sortedHeroes]);

function goToCreatePage(){
    setCreate(true);
   window.location.href="/create";
}
function deleteHero(id:string|undefined){
    const heroes = superHeroes.filter(h => h._id !== id);
    setSuperHeroes(heroes);
}


function checkHomeUrl(){
    if(window.location.href === "http://localhost:3000/")
    return true;

    return false;
}

function checkCreateUrl(){
    if(window.location.href === "http://localhost:3000/create")
    return true;

    return false;
}
let heroId:string = "";
function checkEditUrl(){
    if(window.location.href.includes("edit"))
    return true;

    return false;
}

function editHero(id:string){
    heroId = id;
    setEditPage(true);
   window.location.href=`http://localhost:3000/edit?${heroId}`;
}

function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
    
    if(oldHeroes.length === 0){
        setOldHeroes(superHeroes);
    }
   

    if(e.target.value === ""){
        setSuperHeroes(oldHeroes);
        return;
    }
   
    const searchValue = e.target.value;
    console.log(searchValue);
    const heroes = superHeroes.filter(s => s.name?.toLowerCase().trim().includes(searchValue.toLowerCase())); 
    setSuperHeroes(heroes);

}

function sortSuperHeroes(e:React.ChangeEvent<HTMLInputElement>):void{
   const sorted = superHeroes.sort((a:ISuperHero,b:ISuperHero)=>{
       const aName = e.target.value.toLowerCase();
       const bName = b?.name?.toLowerCase();

        if(aName && bName){

            if(aName > bName) return 1;

            if(aName < bName) return -1;
        }
      return 0;
   })
  setSortedHeroes(sorted);
   setSuperHeroes(sortedHeroes);
  
}

    return(
        
        <div>
            <input type="text" onChange={(e)=> handleSearch(e)}/>
            {checkHomeUrl()  && <> <button onClick={goToCreatePage}>Create</button>
           
        <ul>
            {superHeroes.map((hero:ISuperHero,index:number)=>(
               <li key={index}>
                   <Superhero key={index} click={(e:React.ChangeEvent<HTMLInputElement>)=>sortSuperHeroes(e)} hero={hero}></Superhero>
                   <button onClick={()=>deleteHero(hero._id)}>Delete</button>
                   <button onClick={()=>editHero(hero._id)}>Edit</button>
                   </li>
            ))
            }
        </ul>
        </>}
             {checkCreateUrl() && <Create></Create>}
             {checkEditUrl() && <Edit id={heroId} superheroes={superHeroes}></Edit>}
          
        </div>

    )
        
}