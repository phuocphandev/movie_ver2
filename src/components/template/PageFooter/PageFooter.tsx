const PageFooter = () => {
  return (
    <div className="absolute p-5 bottom-0 w-full text-white bg-transparent flex justify-evenly h-[20vh] "
    style={{backgroundImage: 'img(./image/footer/Rectangle.png)'}}
    >
      <div className="flex flex-col">
        <img
          src="./image/navbar/Logo.png"
          alt="logo"
          className="h-20 mr-2 pt-1 w-20"
        />
        <p>Movid</p>
        <p>© Luxi Theme 2020</p>
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-bold mb-3">COMPANY</p>
        <p>Donec dignissim</p>
        <p>Curabitur egestas</p>
        <p>Nam posuere</p>
        <p>Aenean facilisis</p>
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-bold mb-3">LEGAL</p>
        <p>Donec dignissim</p>
        <p>Curabitur egestas</p>
        <p>Nam posuere</p>
        <p>Aenean facilisis</p>
      </div>
      <div className="flex flex-col">
      <p className="text-xl font-bold mb-3">CONTACT US</p>
        <div className="flex gap-2">
        <img src="./image/footer/facebook.png" alt="facebook" className="h-7 w-7"/>
        <img src="./image/footer/github.png" alt="github" className="h-7 w-7"/>
        <img src="./image/footer/linkedin.png" alt="linkedin" className="h-7 w-7"/>
        <img src="./image/footer/instagram.png" alt="instagram" className="h-7 w-7"/>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default PageFooter;
