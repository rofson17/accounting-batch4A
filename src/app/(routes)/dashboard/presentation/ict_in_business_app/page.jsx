"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CardPresentaionIct from "@/components/CardPresentationIct";


const PresentationIct = () => {
    const [groups, setGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchGroups = async (query = "") => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/forms/presentation/ict_in_business_app?query=${query}`);
            if (res.data.success) setGroups(res.data.presentations);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => { fetchGroups(); }, []);
    useEffect(() => {
        const delay = setTimeout(() => { fetchGroups(search); }, 300);
        return () => clearTimeout(delay);
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this group?")) return;
        try {
            const res = await axios.delete(`/api/forms/presentation/ict_in_business_app?id=${id}`);
            if (res.data.success) {
                toast.success("Deleted successfully");
                setGroups(prev => prev.filter(g => g._id !== id));
            } else toast.error(res.data.message || "Failed to delete");
        } catch (err) {
            console.error(err);
            toast.error("Server error while deleting");
        }
    }

    return (
        <div className="p-4 max-w-full">
            <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">ICT Group Presentations</h1>

            <input
                type="text"
                placeholder="Search by group, topic, or member"
                className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <>
                    {groups.length === 0 ? (
                        <p className="text-center text-gray-500 mt-4">No results found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {groups.map(group => (
                                <CardPresentaionIct key={group._id} group={group} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PresentationIct;
