import { useEffect, useState } from "react";
import type { RecipeSummary } from "../shared/types";
import * as RecipeAPI from "../api";

interface Props {
  recipeId: string;
  onClose: () => void;
  onLoadingChange: (isLoading: boolean) => void;
}

const RecipeModal = ({ recipeId, onClose, onLoadingChange }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    onLoadingChange(true);
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
        onLoadingChange(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipeSummary();
  }, [recipeId]);

  if (!recipeSummary) {
    return <></>;
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }} />
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
