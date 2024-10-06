import { useDispatch, useSelector } from "react-redux";
import { setModels } from "../store/filtersSlice";

const ModelFilter = () => {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.filtersSlice);

  const handleModelChange = (event) => {
    const updatedModels = models.map((model) => {
      if (model.value === event.target.value) {
        return { ...model, checked: event.target.checked };
      }
      return model;
    });

    dispatch(setModels(updatedModels));
  };

  return (
    <div className=" bg-blue-600 shadow-md rounded p-4 mb-8">
      <h4 className="text-white font-semibold text-sm mb-1">Models:</h4>
      <hr />
      <div className="flex flex-col gap-2 mt-2 max-h-[120px] overflow-y-auto">
        {models.map((model, index) => (
          <label
            className="flex items-center cursor-pointer text-xs text-white"
            key={index}
          >
            <input
              type="checkbox"
              value={model.value}
              checked={model.checked}
              onChange={handleModelChange}
              className="mr-2"
            />
            {model.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ModelFilter;
