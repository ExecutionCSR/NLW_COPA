import { createContext ,ReactNode ,useState ,useEffect} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSessesion from "expo-auth-session";
import * as WebBroser from "expo-web-browser";
import { api } from "../services/apis";

WebBroser.maybeCompleteAuthSession();

interface UserProps{
    name: string;
    avatarUrl:string
}

interface AuthProviderProps {
    children :ReactNode;
}

export interface AuthContextDataProps{
    user:UserProps;
    isUserLoading: boolean;
    signIn: ()=>Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children} : AuthProviderProps){
    const [isUserLoading,setIsUserLoading] = useState(false),
    [user,setUser]= useState<UserProps>({}as UserProps),
    [request,response,promptAsync]= Google.useAuthRequest({
        clientId: '652369226171-rmc2l86dr4787tm294eoudpd6qmsu5k8.apps.googleusercontent.com',
        redirectUri:AuthSessesion.makeRedirectUri({useProxy:true}),
        scopes:['profile','email']
    });

    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync();
        }catch (error) {
            console.error(error);
            throw error
        }finally{
            setIsUserLoading(false);
        }
    }

    async function signInWhithGoogle(access_token:string) {
        try {
            console.log(user)
            setIsUserLoading(true)
            const tokenResponse = await api.post('/users',{access_token});
            api.defaults.headers.common['Authorization']= `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('/me')
            setUser(userInfoResponse.data.user);

        } catch (error) {
            console.error(error);   
            throw error;
        }finally{
            setIsUserLoading(false)
        }
    }

    useEffect(()=>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWhithGoogle(response.authentication.accessToken)
        }
    },[response])
    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}