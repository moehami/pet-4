import React from "react";

import Image from "next/image";

import tigerzz from "../public/img/adoption/tigerzz.png";


const Adoption = () => {
  return (
    <section className="bg-[#2596BE] bg-cover bg-center bg-no-repeat min-h-[760px] py-8 flex">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-x-16">
        {/* image */}
        <div className="flex-1 mb-6 lg:mb-0">
          <Image src={tigerzz} width={500} height={500} alt=" Tiger Names" />
        </div>
        {/* text */}
        <div className="flex-1 text-cream text-center max-w-md lg:text-left lg:max-w-none">
          <h2 className="h2 mb-6"> Tiger Names </h2>
          <p className="mb-6">
The tiger is one of the most iconic and powerful big cats, conventionally orange with black stripes. Native to Asia, tigers are solitary hunters with exceptionally good night vision. All subspecies of tigers are endangered, either because of habitat loss or poaching, putting a great emphasis on the global scale of conservation efforts.
          </p>
          <ul className="mb-[38px] flex flex-col gap-y-4 lg:list-disc lg:pl-4">
            <li>Adoption</li>
            <li>Frozen Raw</li>
            <li>Next Day Delivery</li>
          </ul>
          <button className="btn btn-primary mx-auto lg:mx-0">Explore</button>
        </div>
      </div>
    </section>
  );
};

export default Adoption;
