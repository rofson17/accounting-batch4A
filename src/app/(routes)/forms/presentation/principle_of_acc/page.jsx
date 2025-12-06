"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    studentId: yup
        .string()
        .matches(/^\d{3}-\d{2}-\d{3}$/, "Enter valid Student ID (e.g. 253-58-000)")
        .required("Student ID is required"),
    presentationFile: yup.string().required("Presentation file is required"),
});

const Presentation_ACC = () => {
    const [fileUrl, setFileUrl] = useState(null);

    const methods = useForm({ resolver: yupResolver(schema) });
    const { handleSubmit, setValue, formState } = methods;

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/api/forms/presentation/principle_of_acc", data);

            if (res.status === 201) {
                toast.success("Uploaded successfully");
                setFileUrl(null);
                methods.reset();
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Upload Your Presentation
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            {...methods.register("name")}
                            placeholder="Enter your name"
                            className="w-full border px-3 py-2 rounded outline-blue-400"
                        />
                        {formState.errors.name && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Student ID</label>
                        <input
                            type="text"
                            {...methods.register("studentId")}
                            placeholder="253-58-000"
                            className="w-full border px-3 py-2 rounded"
                        />
                        {formState.errors.studentId && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.studentId.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Upload PPT / PPTX
                        </label>

                        <CldUploadWidget
                            signatureEndpoint="/api/cloudinary/signature"
                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                            options={{
                                resourceType: "raw",
                                sources: ["local", "google_drive"],
                                allowedFormats: ["ppt", "pptx", "pdf"],
                            }}
                            onSuccess={(result) => {
                                if (result?.info?.secure_url) {
                                    setFileUrl(result.info.secure_url);
                                    setValue("presentationFile", result.info.secure_url);
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="bg-blue-400 text-white px-4 py-2 rounded flex justify-center items-center cursor-pointer"
                                >
                                    <PiMicrosoftPowerpointLogoFill className="mr-2 text-2xl" />
                                    Upload File
                                </button>
                            )}
                        </CldUploadWidget>

                        {fileUrl && (
                            <p className="text-sm mt-2 text-green-700">
                                Uploaded: {fileUrl.split("/").pop()}
                            </p>
                        )}

                        {formState.errors.presentationFile && (
                            <p className="text-red-500 text-sm mt-1">
                                {formState.errors.presentationFile.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="bg-blue-700 text-white py-3 px-6 rounded w-full"
                    >
                        {formState.isSubmitting ? "Uploading..." : "Submit"}
                    </button>

                </form>
            </div>
        </FormProvider>
    )
}

export default Presentation_ACC;
