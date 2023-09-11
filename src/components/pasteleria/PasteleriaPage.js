import React, { useEffect, useState } from 'react';
import Divisors from 'components/divisors/Divisors';
import SocialMedia from 'components/social-media/SocialMedia';
import ProductList from 'components/productList/ProductList';

function PasteleriaPage() {
  return (
    <>
      <div className="products-container">
        <ProductList category="pasteleria" />
      </div>
      <Divisors text="ENVIANOS UN MENSAJE"></Divisors>
      <SocialMedia></SocialMedia>
    </>
  );
}

export default PasteleriaPage;
