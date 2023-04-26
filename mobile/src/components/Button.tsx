import { Button as ButtonNativeBase, Text ,IButtonProps } from "native-base";

interface ButtonsProps  extends IButtonProps{
    title:string;
    type?:"PRIMARY"|"SECONDARY";
}

export function Button({title , type="PRIMARY", ...rest}:ButtonsProps) {
    return (
        <ButtonNativeBase 
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === 'SECONDARY'?'red.500':'yellow.500'}
            _pressed={{
                bg:type === 'SECONDARY'?'red.400':'yellow.400'
            }}
            _loading={{
                _spinner:{color:"black"}
            }}

            {...rest}
        >
            <Text textTransform="uppercase" fontFamily="heading" fontSize="sm"  color={type=="SECONDARY"?'white':'black'}>
               {title}
            </Text>
        </ButtonNativeBase>
    )
}