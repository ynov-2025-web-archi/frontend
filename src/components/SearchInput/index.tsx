"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { getSearchSuggestions } from "@/app/actions/search"

interface Suggestion {
    text: string;
    category: string;
    type: string;
}

interface SearchInputProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

const Index = ({ onSearch, placeholder = "Search products..." }: SearchInputProps) => {
    const [query, setQuery] = useState("")
    const [focused, setFocused] = useState(false)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    // Debounced search suggestions
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (query.trim().length < 2) {
            setSuggestions([])
            setShowSuggestions(false)
            return
        }

        timeoutRef.current = setTimeout(async () => {
            setLoading(true)
            try {
                const result = await getSearchSuggestions(query, 5)
                if (result.success && result.data) {
                    setSuggestions(result.data.suggestions)
                    setShowSuggestions(true)
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                setSuggestions([])
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [query])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        if (!value.trim()) {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setQuery(suggestion.text)
        setShowSuggestions(false)
        setFocused(false)
        if (onSearch) {
            onSearch(suggestion.text)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowSuggestions(false)
            setFocused(false)
            if (onSearch) {
                onSearch(query)
            }
        }
    }

    const handleFocus = () => {
        setFocused(true)
        if (suggestions.length > 0) {
            setShowSuggestions(true)
        }
    }

    const handleBlur = () => {
        setTimeout(() => {
            setFocused(false)
            setShowSuggestions(false)
        }, 150)
    }

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="flex items-center gap-2">
                <Input
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <div className="ml-2">
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                    ) : (
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
                    )}
                </div>
            </div>

            {focused && showSuggestions && suggestions.length > 0 && (
                <Card className="absolute top-full left-0 mt-1 w-full z-50 border bg-white shadow-md max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 11H1l8-8 8 8h-8v8z"/>
                                    </svg>
                                </div>
                                <span className="font-medium">{suggestion.text}</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {suggestion.category}
                            </span>
                        </div>
                    ))}
                </Card>
            )}

            {focused && query.trim().length >= 2 && !loading && suggestions.length === 0 && (
                <Card className="absolute top-full left-0 mt-1 w-full z-50 border bg-white shadow-md">
                    <div className="px-4 py-2 text-sm text-gray-500">
                        No suggestions found for &quot;{query}&quot;
                    </div>
                </Card>
            )}
        </div>
    )
}

export default Index
