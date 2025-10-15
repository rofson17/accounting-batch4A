"use client";

import { useFormContext } from "react-hook-form";

export default function InputField({
    name,
    id,
    label,
    placeholder = "",
    grid = 1,
    type = "text",
}) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={`w-full md:col-span-${grid} flex flex-col`}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-1 text-sm md:text-base font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="w-full border px-3 py-2 text-base md:text-lg border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}
