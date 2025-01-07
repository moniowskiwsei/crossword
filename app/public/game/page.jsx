'use client'

import Crossword from '@/app/_components/Crossword';

export default function Game() {
    return (
        <div className="flex justify-center mb-4">
            <Crossword boardSize={8} wordCount={6}></Crossword>
        </div>
    )
}