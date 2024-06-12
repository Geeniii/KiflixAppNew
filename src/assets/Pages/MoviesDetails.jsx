import { useParams } from "@solidjs/router";
import { Show, createResource, createSignal, createEffect } from "solid-js";
import { getMoviesDetails } from "../Request/request";
import { RiSystemStarFill } from 'solid-icons/ri';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'solid-icons/bs';
import { UserAuth } from "../../Context/AuthContext";
import { db } from '../../firebase';
import { arrayUnion, arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';

export const MoviesDetails = () => {
    const params = useParams();
    const [movieDetails] = createResource(() => params.id, getMoviesDetails);
    const moviePosterURL = 'https://image.tmdb.org/t/p/w500/';
    const [bookMark, setBookMark] = createSignal(false);
    const { user } = UserAuth();

    const truncateString = (str, num) => {
        if (str.length > num) {
            return `${str.slice(0, num)} . . .`
        } else {
            return str
        }
    }

    const checkIfBookmarked = async () => {
        if (user() && user().email) {
            const movieID = doc(db, 'users', `${user().email}`);
            const movieDoc = await getDoc(movieID);
            if (movieDoc.exists()) {
                const savedMovies = movieDoc.data().savedMovies || [];
                const isBookmarked = savedMovies.some(movie => movie.id === movieDetails().id);
                setBookMark(isBookmarked);
            }
        }
    };

    const saveMovie = async () => {
        if (user() && user().email) {
            const movieID = doc(db, 'users', `${user().email}`);
            try {
                if (bookMark()) {
                    // Jika film sudah di-bookmark, hapus dari daftar bookmark
                    await updateDoc(movieID, {
                        savedMovies: arrayRemove({
                            id: movieDetails().id,
                            title: movieDetails().title,
                            img: movieDetails().backdrop_path
                        })
                    });
                } else {
                    // Jika film belum di-bookmark, tambahkan ke daftar bookmark
                    await updateDoc(movieID, {
                        savedMovies: arrayUnion({
                            id: movieDetails().id,
                            title: movieDetails().title,
                            img: movieDetails().backdrop_path
                        })
                    });
                }
                setBookMark(!bookMark());
            } catch (error) {
                console.error("Error updating movie bookmark:", error);
            }
        } else {
            alert('Need to log in to save the movie.');
        }
    };

    // Gunakan createEffect untuk menjalankan checkIfBookmarked ketika movieDetails berubah
    createEffect(() => {
        if (movieDetails()) {
            checkIfBookmarked();
        }
    });

    return (
        <Show when={movieDetails()}>
            <div class="relative">
                {/* backdrop image */}
                <div class="w-full object-cover">
                    <img class="w-full xl:h-screen" src={`${moviePosterURL}${movieDetails().backdrop_path}`} alt={movieDetails().title} />
                </div>
                {/* layer */}
                <div class="absolute top-0 w-full h-full bg-slate-950/70 backdrop-blur"></div>

                {/* movie desc container */}
                <div class="absolute w-full top-[3.5rem] flex gap-[1rem]">
                    {/* poster */}
                    <div class="object-cover ml-[1rem] w-[30%] overflow-hidden rounded-2xl md:ml-[2rem]">
                        <img class='w-[8rem] md:w-[20rem] xl:w-[25rem]' src={`${moviePosterURL}${movieDetails().poster_path}`} alt="" />
                    </div>
                    {/* movie desc */}
                    <div class="w-[60%]">
                        <div>
                            {/* title and Bookmarked */}
                            <div class="flex justify-between items-center">
                                <h1 class="font-bold md:font-extrabold text-gray-300 text-xl md:text-2xl xl:text-5xl w-[80%]">
                                    {movieDetails().title}
                                </h1>
                                <p class="mr-3 text-gray-400 md:mr-[5rem]" onClick={saveMovie}>
                                    {bookMark() ? <BsBookmarkPlusFill class="hover:cursor-pointer" size={20}/> : <BsBookmarkPlus class="hover:cursor-pointer" size={20}/>}
                                </p>
                            </div>

                            {/* release date */}
                            <div class="flex mt-1 md:mt-2 gap-[2rem] md:gap-[2rem] text-gray-400 md:font-semibold text-xs md:text-base">
                                <div class="flex items-center gap-2"><RiSystemStarFill />{movieDetails().vote_average.toFixed(2)}</div>
                                <p>{movieDetails().release_date}</p>
                            </div>

                            {/* Tagline */}
                            <h3 class="text-gray-400 mt-3 text-sm md:text-base">
                                {`"${movieDetails().tagline}"`}
                            </h3>

                            {/* Genres */}
                            <div class="flex flex-wrap gap-2 text-gray-800 font-bold text-sm mt-2">
                                {movieDetails().genres.map(genre => (
                                    <p class="px-1 bg-slate-500 rounded-lg">{genre.name}</p>
                                ))}
                            </div>

                            {/* Overview */}
                            <div class="absolute w-full left-0 top-[150%] md:static md:mt-[1.5rem] md:w-[90%] text-gray-400">
                                <div class="ml-[2rem] md:ml-0">
                                    <h3 class="font-bold">Overview:</h3>
                                    <p class="w-[95%] md:w-full">
                                        {truncateString(movieDetails().overview, 220)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    )
}



