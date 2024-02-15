import {useSelector} from "react-redux";

function useAuth() {
    const {email, userId, token} = useSelector(state => state.user);

    return {
        isAuth: !!email,
        email,
        userId,
        token
    }
}

export {useAuth};