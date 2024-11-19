import { inject, Injectable, signal} from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { usuarioInt} from "../usuario.interface";
import { signOut } from "firebase/auth";

@Injectable({
    providedIn:'root'
})

export class AuthService{

    private firebaseAuth = inject(Auth);

    currentUser = authState(this.firebaseAuth);
    currentUserSig = signal<usuarioInt | null |undefined>(undefined)

    register(email:string,username:string,password:string):Observable<void>{
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password).then(Response=> updateProfile(Response.user,{displayName: username})) 
            
        return from(promise)
    }

    login(email:string,password:string):Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password).then(()=>{});
        return from(promise);
    }

    logout():Observable<void>{
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }

}

export { Auth };
