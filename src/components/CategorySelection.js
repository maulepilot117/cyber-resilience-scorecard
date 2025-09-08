import React from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { scorecardData } from '../scorecardData';

const CategorySelection = ({
  selectedSubCategories,
  expandedCategories,
  toggleCategoryExpansion,
  handleSubCategorySelection,
  handleSelectAllInCategory,
  getCategorySelectionStatus,
  handleCategoriesSubmit,
  goBack
}) => {
  return (
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-300">
      <div className="h-full flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Select Assessment Categories
          </h2>
          <p className="text-gray-600">
            Choose which areas you'd like to assess
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {scorecardData.categories.map((category) => {
              if (!category) return null;

              const isExpanded = expandedCategories[category.name];
              const selectionStatus = getCategorySelectionStatus(category.name);
              const hasNonEmptySubcategories = category.subCategories?.some(
                sc => sc.questions && sc.questions.length > 0
              );

              // Skip categories with no questions at all
              if (!category.questions?.length && !hasNonEmptySubcategories) {
                return null;
              }

              const categoryQuestions = category.questions?.length || 0;
              const subCategoryQuestions = category.subCategories?.reduce(
                (sum, subCat) => sum + (subCat.questions?.length || 0),
                0
              ) || 0;
              const totalQuestions = categoryQuestions + subCategoryQuestions;
              const nonEmptySubcategoryCount = category.subCategories?.filter(
                sc => sc.questions && sc.questions.length > 0
              ).length || 0;

              return (
                <div
                  key={category.name}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleCategoryExpansion(category.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {categoryQuestions > 0 && `${categoryQuestions} general, `}
                            {nonEmptySubcategoryCount > 0 && `${nonEmptySubcategoryCount} areas, `}
                            {totalQuestions} total questions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {nonEmptySubcategoryCount > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAllInCategory(category.name);
                            }}
                            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                              selectionStatus === "all"
                                ? "bg-indigo-600 text-white"
                                : selectionStatus === "partial"
                                  ? "bg-indigo-200 text-indigo-800"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {selectionStatus === "all" ? "Deselect All" : "Select All"}
                          </button>
                        )}
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {categoryQuestions > 0 && nonEmptySubcategoryCount > 0 && (
                        <div className="p-4 bg-blue-50 border-b border-gray-200">
                          <p className="text-sm text-blue-700 ml-8">
                            <span className="font-medium">Note:</span> Selecting any area includes {categoryQuestions} general questions
                          </p>
                        </div>
                      )}
                      {category.subCategories?.map((subCategory) => {
                        // Skip empty subcategories
                        if (!subCategory.questions || subCategory.questions.length === 0) {
                          return null;
                        }

                        const subCategoryKey = `${category.name}:${subCategory.name}`;
                        const isSelected = selectedSubCategories.includes(subCategoryKey);

                        return (
                          <div
                            key={subCategory.name}
                            onClick={() => handleSubCategorySelection(category.name, subCategory.name)}
                            className={`cursor-pointer p-4 border-b border-gray-200 last:border-b-0 transition-colors ${
                              isSelected ? "bg-indigo-50" : "hover:bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between ml-8">
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  {subCategory.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {subCategory.questions.length} questions
                                </p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  isSelected
                                    ? "bg-indigo-600 border-indigo-600"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleCategoriesSubmit}
            className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
              selectedSubCategories.length > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedSubCategories.length === 0}
          >
            Continue ({selectedSubCategories.length} selected)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;