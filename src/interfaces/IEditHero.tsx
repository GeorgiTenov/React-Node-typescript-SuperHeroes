
export default interface IHeroEdit{
    id?:string,
    name:string | undefined,
    damage:number | undefined | string,
    health:number | undefined | string,
    armor:number | undefined | string
}