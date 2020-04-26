

export default function postReducer(state = [], action) {


   if (action.type === 'LOAD_POSTS') {
      return Object.assign([], { ...state }, { posts: action.posts, arraySize: action.length })
   }
   if (action.type === 'LOAD_OLD_POSTS') {
      return { posts: state.posts.concat(action.posts.content), arraySize: action.length }
   }

   if (action.type === 'LOAD_POST') {
      const obj = {
         state,
         post: { ...action.post }
      }
      return Object.assign([], { state }, { ...obj })
   }
   return state


}