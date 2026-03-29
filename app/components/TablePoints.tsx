'use client';

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";   
import Link from "next/link";

interface Profile {
    username: string;
    best_time: number;
}

export default function RankingTable() {
    const [ranking, setRanking] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getRanking() {
            const { data } = await supabase
                .from('profiles')
                .select('username, best_time, number_matches')
                .not('best_time','is', null)
                .order('best_time', {ascending: true})
                .limit(10);
            setRanking(data || []);
            setLoading(false);
        }
        getRanking();
    }, []);
    
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
        <div className=" min-h-dvh bg-gray-600 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg overflow-hidden border shadow-xl">
                <table className="border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-center">
                            <th className="w-10 py-1 px-2 ml-1">#</th>
                            <th className="w-10 py-1 px-2 ml-1">Jogador</th>
                            <th className="w-40 py-1 px-2 ml-1">Melhor tempo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((Profile, index) => (
                            <tr className="text-center" key={index}>
                                <td className="w-10 py-1 px-2 ml-1">{index + 1}</td>
                                <td className="w-10 py-1 px-2 ml-1">{Profile.username}</td>
                                <td className="w-40 py-1 px-2 ml-1">{Profile.best_time}s</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}