"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/Input";
import RadioInput from "@/components/RadioInput";

const Jersey_2025 = () => {
    const methods = useForm({
        defaultValues: {
            name: "",
            studentId: "",
            email: "",
            phone: "",
            jerseyNumber: "",
            sleeves: "",
            payment_method: "",
            transactionId: "",
            size: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto px-4 py-8">
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-8"
                >
                    {/* Right Column - Details Section */}
                    <div className="col-span-12 md:col-span-4 order-1 md:order-2 space-y-5">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                            Details
                        </h2>

                        <div className="bg-gray-100 flex items-center justify-center h-52 rounded-lg text-gray-400">
                            <span>Image Preview</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-justify">
                            Show your team pride with our <strong>Jersey 2025</strong> edition.
                            Customize your details, pick your size, and choose your preferred
                            payment method. Perfect fit and quality guaranteed!
                        </p>
                    </div>

                    {/* Left Column - Form Section */}
                    <div className="col-span-12 md:col-span-8 order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-8">Jersey 2025 Order Form</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input name="name" label="Your Name" placeholder="Enter your name" />
                            <Input name="studentId" label="Student ID" placeholder="Enter student ID" />
                            <Input name="email" label="Email ID" placeholder="Enter your email" />
                            <Input name="phone" label="Phone Number" placeholder="Enter phone number" />
                            <Input name="jerseyNumber" label="Jersey Number" placeholder="Enter jersey number" />
                            <Input name="sleeves" label="Sleeves" placeholder="Short/Long" />

                            {/* Payment Method */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Payment Method</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <RadioInput label="Cash" name="payment_method" value="cash" />
                                    <RadioInput label="Bkash" name="payment_method" value="bkash" />
                                </div>
                            </div>

                            <Input
                                name="transactionId"
                                label="Transaction ID"
                                placeholder="Enter transaction ID"
                                grid={2}
                            />

                            {/* Jersey Size */}
                            <div className="md:col-span-2 space-y-2">
                                <p className="font-medium">Jersey Size</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                                        <RadioInput key={size} label={size} name="size" value={size} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-10 rounded-lg shadow-md font-semibold transition-all duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default Jersey_2025;
