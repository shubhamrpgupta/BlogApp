import React from 'react'
import { useId } from "react"

const CustomSelectBtn = ({
    options,
    label,
    className = "",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {
                label && <label htmlFor={id} ></label>
            }
            <select
                ref={ref}
                {...props}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((singleOption) => (
                    <option
                        key={singleOption}
                        value={singleOption}
                    >
                        {singleOption}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default React.forwardRef(CustomSelectBtn);