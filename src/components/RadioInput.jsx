"use client";

import { useFormContext } from "react-hook-form";

export default function RadioInput({ name, label, value }) {
    const { register } = useFormContext();

    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="radio"
                value={value}
                {...register(name)}
                className="accent-blue-600 cursor-pointer"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
}
