import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Stay Updated!</h1>
            <p className="text-lg text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
        <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
        <form className="flex gap-4 w-full align-center justify-center my-10">
        <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md"
        />
        <Button type="submit" className="w-[100px] max-w-md">
            Subscribe
        </Button>
            </form>
        </div>
    );
}

export default Index;