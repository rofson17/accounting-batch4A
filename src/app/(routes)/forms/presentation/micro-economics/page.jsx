"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { PiMicrosoftPowerpointLogoFill } from "react-icons/pi";
import Swal from "sweetalert2";

const schema = yup.object().shape({
    groupName: yup.string().required("Group name is required"),
    file: yup.string().required("File upload is required"),
});

const PrincipleOfManagement = () => {

    const [fileUrl, setFileUrl] = useState(null);

    const methods = useForm({
        resolver: yupResolver(schema)
    });

    const { handleSubmit, setValue, formState } = methods;

    const onSubmit = async (data) => {
        try {

            const res = await axios.post(
                "/api/forms/presentation/micro-economics",
                { ...data, fileUrl: data.file }
            );
            // console.log(res);

            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "সফলভাবে জমা হয়েছে!",
                    text: "এখন আসল microeconomics শুরু—মার্কসের demand বাড়ানো আর risk minimize করা! 😄📊"
                })

                setFileUrl(null);
                methods.reset();
            }

        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Upload Micro-Economics Presentation
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Group Name */}
                    <div>
                        <label className="block font-medium mb-1">
                            Group Name
                        </label>

                        <input
                            type="text"
                            {...methods.register("groupName")}
                            placeholder="Enter group name"
                            className="w-full border px-3 py-2 rounded outline-blue-400"
                        />

                        {formState.errors.groupName && (
                            <p className="text-red-500 text-sm">
                                {formState.errors.groupName.message}
                            </p>
                        )}
                    </div>


                    {/* File Upload */}
                    <div>
                        <label className="block font-medium mb-2">
                            Upload File (PPT / PDF)
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

                                    setValue(
                                        "file",
                                        result.info.secure_url
                                    );
                                }

                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
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

                        {formState.errors.file && (
                            <p className="text-red-500 text-sm mt-1">
                                {formState.errors.file.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="bg-blue-700 text-white py-3 px-6 rounded w-full"
                    >
                        {formState.isSubmitting
                            ? "Uploading..."
                            : "Submit"}
                    </button>

                </form>

            </div>
        </FormProvider>
    )
}

export default PrincipleOfManagement;