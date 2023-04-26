import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/styles/theme";
import { useFonts, ComicNeue_400Regular, ComicNeue_300Light, ComicNeue_700Bold } from "@expo-google-fonts/comic-neue";
import { Loading } from "./src/components/Loading";
import { AuthContextProvider } from "./src/context/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ ComicNeue_400Regular, ComicNeue_300Light, ComicNeue_700Bold });


  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
        {
          fontsLoaded ? <Routes/> : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}