import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'solid-icons/bs';
import { createSignal, createEffect } from 'solid-js';
import { UserAuth } from '../../Context/AuthContext';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { AiFillDelete } from 'solid-icons/ai';
import { useNavigate } from '@solidjs/router';


export const SavedMovies = (props)=>{
    const [movies, setMovies] = createSignal([]);
    const {user} = UserAuth();
    const navigate = useNavigate();

    const handleTitleClick = (id)=>{
        navigate(`/movie/${id}`);
    }

    const slideLeft = ()=>{
        let slider = document.getElementById('slider');
        slider.scrollLeft -= 500;
    }
    const slideRight = ()=>{
        let slider = document.getElementById('slider');
        slider.scrollLeft += 500;
    }

    createEffect(() => {
        if (user() && user().email) {  // Periksa apakah user dan user().email terdefinisi
            const unsubscribe = onSnapshot(doc(db, 'users', `${user().email}`), (doc) => {
                setMovies(doc.data()?.savedMovies || []);
            });
            return () => unsubscribe();  // Hapus listener onSnapshot saat komponen di-unmount atau saat dependensi berubah
        }
    }, [user]);


    
    const deleteShow = async (passedID) => {
        try {
            const movieRef = doc(db, 'users', `${user().email}`)
          const result = movies().filter((item) => item.id !== passedID)
          await updateDoc(movieRef, {
              savedMovies: result
          })
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
            <h2 class="text-white font-bold md:text-xl p-4">My Movies</h2>
            <div class="relative flex items-center group">
                <BsArrowLeftCircleFill onClick={slideLeft} size={40} color="#FFFFFF" class="left-0 md:hidden absolute cursor-pointer z-10 opacity-50 hover:opacity-100 group-hover:block"/>
                <div id={'slider'} class="w-full h-full overflow-x-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    <For each={movies()}>
                        {(movie) => (
                            <div class="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative"
                            >
                                <img class='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie.img}`} alt={movie.title} />
                    
                                <div class="select-none absolute inset-0 w-full h-full bg-black/50 hover:bg-black/80 hover:opacity-100 opacity-100 xl:opacity-0 flex items-center justify-center">
                                    <p class=
                                    "text-white font-bold hover:text-red-600 text-center text-xs md:text-sm text-pretty"
                                    onClick={()=> handleTitleClick(movie.id)}>{movie.title}</p>
                                    <p onClick={()=> deleteShow(movie.id)} className=
                                    'absolute text-gray-300 top-4 right-4 hover:text-red-600 z-50'>
                                        <AiFillDelete /></p>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
                <BsArrowRightCircleFill onClick={slideRight} size={40} color="#FFFFFF" class="right-0 md:hidden absolute cursor-pointer z-10 opacity-50 hover:opacity-100 group-hover:block" />
            </div>
        </>
    )
}