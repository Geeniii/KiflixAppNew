import { For, createResource, createSignal } from "solid-js";
import { searchMovies } from "../Request/request";
import { useNavigate } from "@solidjs/router";
import { RiSystemStarFill } from 'solid-icons/ri';



export const SearchMovies = () => {
    const [userInput, setUserInput] = createSignal('');
    const navigate = useNavigate();

    const [searchResults] = createResource(userInput, searchMovies); // userInput menjadi dependensi sekaligus parameter fungsi searMovies

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleTitleClick = (id)=>{
        navigate(`/movie/${id}`);
    }

    return (
        <div class="searchMovies absolute z-50 top-[8%] md:top-[2%] w-[50%] translate-x-[50%]">
            <div class="relative md:translate-x-[50%] md:w-[50%]">
                <input onInput={handleInputChange} class='
                w-full pl-2 focus:border-none focus:outline-none text-red-600 font-bold bg-[#2D2E34] rounded' 
                type="text" placeholder="Movie Search" />
            </div>

            <div class="relative w-full h-[400px] overflow-y-auto scrollbar md:w-[50%] md:translate-x-[50%]">
                <For each={searchResults()}>
                    {(movie) => (
                        <div class="bg-gray-800/90 w-full mx-auto mt-2 hover:cursor-pointer" onclick={()=>{handleTitleClick(movie.id)}}>
                            {/* movies card */}
                            <div class="flex gap-5">
                                <div class="w-[50px] ">
                                    <img class="bg-cover" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                </div>

                                {/* movies description */}
                                <div>
                                    <h3 class="font-bold" >{movie.title}</h3>
                                    <p class="flex text-xs items-center gap-1">
                                        <RiSystemStarFill class="w-[15px]"/>{movie.vote_average.toFixed(2)}
                                    </p>
                                    <p>{movie.release_date}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}
