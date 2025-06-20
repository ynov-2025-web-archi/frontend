import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ProductsJson from "../../../public/mockup/products.json";

const Index = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 10l-2 -6" /><path d="M7 10l2 -6" /><path d="M13 20h-5.756a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.358 2.04" /><path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M19 16l-2 3h4l-2 3" /></svg>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Panier</SheetTitle>
                    <SheetDescription>
                        Voici les produits que vous avez ajoutés à votre panier.
                        Vous pouvez modifier les quantités ou supprimer des articles.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    {
                        ProductsJson.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.description}</p>
                                </div>
                                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            </div>
                        ))
                    }
                </div>
                <SheetFooter>
                    <Button type="submit">Checkout</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Index;