import { useParams } from "react-router-dom";
function Category() {
  const { categoryName } = useParams();
  return (
    <div>
      {categoryName === "buy-house" ? (
        <div>خرید خانه</div>
      ) : (
        <div>اجاره مسکن</div>
      )}
    </div>
  );
}

export default Category;
