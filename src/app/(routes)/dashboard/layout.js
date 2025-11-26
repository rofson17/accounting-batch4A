"use client";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex">
            <DashboardSidebar />
            <div className="flex-1 md:ml-64 ml-20  p-4">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
