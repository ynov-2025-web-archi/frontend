'use server';
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

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "6");
  const offset = (currentPage - 1) * limit;

  let products: Product[] = [];
  let totalProducts = 0;
  let totalPages = 1;

  try {
    // Try to fetch from API Gateway
    const apiUrl = process.env.API_GATEWAY_URL || "http://localhost:3001";
    const response = await fetch(`${apiUrl}/api/products?page=${currentPage}&limit=${limit}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    products = data.products || [];
    totalProducts = data.pagination?.totalCount || 0;
    totalPages = data.pagination?.totalPages || Math.ceil(totalProducts / limit);
  } catch (error) {
    console.log('Using fallback data:', error);
    // Fallback to mockup data
    totalProducts = ProductsJson.length;
    totalPages = Math.ceil(totalProducts / limit);
    products = ProductsJson.slice(offset, offset + limit);
  }

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-0 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[10px] row-start-2 items-center sm:items-start">
        {products.length === 0 ? (
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No Products Found</h2>
            <p className="text-gray-500">No products are available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mb-10 w-full max-w-screen-lg">
              {products.map((product: Product) => (
                <ProductCart key={product.id} product={product as Product} />
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              itemsPerPage={limit}
            />
          </>
        )}
        <NewsletterForm />
      </main>
    </div>
  );
}
