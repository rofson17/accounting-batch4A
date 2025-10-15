"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "@/components/Input";
import RadioInput from "@/components/RadioInput";
import toast from "react-hot-toast";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

// validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Your name is required"),
    studentId: yup
        .string()
        .matches(/^\d{3}-\d{2}-\d{3}$/, "Enter a valid Student ID (e.g., 253-58-000)")
        .required("Student ID is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^01[0-9]{3}-?[0-9]{6}$/, "Enter a valid phone number (e.g., 017******** or 017**-******)")
        .required("Phone number is required"),
    jerseyNumber: yup.string().required("Jersey number is required"),
    sleeves: yup.string().required("Please select a sleeve type"),
    payment_method: yup.string().required("Select a payment method"),
    transactionId: yup.string().when("payment_method", {
        is: "bkash",
        then: (schema) => schema.required("Transaction ID is required for Bkash"),
    }),
    size: yup.string().required("Please select a jersey size"),
    transactionScreenshot: yup.string().when("payment_method", {
        is: "bkash",
        then: (schema) => schema.required("Transaction screenshot is required"),
    }),
});

const Jersey_2025 = () => {
    const [screenshot, setScreenShot] = useState(null);
    const methods = useForm({
        resolver: yupResolver(schema),
    });



    const { watch, handleSubmit, formState, setValue } = methods;
    const selectedPayment = watch("payment_method");

    const onSubmit = async (data) => {
        try {
            console.log(data);

            const response = await axios.post("/api/forms/jersey_order", data);
            if (response.status === 201) {
                toast.success("Successfully submitted");
                methods.reset();
                setScreenShot("");
            }


        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    }



    return (
        <FormProvider {...methods}>
            <div className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
                    {/* Right Column - Details */}
                    <div className="col-span-12 md:col-span-4 order-1 md:order-2 space-y-5">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Details</h2>
                        <div className="bg-gray-100 flex items-center justify-center h-52 rounded-lg text-gray-400">
                            <span>Image Preview</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            Show your team pride with our <strong>Jersey 2025</strong> edition. Fill in your
                            details, pick your size, and choose your payment method.
                        </p>
                    </div>

                    {/* Left Column - Form */}
                    <div className="col-span-12 md:col-span-8 order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-8">Jersey 2025 Order Form</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input name="name" label="Your Name" placeholder="Enter your name" />
                            <Input name="studentId" label="Student ID" placeholder="Enter student ID" />
                            <Input name="email" label="University Email ID" placeholder="Enter your email" />
                            <Input name="phone" label="Phone Number" placeholder="Enter phone number" />
                            <Input name="jerseyNumber" label="Jersey Number" placeholder="Enter jersey number" />

                            {/* Sleeves */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Sleeves</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <RadioInput label="Short Sleeve" name="sleeves" value="short" />
                                    <RadioInput label="Long Sleeve" name="sleeves" value="long" />
                                </div>
                                {formState.errors.sleeves && (
                                    <p className="text-red-500 text-sm mt-1">{formState.errors.sleeves.message}</p>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Payment Method</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <RadioInput label="Cash" name="payment_method" value="cash" />
                                    <RadioInput label="Bkash" name="payment_method" value="bkash" />
                                </div>
                                {formState.errors.payment_method && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formState.errors.payment_method.message}
                                    </p>
                                )}
                            </div>

                            {/* Bkash Conditional Fields */}
                            {selectedPayment === "bkash" && (
                                <>
                                    <Input
                                        name="transactionId"
                                        label="Transaction ID"
                                        placeholder="Enter transaction ID"
                                    />

                                    <div className="md:col-span-2">
                                        <p className="font-medium mb-2">Transaction Screenshot</p>



                                        <CldUploadWidget
                                            signatureEndpoint="/api/cloudinary/signature"
                                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                            options={{ sources: ['local', 'camera', 'google_drive'] }}
                                            resourceType="image"
                                            onSuccess={(result) => {
                                                // console.log(result)
                                                if (result?.info?.secure_url) {
                                                    setValue("transactionScreenshot", result.info.secure_url);
                                                    setScreenShot(result.info.secure_url);
                                                }
                                            }}
                                        >
                                            {({ open }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => open()}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "

                                                >
                                                    Upload Screenshot
                                                </button>
                                            )}
                                        </CldUploadWidget>

                                        {screenshot &&
                                            <Image src={screenshot} className="rounded-md my-4" alt="screenshot" height={500} width={100} />
                                        }

                                        {formState.errors.transactionScreenshot && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formState.errors.transactionScreenshot.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Jersey Size */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Jersey Size</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                                        <RadioInput key={size} label={size} name="size" value={size} />
                                    ))}
                                </div>
                                {formState.errors.size && (
                                    <p className="text-red-500 text-sm mt-1">{formState.errors.size.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={formState.isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-lg shadow-md font-semibold transition-all duration-300 disabled:bg-gray-600"
                            >
                                {!formState.isSubmitting ? "Submit" : "Uploading..."}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default Jersey_2025;
