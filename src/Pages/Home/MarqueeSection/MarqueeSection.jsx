
import Marquee from 'react-fast-marquee';
import img1 from '../../../assets/marquee img/photo-151137993sfs8547-c1f69419868d.avif'
import img2 from '../../../assets/marquee img/photo-1621784166258-c6fdfff31879.avif'
import img3 from '../../../assets/marquee img/violin-bow-white-background_1150-8456.avif'

const MarqueeSection = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold text-center my-12'>Musical Instruments</h1>
      <div className="divider"></div>

      <Marquee className='my-12'>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <figure className="px-10 pt-10">
            <img src={img1} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Trumpet</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, atque.</p>
            <div className="card-actions">
              
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <figure className="px-10 pt-10 gap-5">
            <img src={img2}
              alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Acoustic Guitar</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, atque.</p>
            <div className="card-actions">
              
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-5">
          <figure className="px-10 pt-10">
            <img src={img3}
              alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Violin</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, atque.</p>
            <div className="card-actions">
              
            </div>
          </div>
        </div>
      </Marquee>

    </div>

  );
};

export default MarqueeSection;