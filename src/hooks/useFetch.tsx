import {useEffect,useState,useCallback} from "react";
import IHeroEdit from "../interfaces/IEditHero";
import ISuperHero from "../interfaces/ISuperHero";
export const useFetch = (url:string,options:{},datas:IHeroEdit | ISuperHero | {}="") =>{

    const [data,setData] = useState<ISuperHero[]>([]);

    useEffect(()=>{
        getData();
    },[datas]);

    async function getData(){
        try{
            const fetchingData = await fetch(url,options);
            const result = await fetchingData.json();
            setData(result);
        }catch(e){
            console.log(e);
        }
    }

    return data;

}