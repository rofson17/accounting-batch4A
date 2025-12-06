import DashboardSidebar from "@/components/DashboardSidebar";

export const metadata = { title: "Dashboard" }

const DashboardLayout = ({ children }) => (
    <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 transition-all duration-300 md:ml-40  ml-0" >
            {children}
        </main>
    </div>
)

export default DashboardLayout