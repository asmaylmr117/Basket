function About() {
  return (
    <div className="flex flex-col gap-10 mt-20 w-full">
      
      {/* Section 1 – Hero Image */}
      <div className="section1 w-full h-[622px] relative">
        <img
          src="https://insights.workwave.com/wp-content/uploads/2021/08/WorkWave-How-To-Overcome-10-Common-E-commerce-Shipping-Fulfillment-Issues.jpg"
          alt="About us banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-semibold mb-4">
            About for Basket
          </h1>
          <p className="text-white text-base sm:text-lg font-semibold">
            WE CAN DO MORE FOR YOU
          </p>
        </div>
      </div>

      {/* Section 2 – Content */}
      <div className="section2 bg-white relative px-4 md:px-10 max-w-7xl mx-auto">

        {/* Paragraph */}
        <p className="text-gray-600 mb-6 leading-relaxed text-base md:text-lg">
          At our core, we aim to bring you a seamless online shopping 
          experience with a wide range of products. Whether you're upgrading your wardrobe, 
          building your dream PC, or hunting for the latest gadgets, we've got you covered.
        </p>

        <h1 className='text-2xl md:text-3xl font-semibold mb-4'>
          We deliver quality electronics, fashion, and tech essentials <br className="hidden md:block" /> all in one place
        </h1>

        <p className="text-gray-600 mb-10 leading-relaxed text-base md:text-lg">
          Our platform is built for convenience, offering everything from stylish clothing to cutting-edge electronics.
          We carefully select products to ensure quality, affordability, and reliability.
          Whether you're upgrading your tech or refreshing your wardrobe, we’ve got you covered.
          Shop with confidence, knowing we’re committed to your satisfaction every step of the way.
        </p>

        {/* CEO Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[883.75px]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="CEO"
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 px-2">
            <h2 className="text-xl font-medium mb-2">Youssef Assal - Basket CEO</h2>
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              Led by our visionary CEO, we strive to redefine online shopping with trust and innovation
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
              Our CEO brings a passion for technology and customer experience to everything we do.
              With a clear vision and hands-on leadership, they drive our mission to make smart shopping simple.
              Their leadership empowers our team to stay agile, creative, and focused on delivering excellence.
              Committed to transparency and growth, they guide the company with purpose and integrity.
            </p>
          </div>
        </div>

        {/* Floating Div */}
        <div className="w-[90%] md:w-[75%] px-6 md:px-24 py-12 bg-white border border-gray-300 rounded-lg shadow-md absolute top-[1050px] left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-base text-gray-600">
            Our CEO is a forward-thinking leader with a deep passion for innovation and customer satisfaction.
            With a strong background in both retail and technology, they bridge the gap between vision and execution.
            Their leadership empowers our team to stay agile, creative, and focused on delivering excellence.
            Committed to transparency and growth, they guide the company with purpose and integrity.
          </p>
        </div>

        {/* Website Info */}
        <div className="mt-[360px] md:mt-[280px] lg:mt-[150px] px-4">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Our website is designed to offer a seamless and intuitive shopping experience.
            With a vast selection ranging from fashion to electronics, we cater to every need.
            Fast load times, secure checkout, and responsive design ensure convenience across all devices.
            We continuously optimize to deliver value, variety, and satisfaction with every visit.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
