import ProductDetailsPage from "../../../components/ProductDetailsPage"

export async function generateStaticParams() {
  const res = await fetch("https://itx-frontend-test.onrender.com/api/product")
  const products = await res.json()
  return products.map((product) => ({ id: product.id }))
}

export default function ProductPage({ params }) {
  return <ProductDetailsPage id={params.id} />
}
