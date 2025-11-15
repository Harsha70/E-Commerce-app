import { Breadcrumbs } from "@/components/breadcrumbs";
import { Suspense } from "react";
import ProductsSkeleton from "../ProductsSkeleton";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import ProductCard from "../ProductCard";
// import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

async function Products({ query }: { query: string }) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 18,
  });

  await sleep(1000);

  if (products.length === 0) {
    return <div className="text-center">No Products found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const sort = params.sort;

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: `Results for "${query}"`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
        {/* <ProductListServerWrapper params={{ query, sort }} /> */}
        <Products query={query} />
      </Suspense>
    </main>
  );
}
