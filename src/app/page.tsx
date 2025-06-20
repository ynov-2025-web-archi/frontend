import ProductCart from "@/components/ProductCard";
import ProductsJson from "../../public/mockup/products.json";
import Pagination from "@/components/ProductsPagination";
import NewsletterForm from "@/components/NewsletterForm";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Home() {

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-0 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[10px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mb-10 w-full max-w-screen-lg">
          {
            ProductsJson.map((product) => (
              <ProductCart key={product.id} product={product as Product} />
            ))
          }
        </div>
        <Pagination />
        <NewsletterForm />
      </main>

    </div>
  );
}
