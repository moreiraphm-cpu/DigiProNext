'use client';

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";   
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Profile {
    id: string;
    username: string;
    best_time: number;
    number_matches: number;
}

export default function PerfilTable() {
    const [perfil, setPerfil] = useState<Profile | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function handleGetPerfil() {
            const { data: { user } } = await supabase.auth.getUser();

            const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();
            setPerfil(data);
        }
        handleGetPerfil();
    }, []);

     async function Logout() {
         await supabase.auth.signOut();
         router.push('/login');
     }

    if (!perfil) return(
        <div className=" min-h-dvh bg-gray-600 flex items-center justify-center">
            <div className=" bg-white w-80 p-4">
                <p className="flex"><svg 
                className="mr-4 animate-spin w-4 h-4 border-4 border-gray-300 border-t-black rounded-full" 
                viewBox="0 0 24 24">
                        </svg>Carregando...
                </p>
            </div>
        </div>
    )

    return (
        <div className=" min-h-dvh bg-gray-600 flex flex-col items-center justify-center">
            <div className="rounded-lg overflow-hidden border shadow-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="border border-gray-300 w-60 p-2"> {perfil.username}</th>
                            <th className="border border-gray-300 w-50 p-2 text-center"> Experiente</th>
                        </tr>
                        <tr className="text-left bg-gray-200">
                            <th className="border border-gray-300 w-50 p-2">
                                Partidas Jogadas: {perfil.number_matches}
                            </th>
                            <th className="border border-gray-300 w-50 p-2 text-center">
                                Melhor tempo: {perfil.best_time} s
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="flex justify-end w-110">
                <button className="border-2 border-black bg-white rounded-lg px-2 py-1 mt-1 hover:bg-white/80"
                ><Link href='/game'>Jogar</Link></button>
                <button className="border-2 border-black bg-white rounded-lg px-2 py-1 mt-1 ml-2 hover:bg-white/80"
                ><Link href='/ranking'>Ranking</Link></button>
                <button onClick={Logout}
                className="border-2 border-black bg-white rounded-lg px-2 py-1 mt-1 ml-2 hover:bg-white/80"
                >Sair</button>
            </div>    
        </div>
    );
}