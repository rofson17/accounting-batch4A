"use client"
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    studentId: yup
        .string()
        .matches(/^\d{3}-\d{2}-\d{3}$/, "Enter valid Student ID (e.g. 253-58-000)")
        .required("Student ID is required"),
    amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0")
        .required("Amount is required"),
    payment_method: yup.string().required("Select a payment method"),

    transactionId: yup.string().when("paymentMethod", {
        is: "bkash",
        then: (schema) => schema.required("Transaction ID is required"),
    }),

    transactionScreenshot: yup.string().when("paymentMethod", {
        is: "bkash",
        then: (schema) => schema.required("Payment screenshot is required"),
    }),
})


const Picnic = () => {
    const [screenshotUrl, setScreenshotUrl] = useState(null);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            payment_method: "cash",
            amount: 350
        },
    })


    const { handleSubmit, watch, setValue, formState } = methods;
    const payment_method = watch("payment_method");

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/api/forms/picnic", data);

            if (res.status === 201) {
                Swal.fire({
                    title: "পেমেন্ট সফলভাবে পালিয়েছে",
                    text: "টাকা ঠিকঠাক গন্তব্যে পৌঁছে গেছে। মানিব্যাগ এখন হালকা, মন ভারী নয় 😌",
                    icon: "success"
                })
                setScreenshotUrl(null);
                methods.reset();
            }


        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    }


    return (<div className="container mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT: FORM */}
            <div className="bg-white p-6 rounded shadow order-2 md:order-1">
                <FormProvider {...methods}>
                    <div className="container mx-auto max-w-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">
                            Picnic Payment Form
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Name */}
                            <div>
                                <label className="block font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    {...methods.register("name")}
                                    placeholder="Enter your name"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {formState.errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Student ID */}
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

                            {/* Amount */}
                            <div>
                                <label className="block font-medium mb-1">Amount</label>
                                <input
                                    type="number"
                                    {...methods.register("amount")}
                                    placeholder="Enter amount"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {formState.errors.amount && (
                                    <p className="text-red-500 text-sm">
                                        {formState.errors.amount.message}
                                    </p>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block font-medium mb-2">Payment Method</label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="cash"
                                            {...methods.register("payment_method")}
                                        />
                                        Cash
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="bkash"
                                            {...methods.register("payment_method")}
                                        />
                                        bKash
                                    </label>
                                </div>

                                {formState.errors.payment_method && (
                                    <p className="text-red-500 text-sm">
                                        {formState.errors.payment_method.message}
                                    </p>
                                )}
                            </div>

                            {/* bKash Fields */}
                            {payment_method === "bkash" && (
                                <>
                                    {/* Transaction ID */}
                                    <div>
                                        <label className="block font-medium mb-1">
                                            Transaction ID
                                        </label>
                                        <input
                                            type="text"
                                            {...methods.register("transactionId")}
                                            placeholder="Enter bKash Transaction ID"
                                            className="w-full border px-3 py-2 rounded"
                                        />
                                        {formState.errors.transactionId && (
                                            <p className="text-red-500 text-sm">
                                                {formState.errors.transactionId.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Screenshot Upload */}
                                    <div>
                                        <label className="block font-medium mb-2">
                                            Payment Screenshot
                                        </label>

                                        <CldUploadWidget
                                            signatureEndpoint="/api/cloudinary/signature"
                                            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                            options={{
                                                resourceType: "image",
                                                allowedFormats: ["jpg", "png", "jpeg"],
                                            }}
                                            onSuccess={(result) => {
                                                if (result?.info?.secure_url) {
                                                    setScreenshotUrl(result.info.secure_url);
                                                    setValue("transactionScreenshot", result.info.secure_url);
                                                }
                                            }}
                                        >
                                            {({ open }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => open()}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                >
                                                    Upload Screenshot
                                                </button>
                                            )}
                                        </CldUploadWidget>

                                        {screenshotUrl && (
                                            <p className="text-sm mt-2 text-green-700">
                                                Uploaded successfully
                                            </p>
                                        )}

                                        {formState.errors.transactionScreenshot && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {formState.errors.transactionScreenshot.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={formState.isSubmitting}
                                className="bg-blue-600 text-white py-3 px-6 rounded w-full cursor-pointer hover:bg-blue-500 "
                            >
                                {formState.isSubmitting ? "Submitting..." : "Submit Payment"}
                            </button>
                        </form>
                    </div>
                </FormProvider>
            </div>

            {/* RIGHT: DESCRIPTION */}
            <div className="bg-blue-100 p-6 rounded shadow order-1 md:order-2">
                <h3 className="text-xl font-bold mb-4">
                    Picnic Payment Instructions
                </h3>

                <ul className="space-y-3 text-gray-700">
                    <li>• Picnic fee must be paid before <strong>20 March</strong>.</li>
                    <li>• Cash payments should be submitted to <span className="text-red-500"> Md. Rofson Jame Abu Siam</span></li>
                    <li>• For bKash payment, use the official number only.</li>
                    <li>• Make sure the <strong>Transaction ID</strong> is correct.</li>
                    <li>• Upload a clear screenshot of the payment.</li>
                    <li>• Wrong information may result in rejection.</li>
                </ul>

                <div className="mt-6 p-4 bg-white rounded border">
                    <p className="font-medium">bKash Number:</p>
                    <p className="text-lg font-bold text-blue-600">
                        01405-531417
                    </p>
                </div>
            </div>

        </div>
    </div>
    )
};

export default Picnic;