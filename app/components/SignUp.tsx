'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        
        const { data, error } =await supabase.auth.signUp({ email, password});

        if (error) {
            setError(error.message)
            return
        }

        await supabase.from('profiles').insert({
            id: data.user?.id,
            username,
        })

        router.push('/login')
    }

    return (
        <div className="min-h-dvh bg-gray-600 bg-center bg-cover flex justify-center items-center">
        <div className="flex">
            <form
                onSubmit={handleSubmit} 
                className="bg-white w-80 p-4 flex flex-col rounded-lg items-center justify-center">
                    <h2 className="text-3xl text-black mb-5">Cadastre-se</h2>
                    <input 
                        type="username"
                        value={username}
                        placeholder="Nome"
                        onChange={(e) => setUsername(e.target.value)}
                        className=" border border-black w-[80%] rounded-lg p-1 focus:outline-none mb-2"
                    />
                    <input 
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className=" border border-black w-[80%] rounded-lg p-1 focus:outline-none mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-black w-[80%] rounded-lg p-1 focus:outline-none"
                    />
                    {error && <p className="text-red-500 text-sm"> {error}</p>}
                    <button 
                        type="submit" 
                        className="bg-grey-200 border text-black rounded-lg p-1 mt-2 hover:bg-gray-300/80">
                        Cadastrar
                    </button>
                    <div className="mt-4 text-sm text-gray-400 flex flex-row">
                        <p>Já tem uma conta?</p>
                            <Link 
                            href="/login"
                            className="text-blue-500 hover:underline ml-2"
                            >Clique aqui</Link>
                    </div>
            </form>   
        </div>
        </div>
    )

}
