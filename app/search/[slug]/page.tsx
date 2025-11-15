import { Breadcrumbs } from "@/components/breadcrumbs";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";
import { prisma } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import ProductCard from "../../ProductCard";
import { notFound } from "next/navigation";
// import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    ...(orderBy ? { orderBy } : {}),
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

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={slug} fallback={<ProductsSkeleton />}>
        {/* <ProductListServerWrapper params={{ query, sort }} /> */}
        <Products slug={slug} />
      </Suspense>
    </main>
  );
}
