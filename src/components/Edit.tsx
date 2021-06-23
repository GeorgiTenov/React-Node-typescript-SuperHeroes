import ISuperHero from "../interfaces/ISuperHero";
import { useState,useEffect,useRef } from "react";
import IHeroEdit from "../interfaces/IEditHero";
import { useFetch } from "../hooks/useFetch";

export type idType = string | undefined;
export const Edit:React.FC<{id:string,superheroes:ISuperHero[]}> = (prop) =>{
    const [hero,setHero] = useState<ISuperHero>();
    const [heroEdiitted,setHeroEditted] = useState<IHeroEdit>();

    const nameRef = useRef<HTMLInputElement>(null);
    const armorRef = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const healthRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);

    let params:string = window.location.search.substr(1).trim();
    function getHero(){
        console.log("heroes",prop.superheroes);
        const heroz:ISuperHero[] = prop.superheroes.filter(h => h._id === params);
        console.log("heroz",heroz);
        
        return heroz[0];
    }
  
   useEffect(() => {
      setHero(getHero());
   }, [prop.superheroes]);

   function handleEdit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const edittedHero:IHeroEdit = {
            id:idRef.current?.value,
            name:nameRef.current?.value,
            damage:damageRef.current?.value,
            armor:armorRef.current?.value,
            health:healthRef.current?.value
        }
        setHeroEditted(edittedHero);
        console.log(edittedHero);
        window.location.href="http://localhost:3000/";
   }
   const options ={
    method:"PUT",
    headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify(heroEdiitted)
   };

   useFetch(`http://localhost:2000/heroes/${params}`,options,heroEdiitted);
    
    return (

        <form onSubmit={e => handleEdit(e)}>
            ID:{params}<br></br>   
            Name:<input type="text" name="name" placeholder={hero?.name} ref={nameRef}/>
           Damage:<input type="number" name="damage" placeholder={hero?.damage?.toString()} ref={damageRef}/>
           Armor:<input type="number" name="armor" placeholder={hero?.armor?.toString()} ref={armorRef}/>
           Health:<input type="number" name="health" placeholder={hero?.health?.toString()} ref={healthRef}/>
           <input hidden type="text" name="id" defaultValue={params} ref={idRef}/>
            <input type="submit" value="Edit"/>
        </form>
    )
} 