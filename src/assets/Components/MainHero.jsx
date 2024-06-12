import { Show, createEffect, createResource, createSignal } from "solid-js";
import { request } from "../Request/request";
import { SearchMovies } from "./SearchMovies";
import { useNavigate } from "@solidjs/router";

const moviesResource = async () => {
    const res = await fetch(request.requestPopular);
    const data = await res.json();
    return data.results;
};

export const MainHero = ()=>{
    const [movies] = createResource(moviesResource);
    const [randomPick, setRandomPick] = createSignal(null);
    const navigate = useNavigate();
    
    const handleTitleClick = (id)=>{
        navigate(`/movie/${id}`);
    }

    createEffect(() => {
        // Memastikan movies terisi sebelum mengambil nilai randomPick
        if (movies() && movies().length > 0) {
            const pick = movies()[Math.floor(Math.random() * movies().length)];
            setRandomPick(pick);
        }
    });

    const truncateString = (str, num)=>{
        if(movies() && movies().length > 0 && str.length > num){
            return `${str.slice(0, num)} . . .`
        } else{
            return str
        }
    }
    
    return(
        <Show when={movies()} fallback={<div>{console.log('movies still empty...')}</div>}>
            {/* Tampilkan randomPick jika sudah tersedia */}
            {randomPick() !== null && (
               <div class='w-full h-[550px] text-white'>
                    <div class="absolute w-full h-[550px] z-10 bg-gradient-to-r from-black"></div>
                    <img class='w-full object-cover z-0 h-full' src={`https://image.tmdb.org/t/p/original/${randomPick().backdrop_path}`} alt= {randomPick.title} />

                    <SearchMovies/>

                    <div class='absolute w-full z-20 top-[20%] px-4 md:px-8'>
                        <h1 class="mb-2 font-bold text-3xl cursor-pointer hover:text-red-600" onClick={()=> handleTitleClick(randomPick().id)}>{randomPick().title}</h1>

                        <div class="flex gap-2">
                            <button class='border bg-gray-300 text-black border-gray-300 py-2 px-5 rounded hover:bg-red-600 hover:text-white hover:border-red-600'>Play</button>
                            <button class='border text-white border-white py-2 px-5 rounded hover:text-red-600 hover:font-semibold'>Watch later</button>
                        </div>

                        <p class="text-gray-400 text-sm mt-3">Realeased: {randomPick().release_date}</p>
                        <p class="w-[95%] mt-3 md:max-w-[65%] lg:max-w-[50%] xl:max-w-[35%]">{truncateString(randomPick().overview, 200)}</p>
                    </div>
                </div>
            )}
        </Show> 
    )
};