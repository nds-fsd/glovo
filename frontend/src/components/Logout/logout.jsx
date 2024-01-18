import { getUserToken, removeSession, setUserSession } from '../../utils/localStorage.utils';

const Logout = ({forceUpdate}) => {

    const isLogged = !!getUserToken();

    if (!isLogged) {
        return undefined;
    }

    const doLogout = () => {
        removeSession();
        forceUpdate();
    }
    

    return (
        <button onClick={doLogout}>Logout</button>
    );

};

export default Logout;