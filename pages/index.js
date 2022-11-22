import Layout from '../components/Layout'
import Product from "../components/Product";

export default function Home() {
  return (
      <Layout title={'Home Page'}>
        <div className={'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'}>
            <Product/>
        </div>
      </Layout>
  )
}
