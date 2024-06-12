import { 
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut 
} from "firebase/auth";
import { createContext, createSignal, createEffect, useContext } from "solid-js";
import { auth, db } from "../firebase";
import {setDoc, doc} from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [user, setUser] = createSignal(null)

    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            savedMovies: []
        })
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth).then(() => {
            setUser(null); // Set user menjadi null setelah logout berhasil
        }).catch((error) => {
            console.log("Error logging out:", error);
        });
    }

    createEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe();
        }
    }, []);

    

    return(
        <AuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export function UserAuth(){
    return useContext(AuthContext);
};