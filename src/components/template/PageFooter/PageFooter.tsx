export const PageFooter = () => {
  return (
    <div className="pl-[10%]">
      <div
        className="grid grid-cols-2 xl:grid-cols-4 relative text-white bg-transparent h-full w-full py-5 gap-[2rem] pl-[2rem] "
        style={{ backgroundImage: "img(./image/footer/Rectangle.png)" }}
      >
        <div>
          <div className="flex flex-col">
            <img
              src="/image/navbar/navbar_logo.png"
              alt="logo"
              className="h-20 mr-2 pt-1 w-20"
            />
            <p>Movid</p>
            <p>© Created by P & K</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="text-[16px] xl:text-xl font-bold mb-3">
              CYBERSOFT ACADEMY
            </p>
            <p className="text-xs xl:text-[16px]">React</p>
            <p className="text-xs xl:text-[16px]">Javascript-Typescript</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="text-xl font-bold mb-3">LEGAL</p>
            <p className="text-xs xl:text-[16px]">Capstone</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <p className="font-bold mb-3 text-[16px] xl:text-xl">CONTACT US</p>
            <div className="flex gap-2">
              <img
                src="/image/footer/facebook.png"
                alt="facebook"
                className="h-7 w-7"
              />
              <img
                src="/image/footer/github.png"
                alt="github"
                className="h-7 w-7"
              />
              <img
                src="/image/footer/linkedin.png"
                alt="linkedin"
                className="h-7 w-7"
              />
              <img
                src="/image/footer/instagram.png"
                alt="instagram"
                className="h-7 w-7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
