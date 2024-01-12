import React from 'react'
import { useId } from "react"

const CustomInput = React.forwardRef(function CustomInput({
    type = "text",
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label && <label
                    htmlFor={id}
                    className='inline-block mb-1 pl-1'
                >
                    {label}
                </label>
            }
            <input
                type={type}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                ref={ref}
            />
        </div>
    )
})

export default CustomInput;