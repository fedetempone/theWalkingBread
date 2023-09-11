import ProductList from "components/productList/ProductList";
import Divisors from "components/divisors/Divisors";
import SocialMedia from "components/social-media/SocialMedia";

function PanaderiaPage() {
  return (
    <>
       <div className="products-container">
        <ProductList category="panaderia" />
      </div>
      <Divisors text="ENVIANOS UN MENSAJE"></Divisors>
      <SocialMedia />
    </>
  )
}

export default PanaderiaPage;