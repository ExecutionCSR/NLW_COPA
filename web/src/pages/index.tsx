import AppPreviewImg from "../assets/app-nlw-copa-preview.png";
import AppLogo from "../assets/logo.svg";
import userAvatarExample from "../assets/users-avatar-example.png";
import IconCheck from "../assets/icon-check.svg"
import Image from "next/image";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
interface HomeProps {
    countUsr: number,
    countBol: number,
    countPal: number,
};

export default function Home(props: HomeProps) {
    const [poolTitle,setPoolTitle] = useState('');

    async function createPool(event:FormEvent){
        event.preventDefault();
        if(poolTitle){
            try {
                await api.post('/pools',{
                    title:poolTitle
                }).then(async(result)=>{
                  var resultData= result.data
                    result.status == 201?(await navigator.clipboard.writeText(resultData.code),alert('Bolão criado com sucesso Código do Bolão foi copiado para a area de transferencia Código do Bolão:'+resultData.code),setPoolTitle('')):(alert('Erro ao criar bolão'),console.error(result.data))
                }).catch((error)=>{
                    console.error(error)
                })
            } catch (error) {
                console.error(error)
                alert('erro ao criar bolão')
            }

        }
    }

    return (
      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center text-white">

        <main>
          <Image src={AppLogo} quality={100} alt="NLW COPA LOGO" />
          <h1 className="mt-16 text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-100 flex items-center gap-2">
            <Image src={userAvatarExample} quality={100} alt='' />
            <strong className="text-gray-100 text-xl text-bold">
              <span className="text-ignite-500">+ {props.countUsr} </span>
              já estão utilizando
            </strong>
          </div>

          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input className="flex-1 px-6 py-4 rounded border bg-gray-800 border-gray-600 text-sm text-gray-100" type="text" required placeholder="Qual o Nome do seu bolão" onChange={event=>setPoolTitle(event.target.value)} value={poolTitle}/>
            <button className=" bg-yellow-500 px-6 py-4 rounded font-bold text-sm uppercase hover:bg-yellow-700" type="submit">Criar meu Bolão</button>
          </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={IconCheck} alt="check" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+ {props.countBol} </span>
                <span> Bolões criados</span>
              </div>
            </div>
            
            <div className="w-px h-14 bg-gray-600">
            </div>

            <div className="flex items-center gap-6">
              <Image src={IconCheck} alt="check" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl">+ {props.countPal}</span>
                <span> Palpites criados</span>
              </div>
            </div>
          </div>

        </main>
        <Image src={AppPreviewImg} alt='Dois Celulares exibindo uma previa do app no NLW Copa' quality={100} />

      </div>
    )
}
export const getStaticProps = async () => {
    const [usersReposnse,poolsResponse,guessesResponse] = await Promise.all([
        api.get('users/count'),
        api.get('pools/count'),
        api.get('guesses/count')
    ])

    return {
        props: {
            countUsr: usersReposnse.data.count,
            countBol: poolsResponse.data.count,
            countPal: guessesResponse.data.count
        },
        revalidate: 10 * 60 
    }
}