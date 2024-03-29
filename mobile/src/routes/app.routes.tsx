import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle ,SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Find } from "../screens/Find";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { Signin } from "../screens/Signin";
import { Platform } from "react-native";


const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    const {colors,sizes} = useTheme();
    const size6 = sizes[6]
    return(
        <Navigator screenOptions={{
            headerShown:false,
            tabBarLabelPosition:"beside-icon",
            tabBarActiveTintColor:colors.yellow[500],
            tabBarInactiveTintColor:colors.gray[300],
            tabBarStyle :{
                position: "absolute",
                height: sizes[20],
                borderTopWidth:0,
                backgroundColor:colors.gray[800]
            },
            tabBarItemStyle:{
                position: 'relative',
                top: Platform.OS === 'android'?-5:0,
            }
        }}>
            <Screen 
                name="new"
                component={New}
                options={{
                    tabBarIcon:({color})=><PlusCircle color={color} size={size6}/>,
                    tabBarLabel:"Novo Bolão"
                }}
            />
            <Screen 
                name="find"
                component={Find}
                options={{
                    tabBarButton:()=> null
                }}
            />
            <Screen 
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon:({color})=><SoccerBall color={color} size={size6}/>,
                    tabBarLabel:"Meus Bolões"
                }}
            />
        </Navigator>
    )
}