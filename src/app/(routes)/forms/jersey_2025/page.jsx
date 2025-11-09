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
import { IoCameraOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";

// validation schema
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
    displayName: yup.string().required("Display name is required"),
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
    const methods = useForm({ resolver: yupResolver(schema) });
    const { watch, handleSubmit, formState, setValue } = methods;
    const selectedPayment = watch("payment_method");

    const onSubmit = async (data) => {
        try {
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
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto px-4 py-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-8"
                >
                    {/* Right Column */}
                    <div className="col-span-12 md:col-span-4 order-1 md:order-2 space-y-6">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center md:text-left">
                            Jersey Details
                        </h2>

                        {/* Jersey Image */}
                        <div className="bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center p-4">
                            <div className="relative w-full h-64 overflow-hidden rounded-lg">
                                <Image
                                    src="/jersey.jpg"
                                    alt="Jersey Preview"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <span className="text-sm text-gray-500 mt-2">Jersey Preview</span>
                        </div>
                        {/* Description & Details */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg shadow-sm mt-6 space-y-3">
                            <p className="text-gray-700 italic text-center leading-relaxed text-sm">
                                "আপনারা যে বর্তমান জার্সির ডিজাইন দেখছেন—এটি চূড়ান্ত নয়। ডিজাইনে পরিবর্তন আনা হবে, এবং সেই পরিবর্তন কার্যকর করতে আমাদের ডিজাইন কোম্পানিকে অগ্রিম পেমেন্ট করতে হবে। নির্ধারিত সময়ের মধ্যে আমি চেষ্টা করব এমন একটি আপডেটেড ডিজাইন চূড়ান্ত করতে, যা আমাদের ডিপার্টমেন্টের থিমের সাথে সামঞ্জস্যপূর্ণ এবং সবার জন্য আকর্ষণীয় হবে।
                                <br />
                                <span className="text-red-500">
                                    স্পোর্টস টিমের সদস্যদের জন্য জার্সি সংগ্রহ বাধ্যতামূলক।
                                </span>
                                আমরা আশা করি, আমরা সবাই একসাথে জার্সির মাধ্যমে আমাদের ডিপার্টমেন্ট এবং আমাদের সেকশনকে আরও শক্তিশালীভাবে উপস্থাপন করতে পারব।"

                            </p>

                            <div className="text-gray-800 text-sm mt-4 space-y-2">
                                <p><span className="font-semibold text-blue-600">Fabric:</span> <b>Leaf Jacquard</b></p>
                                <p><span className="font-semibold text-blue-600">Price:</span></p>
                                <ul className="list-disc list-inside ml-3">
                                    <li>Half Sleeves — <span className="font-bold">500 Taka</span></li>
                                    <li>Full Sleeves — <span className="font-bold">550 Taka</span></li>
                                </ul>
                                <p className="text-red-600 font-semibold mt-3 text-center">
                                    Deadline: 14-11-2025
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300  text-center">
                            <table className="min-w-full text-sm text-gray-700 border-collapse">
                                <thead className="bg-gray-200 border-b border-gray-300">
                                    <tr>
                                        <th className="py-3 px-4 text-left border-r border-gray-300 font-semibold">Size</th>
                                        <th className="py-3 px-4 text-left border-r border-gray-300 font-semibold">Chest (inches)</th>
                                        <th className="py-3 px-4 text-left font-semibold">Length (inches)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { size: "S", chest: 36, length: 26 },
                                        { size: "M", chest: 38, length: 27 },
                                        { size: "L", chest: 40, length: 28 },
                                        { size: "XL", chest: 42, length: 29 },
                                        { size: "2XL", chest: 44, length: 30 },
                                        { size: "3XL", chest: 46, length: 31 },
                                    ].map((item, index) => (
                                        <tr
                                            key={item.size}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                } hover:bg-gray-100 transition-colors border-b border-gray-300`}
                                        >
                                            <td className="py-2 px-4 border-r border-gray-300 font-semibold text-gray-800">{item.size}</td>
                                            <td className="py-2 px-4 border-r border-gray-300">{item.chest}"</td>
                                            <td className="py-2 px-4">{item.length}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                            <Input name="displayName" label="Display Name" placeholder="Enter name to show on jersey" />

                            {/* Jersey Size */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Jersey Size</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                                        <RadioInput key={size} label={size} name="size" value={size} />
                                    ))}
                                </div>
                                {formState.errors.size && (
                                    <p className="text-red-500 text-sm mt-1">{formState.errors.size.message}</p>
                                )}
                            </div>

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
                                    <p className="text-red-500 text-sm mt-1">{formState.errors.payment_method.message}</p>
                                )}
                            </div>

                            {/* Conditional Fields for Bkash */}
                            {selectedPayment === "bkash" && (
                                <>
                                    <div className="w-full">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm text-center mt-4">
                                            <p className="mb-3 w-full">
                                                <span className="font-semibold text-lg text-gray-800">
                                                    💰 Send Money:
                                                </span>{" "}
                                                <span className="font-bold text-blue-700 text-xl tracking-wide">
                                                    01776-811441
                                                </span>{" "}
                                                <span className="text-gray-600">(Personal)</span>
                                            </p>

                                            <p className="text-red-600 text-sm font-medium">
                                                ⚠️ Please send with charge included 💵
                                            </p>
                                        </div>

                                        <Input
                                            name="transactionId"
                                            label="Transaction ID"
                                            placeholder="Enter transaction ID"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="font-medium mb-2">Transaction Screenshot</p>

                                        <CldUploadWidget
                                            signatureEndpoint="/api/cloudinary/signature"
                                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                            options={{
                                                sources: ["local", "camera", "google_drive"],
                                                showCompletedButton: false,
                                                showPoweredBy: false,
                                            }}
                                            resourceType="image"
                                            onSuccess={(result) => {
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
                                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex justify-center items-center"
                                                >
                                                    <IoCameraOutline className="text-2xl mr-2" /> Upload Screenshot
                                                </button>
                                            )}
                                        </CldUploadWidget>

                                        {screenshot && (
                                            <Image
                                                src={screenshot}
                                                className="rounded-md my-4"
                                                alt="screenshot"
                                                height={500}
                                                width={100}
                                            />
                                        )}

                                        {formState.errors.transactionScreenshot && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formState.errors.transactionScreenshot.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
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
    )
}

export default Jersey_2025
