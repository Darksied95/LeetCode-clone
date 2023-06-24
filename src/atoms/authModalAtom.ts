import { atom } from "recoil";

type AuthModalState = {
    isOpen : Boolean
    type : 'login' | 'signup' | 'forgotPassword'
}

const initialValue :AuthModalState = {
    isOpen : true,
    type : 'login'
}


export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: initialValue
})