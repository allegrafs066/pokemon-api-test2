export interface FetchAllPokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    height: number;
    url:  string;
    abilities: string[];
}

export interface Pokemon{
    id:string;
    name:string;
    pic:string;
    height:number;
    weight:number;
    abilities:string[];

}