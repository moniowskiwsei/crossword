//DaisyUi loader
export default function Loader() {
    return (<div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
            <span className="loading loading-bars loading-md"></span>
            <p className="mt-4 text-white/50">Loading...</p>
        </div>
    </div>);
}
