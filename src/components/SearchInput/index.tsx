"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ProductsJson from "../../../public/mockup/products.json";

interface Product { 
    id: number;
    name: string;
    imageUrl: string;
}

const Index = () => {
    const [query, setQuery] = useState("")
    const [focused, setFocused] = useState(false)

    const filtered = query
        ? (ProductsJson as Product[]).filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        )
        : []

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                />
                <div className="ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
            </div>

            {focused && filtered.length > 0 && (
                <Card className="absolute top-full left-0 mt-1 w-full z-50 border bg-white shadow-md max-h-60 overflow-y-auto">
                    {filtered.map((product: Product) => (
                        <div
                            key={product.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-3"
                            onMouseDown={() => {
                                setQuery(product.name)
                                setFocused(false)
                            }}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-8 h-8 object-cover rounded"
                            />
                            <span>{product.name}</span>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    )
}

export default Index
