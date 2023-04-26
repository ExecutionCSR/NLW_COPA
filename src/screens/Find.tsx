import { Heading, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find(){
    return(
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Busca por Código" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontre um Bolão através de{'\n'}seu código único
                </Heading>
                <Input mt={2} placeholder="Qual o código do bolão" />
                <Button title="Buscar bolão"/>
            </VStack>
        </VStack>
    )
}