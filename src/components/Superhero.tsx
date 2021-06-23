import React, { MouseEventHandler } from "react"
import { JsxElement } from "typescript"
import ISuperHero from "../interfaces/ISuperHero"



export const Superhero:React.FC<{hero:ISuperHero,click:(e:React.ChangeEvent<HTMLInputElement>)=>void}> = (prop) =>{

    return(
        <div>
            Name:<h1 onClick={e => prop.click}>{prop.hero.name}</h1>
            Armor:<p>{prop.hero.armor}</p>
            Damage:<p>{prop.hero.damage}</p>
            Health:<p>{prop.hero.health}</p>
           ID:<p>{prop.hero._id}</p>
         
        </div>
    )
}