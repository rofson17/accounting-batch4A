"use client";

import { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import axios from "axios"
import toast from "react-hot-toast"
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import { CldUploadWidget } from "next-cloudinary"
import {
    FiUsers,
    FiPlus,
    FiTrash2,
    FiUpload
} from "react-icons/fi"
import Swal from "sweetalert2";


const schema = yup.object().shape({
    groupName: yup.string().required("Group name is required"),
    topic: yup.string().required("Topic is required"),
    members: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string().required("Name required"),
                studentId: yup
                    .string()
                    .matches(/^\d{3}-\d{2}-\d{3}$/, "Use format 253-58-000")
                    .required("ID required"),
            })
        )
        .min(3, "At least 3 members needed")
        .max(7, "Maximum 7 members allowed"),
    fileUrl: yup.string().required("Presentation file is required"),
})

const PresentationIct = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            members: [{ name: "", studentId: "" }],
        },
    })

    const { control, handleSubmit, register, formState, setValue } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "members",
    })

    Swal.fire({
        title: "Presentation Submited!",
        text: "দুশ্চিন্তা করে কারো কাছে যাওয়ার দরকার নেই, সাবমিট হয়ে গিয়েছে 🥴",
        icon: "success"
    })
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/api/forms/presentation/ict_in_business_app", data);

            if (res.status === 201) {

                Swal.fire({
                    title: "Presentation Submited!",
                    text: "দুশ্চিন্তা করে কারো কাছে যাওয়ার দরকার নেই, সাবমিট হয়ে গিয়েছে 🥴",
                    icon: "success"
                })
                methods.reset();
                setUploadedFile(null);
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    }

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto max-w-2xl px-4 py-6">

                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FiUsers className="text-blue-600" />
                    ICT Group Presentation Upload
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="font-medium block mb-1">Group Name</label>
                        <input
                            type="text"
                            {...register("groupName")}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Enter group name"
                        />
                        {formState.errors.groupName && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.groupName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Topic</label>
                        <input
                            type="text"
                            {...register("topic")}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="e.g. E-Learning, AI, ICT"
                        />
                        {formState.errors.topic && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.topic.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium block mb-2">Group Members</label>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 rounded p-2 md:p-0 border md:border-0"
                                >
                                    <input
                                        placeholder="Name"
                                        {...register(`members.${index}.name`)}
                                        className="border px-2 py-2 rounded col-span-1 sm:col-span-5"
                                    />

                                    <input
                                        placeholder="253-58-000"
                                        {...register(`members.${index}.studentId`)}
                                        className="border px-2 py-2 rounded col-span-1 sm:col-span-5"
                                    />

                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="col-span-1 sm:col-span-2 text-red-500 flex justify-center md:justify-start items-center"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => append({ name: "", studentId: "" })}
                            className="bg-gray-800 text-white px-3 py-2 rounded flex items-center gap-2 mt-2"
                        >
                            <FiPlus />
                            Add Member
                        </button>

                        {formState.errors.members && (
                            <p className="text-red-500 text-sm mt-1">
                                {formState.errors.members.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium block mb-1">
                            Upload PPT / PDF
                        </label>

                        <CldUploadWidget
                            signatureEndpoint="/api/cloudinary/signature"
                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                            options={{
                                resourceType: "raw",
                                allowedFormats: ["ppt", "pptx", "pdf"],
                                maxFileSize: 20_000_000,
                            }}
                            onSuccess={(result) => {
                                if (result?.info?.secure_url) {
                                    setUploadedFile(result.info.secure_url);
                                    setValue("fileUrl", result.info.secure_url);
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <FiUpload className="text-lg" />
                                    Upload File
                                </button>
                            )}
                        </CldUploadWidget>

                        {uploadedFile && (
                            <p className="text-green-700 text-sm mt-2 truncate">
                                Uploaded: {uploadedFile.split("/").pop()}
                            </p>
                        )}

                        {formState.errors.fileUrl && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.fileUrl.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded flex items-center justify-center gap-2 cursor-pointer"
                        disabled={formState.isSubmitting}
                    >
                        <PiMicrosoftPowerpointLogoFill className="text-xl" />
                        {formState.isSubmitting ? "Uploading..." : "Submit Presentation"}
                    </button>
                </form>
            </div>
        </FormProvider>
    )
}

export default PresentationIct;
