import React, {useContext,useState,useEffect,useRef} from "react";

import { useFetch } from "../hooks/useFetch";
import ISuperHero from "../interfaces/ISuperHero";
export const Create = () =>{
  
    const [superHero,setSuperHero] = useState<ISuperHero>();
    const nameRef = useRef<HTMLInputElement>(null);
    const armorRef = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const healthRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const name = nameRef.current?.value;
        const armor = armorRef.current?.value;
        const damage = damageRef.current?.value;
        const health = healthRef.current?.value;

        const hero:ISuperHero = {
            _id:Math.random().toString(),
            name,
            armor,
            damage,
            health
        };

        setSuperHero(hero);
        window.location.href="http://localhost:3000/";
    }
   
    const options = {
        method:"post",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(superHero)
    };

  const data =  useFetch("http://localhost:2000/create",options);
  console.log(data);
    return (
        <form action="/create" method="POST" onSubmit={e => handleSubmit(e)} encType="application/json">
            Name:<input type="text" name="name" ref={nameRef}/>
            Armor:<input type="number" name="armor" ref={armorRef}/>
            Damage:<input type="number" name="damage" ref={damageRef}/>
            Health:<input type="number" name="health" ref={healthRef}/>
            <input type="submit" value="Create"/>
        </form>
    )
}