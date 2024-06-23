// hooks/useConfirm.ts
import { useHelperContext } from "../context/HelperContext"; // Adjust the import path as needed

const useConfirm = () => {
  const { confirm } = useHelperContext();
  return confirm;
};

export default useConfirm;
