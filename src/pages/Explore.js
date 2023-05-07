import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div className="flex gap-12 p-5">
      <Link to={"/category/buy-house"} className="w-full">
        <div className="card image-full h-60">
          <figure>
            <img src={sellCategoryImage} alt="خرید خانه" className="w-full" />
          </figure>
          <div className="card-body justify-end">
            <div className="bg-base-100 w-max p-2 translate-x-7 rounded-e-md">
              <h2 className="card-title text-gray-500 font-semibold">
                خرید خانه
              </h2>
            </div>
          </div>
        </div>
      </Link>
      <Link to={"/category/rent-house"} className="w-full">
        <div className="card image-full h-60">
          <figure>
            <img src={rentCategoryImage} alt="اجاره مسکن" className="w-full" />
          </figure>
          <div className="card-body justify-end">
            <div className="bg-base-100 w-max p-2 translate-x-7 rounded-e-md">
              <h2 className="card-title text-gray-500 font-semibold">
                اجاره مسکن
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Explore;
