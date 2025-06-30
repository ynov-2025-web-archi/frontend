"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const Index = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            setStatus("error");
            setMessage("Please enter your email address");
            return;
        }

        setStatus("loading");
        setMessage("");
        try {
            const result = await subscribeToNewsletter(email);

            if (result.success) {
                setStatus("success");
                setMessage(result.message || "Successfully subscribed to newsletter!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(result.message || "Failed to subscribe");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred. Please try again.");
            console.error("Newsletter subscription error:", error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Stay Updated!</h1>
            <p className="text-lg text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates and offers.
            </p>
            <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto my-10">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    disabled={status === "loading"}
                />
                <Button 
                    type="submit" 
                    className="w-full"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
                
                {message && (
                    <div className={`text-sm p-3 rounded-md ${
                        status === "success" 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Index;