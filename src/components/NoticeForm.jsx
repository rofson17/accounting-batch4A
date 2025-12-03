"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    notice: yup.string().required("Notice is required"),
    linkText: yup.string().optional(),
    link: yup.string()
        .matches(/^(https?:\/\/[^\s]+|\/[^\s]*)$/,
            "Enter a valid URL (http://, https://, or /path)").
        optional(),
    deadline: yup.date().optional(),
})

const NoticeForm = ({ onSuccess }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const submitHandler = async (data) => {
        try {
            await axios.post("/api/notice", data);
            reset();
            onSuccess && onSuccess();
        } catch (err) {
            toast.error("Server Error");
            // console.error("Error creating notice:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white p-5 rounded-xl shadow-md mb-8 mx-auto w-full max-w-xl grid gap-4"
        >
            <h2 className="text-xl font-semibold mb-2">Create Notice</h2>

            <div className="grid gap-1">
                <label className="font-medium">Title *</label>
                <input
                    type="text"
                    {...register("title")}
                    className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            <div className="grid gap-1">
                <label className="font-medium">Notice *</label>
                <textarea
                    {...register("notice")}
                    className="w-full border p-2 rounded"
                    rows={3}
                ></textarea>
                <p className="text-red-500 text-sm">{errors.notice?.message}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="grid gap-1">
                    <label className="font-medium">Link Text</label>
                    <input
                        type="text"
                        {...register("linkText")}
                        className="w-full  border p-2 rounded"
                    />
                </div>

                <div className="grid  md:col-span-3 gap-1">
                    <label className="font-medium">Link (URL)</label>
                    <input
                        type="text"
                        {...register("link")}
                        className="w-full border p-2 rounded"
                    />
                </div>

            </div>

            <div className="grid gap-1">
                <label className="font-medium">Deadline</label>
                <input
                    type="datetime-local"
                    {...register("deadline")}
                    className="w-full border p-2 rounded"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 px-4 rounded flex gap-2 items-center hover:bg-blue-700 justify-center"
            >
                {isSubmitting ? "Saving..." : <><FiPlus /> Add Notice</>}
            </button>
        </form>
    )
}

export default NoticeForm
