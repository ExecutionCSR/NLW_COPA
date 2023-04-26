import { Center, Spinner ,Text} from "native-base";

interface PropsLoading {
    text? : String;
}

export function Loading(props : PropsLoading){
    return(
        <Center flex={1} bg='gray.900'>
            <Text color='white'>{props.text}</Text>
            <Spinner color='yellow.500'/>
        </Center>
    )
}