import { Center, Text ,Icon } from "native-base";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/UseAuth";

export function Signin() {
    const {signIn ,isUserLoading} = useAuth();

    return (
        <Center flex={1} bgColor='gray.900' p={7}>
            <Logo  width={200} height={60}/>
            <Button mt={12} leftIcon={<Icon as={Fontisto} name="google" color="white" size="md"/>} title="ENTRAR COM O GOOGLE" type="SECONDARY" onPress={signIn} isLoading={isUserLoading} _loading={{_spinner:{color:'white'}}}/>
            <Text color="white" textAlign="center" mt="4">
                Não utilizamos nenhuma informação além{"\n"}
                do seu e-mail para criação de sua conta.
            </Text>

        </Center>
    )
}