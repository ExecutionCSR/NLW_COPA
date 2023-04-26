import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { SignIn } from "phosphor-react-native";
import { useAuth } from "../hooks/UseAuth";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { user } = useAuth()
    return (
        <Box flex={1} bg="gray.900">
            <NavigationContainer>
                {
                    user.name ? <AppRoutes /> : <SignIn />
                }
                <AppRoutes />
            </NavigationContainer>
        </Box>
    )
}