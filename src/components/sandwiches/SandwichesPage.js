import './sandwiches.css';
import React, { useState, useEffect } from 'react';
import Divisors from 'components/divisors/Divisors';
import SocialMedia from 'components/social-media/SocialMedia';
import ProductList from 'components/productList/ProductList';

function SandwichesPage() {
  return (
    <>
      <div className="products-container">
        <ProductList category="sandwiches" />
      </div>
      <Divisors text="ENVIANOS UN MENSAJE"></Divisors>
      <SocialMedia />
    </>
  );
}

export default SandwichesPage;


