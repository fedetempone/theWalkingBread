import Description from '../description/Description';
import Customize from '../customize/Customize';
import Newsletter from '../newsletter/Newsletter';
import Divisors from '../divisors/Divisors';
import SocialMedia from '../social-media/SocialMedia';
import SliderBanner from 'components/SliderBanner/SliderBanner';

function Home() {
  return (
    <>  
      <SliderBanner />
      <Description/>
      <Divisors text="PERSONALIZÁ"/>
      <Customize/>
      <Divisors text="NEWSLETTER"/>
      <Newsletter/>
      <Divisors text= "ENVIANOS UN MENSAJE"/>
      <SocialMedia/>
    </>
    
  )
}

export default Home;
