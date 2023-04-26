import { Heading, VStack ,Text } from "native-base";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg"
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/UseAuth";

export function New(){
    return(
        
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Criar novo Botão"/>
            <VStack mt={8} mx={5} alignItems="center">
                <Logo height={60} width={200}/>
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center" >
                    Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
                </Heading>
                <Input mt={2} placeholder="Qual o nome  so seu bolão" />
                <Button title="criar seu bolão"/>
                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}