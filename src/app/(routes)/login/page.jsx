"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    })



    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth === "true") router.push("/dashboard");
    }, [router]);



    const onSubmit = async (data) => {
        setError("");
        try {
            const res = await axios.post("/api/login", data);
            if (res.data.success) {
                localStorage.setItem("auth", "true");
                router.push("/dashboard");
            }
        } catch {
            setError("Invalid username or password");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Dashboard Login</h2>
                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <input
                        {...register("username")}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter username"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login;