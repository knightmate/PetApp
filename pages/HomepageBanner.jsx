import React from 'react';
import catImage from '../catanddog.png';
 
function HomePageBanner() {
  return (
    <div className="banner">
      <div style={{flex:1,display:'flex'}} className="text">
        <h1>Welcome to Our Website</h1>
        <p>Discover the world of pets and find your new best friend.</p>
      </div>
      <div className="image">
        <img src={catImage} alt="Banner" />
      </div>
    </div>
  );
}

export default HomePageBanner;
