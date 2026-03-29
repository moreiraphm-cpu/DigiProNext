'use client';

import { useState, useEffect, useRef } from "react";    
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function GameRun() {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [indice, setIndice] = useState(0);
    const [input, setInput] = useState('');
    const [time, setTime] = useState(0);
    const [rodando, setRodando] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function getWords() {
            const promises = Array.from({ length: 10 }).map(() =>
                fetch('/api/randomWords').then(r  => r.json())
            );

            const results = await Promise.all(promises);
            setWords(results.map((r: { palavra: string }) => r.palavra));
            setLoading(false);
        }
        getWords();
    }, []);

    useEffect(() =>  {
        if (rodando) {
            intervalRef.current = setInterval(() =>  {
                setTime(t => t + 1);
            }, 1000);
        }
        return() => clearInterval(intervalRef.current ?? undefined);
    }, [rodando]);

    async function saveResults(finalTime: number) {
        const {data: {user} } = await supabase.auth.getUser();
        
        if (!user) return;
        
        const { data:profile} = await supabase
            .from('profiles')
            .select('best_time, number_matches')
            .eq('id', user.id)
            .single();
        
        await supabase
        .from('profiles')
        .update({number_matches: (profile?.number_matches ?? 0) + 1})
        .eq('id', user.id)

        if (!profile?.best_time || finalTime < profile.best_time) {
            await supabase.from('profiles').update({ best_time: finalTime}).eq('id', user.id);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const valor = e.target.value;

        if (!rodando) setRodando(true);

        if (valor == words[indice]) {
            const nextIndice = indice + 1;
            if (nextIndice === words.length) {
                clearInterval(intervalRef.current ?? undefined);
                setRodando(false);
                saveResults(time + 1).then(() => router.push('/dashboard'));
                return(
                    <div className=" min-h-dvh bg-gray-600 flex items-center justify-center">
                        <div className=" bg-white w-80 p-4">
                            <p className="flex"><svg 
                                className="mr-4 animate-spin w-4 h-4 border-4 border-gray-300 border-t-black rounded-full" 
                                viewBox="0 0 24 24">
                                </svg>Carregando...
                            </p>
                        </div>
                    </div>
                );
            } else {
                setIndice(nextIndice);
                setInput('');
            }
        } else {
            setInput(valor);
        }
    }

    if (loading) return (
        <div className=" min-h-dvh bg-gray-600 flex items-center justify-center">
            <div className=" bg-white w-80 p-4">
                <p className="flex"><svg 
                className="mr-4 animate-spin w-4 h-4 border-4 border-gray-300 border-t-black rounded-full" 
                viewBox="0 0 24 24">
                        </svg>Carregando...
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-dvh bg-gray-600 flex items-center justify-center">
            <div  className="bg-white flex flex-col w-90 p-2 rounded shadow-lg shadow-black">
                <div className="flex justify-between">
                    <p className="">Tempo: {time}s</p>
                    <p>Palavra {indice + 1} de {words.length}</p>
                </div>
                <h2 className=
                "text-center mt-3 text-4xl font-bold tracking-wide text-shadow-lg text-shadow-gray-400"
                >{words[indice]}</h2>
                <input
                    className="mt-8 h-20 text-4xl text-center focus:outline-none shadow-sm shadow-black/50"
                    value={input}
                    onChange={handleChange}
                    autoFocus
                    />
            </div>
        </div>
    );
}
