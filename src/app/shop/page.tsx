import ItemCard from '@/_components/customs/ItemCard'
import ProductList from '@/_components/customs/ProductList'

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold  ">Items list</h1>
      <h2>Some items</h2>

      <ProductList />

      {/* <div className="flex flex-wrap justify-center md:justify-start">
      <ItemCard slug="test1"/>
      <ItemCard slug="test2"/>
      <ItemCard slug="test3"/>
      <ItemCard slug="test4"/>
    </div> */}
    </>
  )
}
