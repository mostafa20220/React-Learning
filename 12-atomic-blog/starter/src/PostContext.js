import React, {
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from "react";
import CreateRandomPost from "./CreateRandomPost";

const PostContext = createContext();

// Custom Context Provider
export const PostProvider = memo(function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => CreateRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = useMemo(
    () => ({
      posts: searchedPosts,
      searchQuery,
      setSearchQuery,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
    }),
    [searchedPosts, searchQuery]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
});

// Custom useContext Hook
export function usePosts() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("usePost was used outside PostContext Children!");
  return context;
}
