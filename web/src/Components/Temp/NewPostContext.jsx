import { createContext, useReducer } from 'react';

export const NewPostContext = createContext(null);
export const NewPostDispatchContext = createContext(null);

const initialPostData = [ {
  id: 1,
  title: "Sampletitle",
  poster: "Sampleposter",
  story: "Samplestory",
 }]

export function NewPostProvider({ children }) {
  const [postData, dispatch] = useReducer(NewPostReducer, initialPostData);
  console.log(postData, " from context provider")

  return (
    <NewPostContext.Provider value={postData}>
      <NewPostDispatchContext.Provider value={dispatch}>
        {children}
      </NewPostDispatchContext.Provider>
    </NewPostContext.Provider>
  );
}


const NewPostReducer = (postData, action) => {
  debugger
  switch (action.type) {
    // case 'titleUpdate':
    //   return { ...postData, title: action.payload };
    // case 'storyUpdate':
    //   return { ...NewPost, storyInput : action.payload };
    // case 'posterUpdate':
    //   return { ...NewPost, posterInput : action.payload };
    case 'addPost': {
      return [...postData, action.payload ];
    } 
    default:
      return postData;

  }
};