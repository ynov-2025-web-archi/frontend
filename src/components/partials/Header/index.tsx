import SearchInput from "@/components/SearchInput";
import ShoppingCart from "@/components/ShoppingCart";
const Index = () => {

    const menu = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <header className="bg-white shadow py-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-bold">My Website</a>
                        </div>
                        <nav className="ml-10 flex items-baseline space-x-4">
                            {menu.map((item) => (
                                <a key={item.name} href={item.path} className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-md font-medium">
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                        <SearchInput />
                        <ShoppingCart />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Index;