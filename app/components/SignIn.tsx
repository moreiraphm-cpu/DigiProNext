'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignInForm() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubimit(e: React.SubmitEvent) {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        
        if ( error ) {
            setError('Email ou senha inválidos')
            return
        }

        router.push('/dashboard')
    }


    return (
        <div className="min-h-dvh bg-gray-600 bg-center bg-cover flex justify-center items-center">
            <div className="flex">
                <form 
                onSubmit={handleSubimit}
                className="bg-white w-80 p-4 flex flex-col rounded-lg items-center justify-center">
                    <h2 className="text-3xl text-black mb-5">Entrar</h2>
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
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
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        type="submit" 
                        className="bg-grey-200 border text-black rounded-lg p-1 mt-2 hover:bg-gray-300/80">
                        Entrar
                    </button>
                    <div className="mt-4 text-sm text-gray-400 flex flex-row">
                        <p>Não tem uma conta?</p>
                            <Link 
                            href="/signUp"
                            className="text-blue-500 hover:underline ml-2"
                            >Cadastre-se</Link>
                    </div>
                </form>   
            </div>
        </div>
    );
}



    