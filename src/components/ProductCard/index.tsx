'use client';
import Image from "next/image";

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface IProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    }
}


const Index = ({ product }: IProps) => {
    return (
        <div
            key={product.id}
            className="flex flex-col items-center sm:items-start gap-4 p-4 border rounded-lg shadow-sm w-full max-w-md"
        >
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-lg font-bold">${product.price}</span>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Product has bee added", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Ajouter au panier
            </Button>
        </div>
    )
}

export default Index;