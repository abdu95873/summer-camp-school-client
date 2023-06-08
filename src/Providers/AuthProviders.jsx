import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProviders = ({children}) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] =useState(true)

    const createUser= async (email, password, name, photo) =>{
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const res2 =await updateProfile( res.user, {displayName:name, photoURL:photo})
        console.log(res,res2);
        return res;
    }

    
    const userUpdate = (name, photo)=>{
        updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
        .then(()=>{
            alert('User Updated');
        }).catch(error=>{
            console.log(error);
        })
    }



    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider);  
    }

    const logOut = () =>{
        return signOut(auth);
    }




    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser);
            setLoading(false);
        });
        return() =>{
            return unsubscribe();
        }
    } ,[])

 

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        userUpdate,
        googleLogin,
        logOut

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;