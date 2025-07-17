export async function generateStaticParams() {
  const res = await fetch('https://itx-frontend-test.onrender.com/api/product');
  const products = await res.json();
  return products.map(product => ({ id: product.id }));
}

import ProductDetailsPageWrapper from '../../../components/ProductDetailsPage'

export default function ProductPage({ params }) {
  return <ProductDetailsPageWrapper id={params.id} />;
}
