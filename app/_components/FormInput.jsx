import { useState } from "react"

export default function FormInput({ type, name, label, defaultValue = '', className = '', required = false, readonly = false}) {
    const [value, setValue] = useState(defaultValue)
    return <div className={`${className ? className : 'mb-6'}`}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type={type} className={`border border-base-300 text-gray-100 text-sm rounded-sm focus:outline-none ${!readonly ? 'bg-base-300 focus:border-green-500' : 'bg-base-200'} block w-full p-2.5`} name={name} required={required} value={value} readOnly={readonly} onChange={(e) => setValue(e.target.value)}/>
    </div>
}