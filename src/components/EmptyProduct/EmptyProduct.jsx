import { Empty } from "antd";

const EmptyProduct = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div>
            <h5 className="mb-2">No Products Found</h5>
            <p className="text-muted mb-0">
              Try changing your search or filters.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default EmptyProduct;