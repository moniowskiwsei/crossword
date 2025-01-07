import { useEffect, useState } from "react";

const allWords = [
    'CAT', 'DOG', 'SUN', 'CAR', 'BOX', 'MAP', 'BAT', 'HAT', 'NET', 'PEN', 'FOX', 'KEY', 'RUG', 'BUG', 'BEE', 'ZIP', 'JAR', 'VAN', 'GEM', 'CAP',
    'TREE', 'FISH', 'BIRD', 'LAMP', 'STAR', 'ROSE', 'SNOW', 'BOOK', 'HAND', 'FOOT', 'DOOR', 'COAT', 'POND', 'WIND', 'ROAD', 'CAVE', 'CORN', 'SHIP', 'ROCK', 'HILL', 'MOON', 'KING', 'FORK', 'WOOD', 'RAIN', 'FIRE', 'TIME', 'HORN', 'FLAG', 'RING', 'SOIL', 'HEAD', 'TAIL', 'BONE', 'LION', 'PEAR', 'SEED', 'SAND', 'WAVE', 'GLUE',
    'APPLE', 'HOUSE', 'LIGHT', 'TABLE', 'WATER', 'CHAIR', 'PLANE', 'CANDY', 'MOUSE', 'PAPER', 'BREAD', 'STONE', 'CLOCK', 'BRICK', 'PLANT', 'HEART', 'CLOUD', 'TRAIN', 'STORM', 'BRUSH', 'PENCIL', 'DINNER', 'MARKER', 'BANNER', 'ROLLER', 'STREAM', 'VALLEY', 'TUNNEL', 'WINTER', 'BUTTON',
    'PLANET', 'PYTHON', 'EDITOR', 'DRAGON', 'PRINCE', 'CASTLE', 'RANGER', 'FARMER', 'GUITAR', 'OCEAN'
];
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const tryGenerateBoard = (n, k) => {
    let board = Array.from({ length: n }, () => Array.from({ length: n }, () => null));

    const tryPlaceWord = (word) => {
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        for (let attempt = 0; attempt < 1000; attempt++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * n);
            const startCol = Math.floor(Math.random() * n);
            let canPlace = true;

            for (let i = 0; i < word.length; i++) {
                const newRow = startRow + direction[0] * i;
                const newCol = startCol + direction[1] * i;

                if (
                    newRow < 0 ||
                    newRow >= n ||
                    newCol < 0 ||
                    newCol >= n ||
                    (board[newRow][newCol] !== null && board[newRow][newCol] !== word[i])

                ) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    const newRow = startRow + direction[0] * i;
                    const newCol = startCol + direction[1] * i;
                    board[newRow][newCol] = word[i];
                }
                return true;
            }

            return false
        }
    };

    let availableWords = [...allWords]
    const words = []
    while (words.length < k && availableWords.length > 0) {
        const word = availableWords[Math.floor(Math.random() * availableWords.length)];

        const placed = tryPlaceWord(word)

        if (placed)
            words.push(word)

        availableWords = availableWords.filter(w => w != word)
    }

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (board[row][col] === null) {
                board[row][col] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    return [board, words];
};

const generateBoard = (n, k) => {
    let i = 0
    let board = null
    let bestBoard = null
    
    while(i < 100 && (board == null || board[1].length < k)) {
        board = tryGenerateBoard(n, k)

        if(!bestBoard || bestBoard[1].length < board[1].length)
            bestBoard = board

        i++
    }
    
    return bestBoard
}

export default function Crossword({boardSize = 8, wordCount = 6}){
    const [board, setBoard] = useState([]);
    const [wordsToFind, setWordsToFind] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [message, setMessage] = useState('');
    const [animatingCells, setAnimatingCells] = useState([]);

    const restartGame = () => {
        const boardData = generateBoard(boardSize, wordCount)
        setBoard(boardData[0])
        setWordsToFind(boardData[1])
        setFoundWords([])
        setSelectedCells([])
        setMessage('')
        setAnimatingCells([])
    }

    useEffect(() => {
        restartGame()
    }, [])


    const checkWord = (selectedCells) => {
        const word = selectedCells.map(([row, col]) => board[row][col]).join('');
        if (wordsToFind.includes(word) && !foundWords.includes(word)) {
            setFoundWords([...foundWords, word]);
            setAnimatingCells(selectedCells);

            setTimeout(() => {
                setAnimatingCells([]);
                setSelectedCells([]);
                if (foundWords.length + 1 === wordsToFind.length) {
                    setMessage('Congratulations! You found all the words!');
                }
            }, 1000);
        }
    };

    const handleCellClick = (row, col) => {
        if (animatingCells.length > 0) return
        if (wordsToFind.length == foundWords.length) return

        const alreadySelected = selectedCells.some(
            ([selectedRow, selectedCol]) => selectedRow === row && selectedCol === col
        );

        if (alreadySelected) {
            setSelectedCells(selectedCells.filter(([r, c]) => !(r === row && c === col)));
            return;
        }

        if (selectedCells.length > 0) {
            const [lastRow, lastCol] = selectedCells[selectedCells.length - 1];
            const direction = selectedCells.length > 1
                ? [
                    selectedCells[1][0] - selectedCells[0][0],
                    selectedCells[1][1] - selectedCells[0][1]
                ]
                : [row - lastRow, col - lastCol];

            if (
                (Math.abs(row - lastRow) > 1 || Math.abs(col - lastCol) > 1) ||
                (selectedCells.length > 1 &&
                    (row - lastRow !== direction[0] || col - lastCol !== direction[1]))
            ) {
                return;
            }
        }

        setSelectedCells([...selectedCells, [row, col]]);
        checkWord([...selectedCells, [row, col]]);
    };

    const handleClearSeledted = (e) => {
        e.preventDefault()
        if (animatingCells.length > 0) return;
        setSelectedCells([])
    }

    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
                {row.map((letter, colIndex) => {
                    const isSelected = selectedCells.some(
                        ([selectedRow, selectedCol]) => selectedRow === rowIndex && selectedCol === colIndex
                    );
                    const isAnimating = animatingCells.some(
                        ([animRow, animCol]) => animRow === rowIndex && animCol === colIndex
                    );
                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`cell p-2  flex justify-center items-center aspect-square font-bold ${animatingCells.length == 0 && wordsToFind.length != foundWords.length ? 'hover:bg-gray-700' : ''} ${isSelected ? 'bg-gray-600' : ''} ${isAnimating ? 'animating bg-green-600' : 'bg-base-200'}`}
                            style={{ width: `${100 / boardSize}%` }}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {letter}
                        </div>
                    );
                })}
            </div>
        ));
    };

    return (
        <div className="flex w-[50rem] max-w-full flex-col-reverse md:flex-row gap-4 px-4">
            <div className="bg-base-300 flex-grow flex flex-col gap-2 p-2"
                onContextMenu={(e) => handleClearSeledted(e)}
            >
                {renderBoard()}
            </div>
            <div className="bg-base-300 w-full md:w-[18rem] p-4 md:text-center">
                <h3 className='font-bold text-xl mb-3'>Found Words</h3>
                <ul>
                    {wordsToFind.map((word, index) => {
                        const found = foundWords.includes(word);
                        return (
                            <li key={index} className={`mb-1 ${found ? 'font-bold text-green-500' : ''}`}>{word}</li>
                        )
                    })}
                </ul>
                {message && <div className="flex flex-row md:flex-col mt-3 gap-2 items-center flex-wrap">
                    <div className=''>{message}</div>
                    <button className='btn' onClick={() => restartGame()}>Play again</button>
                </div>}
            </div>
        </div>
    );
}