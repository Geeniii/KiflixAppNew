import { BsHeart, BsHeartFill } from 'solid-icons/bs';
import { createSignal } from 'solid-js';
import { UserAuth } from '../../Context/AuthContext';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from '@solidjs/router';

export const MovieComponent = (props) => {
    const [like, setLike] = createSignal(false);
    const [saved, setSaved] = createSignal(false);
    const { user } = UserAuth();
    const navigate = useNavigate();

    const handleTitleClick = (id)=>{
        navigate(`/movie/${id}`);
    }

    const saveMovie = async () => {
        if (user() && user().email) {
            const movieID = doc(db, 'users', `${user().email}`);
            setLike(!like());
            setSaved(true);
            try {
                await updateDoc(movieID, {
                    savedMovies: arrayUnion({
                        id: props.item.id,
                        title: props.item.title,
                        img: props.item.backdrop_path
                    })
                });
            } catch (error) {
                console.error("Error saving movie:", error);
            }
        } else {
            alert('Need to log in to save the movie.');
        }
    };

    return (
        <div class="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative">
            <img class='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${props.item.backdrop_path}`} alt={props.item.title} />

            <div class="select-none absolute inset-0 w-full h-full hover:bg-black/80 hover:opacity-100 opacity-0 flex items-center justify-center">
                <p class="text-white font-bold hover:text-red-600 text-center text-xs md:text-sm"
                onClick={()=>handleTitleClick(props.item.id)}>{props.item.title}</p>
                <p onClick={saveMovie}>
                    {like() ? <BsHeartFill class="absolute top-4 left-4 text-red-600 font-bold" /> : <BsHeart class="absolute top-4 left-4 text-red-600 font-bold" />}
                </p>
            </div>
        </div>
    );
};