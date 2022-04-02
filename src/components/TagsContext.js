import { createContext, useState } from "react";

export const TagsContext = createContext();

export default function Tags({ children }) {
  const [tagsApplied, setTagsApplied] = useState([]);

  return (
    <TagsContext.Provider value={{ tagsApplied, setTagsApplied }}>
      {children}
    </TagsContext.Provider>
  );
}
