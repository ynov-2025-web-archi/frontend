"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DialogTitle } from "@radix-ui/react-dialog"

export default function FloatingChatbot() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])

    const sendMessage = () => {
        if (!input.trim()) return
        setMessages((prev) => [...prev, { role: "user", text: input }])

        // Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: "bot", text: `🤖 Réponse à "${input}"` }])
        }, 500)

        setInput("")
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="rounded-full shadow-lg bg-white border hover:scale-105 transition p-1">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src="https://i.pravatar.cc/300?img=68" alt="Bot" />
                        </Avatar>
                    </button>
                </DialogTrigger>

                <DialogContent className="p-0 border-none shadow-xl w-[90vw] max-w-sm fixed bottom-24 right-6 m-0">
                    <DialogTitle className="text-lg font-semibold p-4 border-b">
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://i.pravatar.cc/300?img=68" alt="Bot" />
                            </Avatar>
                            <span>
                                Vincent, votre assistant virtuel
                            </span>
                        </div>
                    </DialogTitle>
                    <div className="bg-white rounded-lg flex flex-col h-[400px]">
                        <ScrollArea className="flex-1 p-4 space-y-2">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`text-sm p-2 rounded-lg max-w-[80%] w-[200px] mb-4 ${msg.role === "user"
                                            ? "bg-blue-100 ml-auto text-right"
                                            : "bg-gray-100 mr-auto text-left"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </ScrollArea>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                sendMessage()
                            }}
                            className="flex items-center border-t p-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Votre message..."
                                className="flex-1 mr-2"
                            />
                            <Button type="submit">Envoyer</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
