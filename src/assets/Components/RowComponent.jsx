import {For, Show, createResource} from "solid-js";
import { MovieComponent } from "./MovieComponent";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'solid-icons/bs';


const fetchMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
};

export const RowComponent = (props) => {
    const [movies] = createResource(() => fetchMovies(props.fetchUrl));
    
    const slideLeft = ()=>{
        let slider = document.getElementById('slider' + props.rowId);
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = ()=>{
        let slider = document.getElementById('slider' + props.rowId);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <Show when={movies()}>
            <>
                <h2 class="text-white font-bold md:text-xl p-4">{props.title}</h2>
                <div class="relative flex items-center group">
                    <BsArrowLeftCircleFill onClick={slideLeft} size={40} color="#FFFFFF" class="left-0 md:hidden absolute cursor-pointer z-10 opacity-50 hover:opacity-100 group-hover:block"/>
                    <div id={'slider' + props.rowId} class="w-full h-full overflow-x-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative">
                        <For each={movies()}>
                            {(movie) => (
                                <MovieComponent item={movie}/>
                            )}
                        </For>
                    </div>
                    <BsArrowRightCircleFill onClick={slideRight} size={40} color="#FFFFFF" class="right-0 md:hidden absolute cursor-pointer z-10 opacity-50 hover:opacity-100 group-hover:block" />
                </div>
            </>
        </Show>
    );
};