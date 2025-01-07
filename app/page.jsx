'user client';

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[40rem] max-w-full bg-base-200 p-8 flex flex-col gap-4">
        <h1 className="text-3xl mb-4">Welcome</h1>
        <p>My name is Mateusz Moniowski</p>
        <p>This is an application in which you can play a crossword game</p>
        <p>Registration and login implemented with Firebase</p>
        <p>Using Playwright you can execute end-to-end tests</p>
      </div>
    </div>
  );
}
