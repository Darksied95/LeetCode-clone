import { atom } from "recoil";

type AuthModalState = {
    isOpen : Boolean
    type : 'login' | 'signup' | 'forgotPassword'
}

const initialValue :AuthModalState = {
    isOpen : false,
    type : 'login'
}


export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: initialValue
})