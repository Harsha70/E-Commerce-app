// import { mockProducts } from "@/lib/mocks";
import ProductCart from "./ProductCard";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductsSkeleton from "./ProductsSkeleton";
import { getProductBySlug } from "@/lib/actions";
import { Breadcrumbs } from "@/components/breadcrumbs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 2;
async function Products({ page }: { page: number }) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  console.log("server call", await getProductBySlug("wireless-headphones"));

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: "Home", href: "/" }]} />

      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <Products page={page} />
      </Suspense>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
