const blogs = [
  {
    id: 1,
    title: "Complete Guide to React Data Fetching Techniques",
    slug: "react-data-fetching-complete-guide",
    excerpt: "Master all React data fetching methods: Fetch API, Axios, async/await, custom hooks, React Query, SWR, and GraphQL. Learn best practices with practical code examples.",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    date: "2024-12-03",
    content: `
## Complete Guide to React Data Fetching Techniques

Data fetching is a fundamental part of React applications. This comprehensive guide covers all major approaches, from native browser APIs to modern libraries, helping you choose the right tool for your needs.

---

## 1. Native Fetch API

The Fetch API is built into JavaScript - no installation required. It's promise-based and works with any API.

### Basic GET Request

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### POST Request

\`\`\`jsx
const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};
\`\`\`

### Cleanup with AbortController

\`\`\`jsx
useEffect(() => {
  const controller = new AbortController();

  fetch('https://api.example.com/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') setError(err.message);
    });

  return () => controller.abort();
}, []);
\`\`\`

---

## 2. Axios

Axios is a popular HTTP client with automatic JSON transformation, better error handling, and interceptors.

### Installation

\`\`\`bash
npm install axios
\`\`\`

### Basic Usage

\`\`\`jsx
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### CRUD Operations

\`\`\`jsx
// POST
const createPost = async (data) => {
  const response = await axios.post('/api/posts', data);
  return response.data;
};

// PUT
const updatePost = async (id, data) => {
  const response = await axios.put(\`/api/posts/\${id}\`, data);
  return response.data;
};

// DELETE
const deletePost = async (id) => {
  await axios.delete(\`/api/posts/\${id}\`);
};
\`\`\`

### Interceptors

\`\`\`jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// Add auth token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Handle 401 errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
\`\`\`

---

## 3. Async/Await Pattern

Async/await makes asynchronous code cleaner and more readable than promise chains.

### Basic Pattern

\`\`\`jsx
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <div>{/* Render data */}</div>;
}
\`\`\`

### Parallel Requests

\`\`\`jsx
useEffect(() => {
  const fetchAllData = async () => {
    try {
      const [users, posts, comments] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/posts'),
        axios.get('/api/comments')
      ]);

      setData({
        users: users.data,
        posts: posts.data,
        comments: comments.data
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchAllData();
}, []);
\`\`\`

### Form Submission

\`\`\`jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus({ loading: true, error: null });

  try {
    await axios.post('/api/contact', formData);
    setStatus({ loading: false, error: null, success: true });
  } catch (error) {
    setStatus({ 
      loading: false, 
      error: error.response?.data?.message || 'Failed',
      success: false 
    });
  }
};
\`\`\`

---

## 4. Custom Hooks

Create reusable hooks to centralize data fetching logic and reduce boilerplate.

### useFetch Hook

\`\`\`jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <ul>{users?.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
\`\`\`

### useApi Hook with CRUD

\`\`\`jsx
import { useState, useCallback } from 'react';
import axios from 'axios';

function useApi(baseURL) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url: \`\${baseURL}\${endpoint}\`,
        ...(data && { data }),
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  return {
    get: (endpoint) => request('GET', endpoint),
    post: (endpoint, data) => request('POST', endpoint, data),
    put: (endpoint, data) => request('PUT', endpoint, data),
    del: (endpoint) => request('DELETE', endpoint),
    loading,
    error
  };
}
\`\`\`

---

## 5. React Query (TanStack Query)

React Query provides powerful server-state management with automatic caching, background refetching, and optimistic updates.

### Installation & Setup

\`\`\`bash
npm install @tanstack/react-query
\`\`\`

\`\`\`jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
\`\`\`

### Basic Query

\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://api.example.com/users');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
\`\`\`

### Mutations

\`\`\`jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => axios.post('/api/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title: 'New Post', content: 'Content...' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
\`\`\`

### Optimistic Updates

\`\`\`jsx
const updateMutation = useMutation({
  mutationFn: (updatedTodo) => axios.put(\`/api/todos/\${todo.id}\`, updatedTodo),
  onMutate: async (updatedTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previousTodos = queryClient.getQueryData(['todos']);
    
    queryClient.setQueryData(['todos'], (old) =>
      old.map((t) => (t.id === todo.id ? { ...t, ...updatedTodo } : t))
    );
    
    return { previousTodos };
  },
  onError: (err, updatedTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
});
\`\`\`

### Infinite Queries

\`\`\`jsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfinitePostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(\`/api/posts?page=\${pageParam}&limit=10\`);
      return res.json();
    },
    getNextPageParam: (lastPage, pages) => 
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.posts.map(post => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
\`\`\`

---

## 6. SWR (Stale-While-Revalidate)

SWR is Vercel's lightweight data fetching library that shows cached data first, then updates in the background.

### Installation & Setup

\`\`\`bash
npm install swr
\`\`\`

\`\`\`jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

function UserList() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
\`\`\`

### Global Configuration

\`\`\`jsx
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig value={{
      fetcher: (url) => axios.get(url).then(res => res.data),
      revalidateOnFocus: true,
      refreshInterval: 30000, // Refresh every 30s
    }}>
      <YourApp />
    </SWRConfig>
  );
}
\`\`\`

### Mutations

\`\`\`jsx
import useSWR, { mutate } from 'swr';

function TodoList() {
  const { data: todos } = useSWR('/api/todos', fetcher);

  const addTodo = async (todoData) => {
    // Optimistic update
    mutate('/api/todos', [...todos, { ...todoData, id: Date.now() }], false);
    
    try {
      await axios.post('/api/todos', todoData);
      mutate('/api/todos'); // Revalidate
    } catch (error) {
      mutate('/api/todos'); // Revert on error
    }
  };

  return <div>{/* Render todos */}</div>;
}
\`\`\`

### Infinite Loading

\`\`\`jsx
import useSWRInfinite from 'swr/infinite';

function InfiniteList() {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) return null;
    return \`/api/posts?page=\${pageIndex + 1}&limit=10\`;
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);
  const posts = data ? data.flatMap(page => page.posts) : [];
  const isReachingEnd = data && !data[data.length - 1]?.hasMore;

  return (
    <div>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
      
      {!isReachingEnd && (
        <button onClick={() => setSize(size + 1)} disabled={isLoading}>
          Load More
        </button>
      )}
    </div>
  );
}
\`\`\`

---

## 7. GraphQL with Apollo Client

Apollo Client provides intelligent caching and real-time subscriptions for GraphQL APIs.

### Installation & Setup

\`\`\`bash
npm install @apollo/client graphql
\`\`\`

\`\`\`jsx
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <YourApp />
    </ApolloProvider>
  );
}
\`\`\`

### Queries

\`\`\`jsx
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <ul>{data.users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
\`\`\`

### Mutations

\`\`\`jsx
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
\`;

function CreatePostForm() {
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      variables: {
        input: { title: 'New Post', content: 'Content...' }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
\`\`\`

### Subscriptions (Real-time)

\`\`\`jsx
import { useSubscription, gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql\`
  subscription OnMessageAdded {
    messageAdded {
      id
      text
      user { name }
    }
  }
\`;

function ChatMessages() {
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);

  if (loading) return <div>Connecting...</div>;

  return (
    <div>
      <strong>{data?.messageAdded.user.name}:</strong>
      <span>{data?.messageAdded.text}</span>
    </div>
  );
}
\`\`\`

---

## Comparison & When to Use

| Method | Best For | Pros | Cons |
|--------|----------|------|------|
| **Fetch API** | Simple requests, no dependencies | Native, lightweight | Manual error handling, no interceptors |
| **Axios** | REST APIs, need interceptors | Auto JSON, better errors, interceptors | Extra dependency |
| **Custom Hooks** | Reusable logic, consistency | DRY, testable | Need to build yourself |
| **React Query** | Complex apps, caching needs | Auto caching, refetching, devtools | Learning curve, bundle size |
| **SWR** | Next.js apps, real-time data | Lightweight, fast, SSR-friendly | Less features than React Query |
| **Apollo Client** | GraphQL APIs | Normalized cache, subscriptions | GraphQL only, complex setup |

## Best Practices

1. **Always handle loading and error states** for better UX
2. **Use AbortController** to cancel requests on unmount
3. **Implement request deduplication** to avoid duplicate calls
4. **Cache data** when appropriate to reduce network requests
5. **Use TypeScript** for type safety with API responses
6. **Implement retry logic** for failed requests
7. **Show optimistic updates** for instant feedback
8. **Use environment variables** for API endpoints

## Conclusion

Choose your data fetching approach based on your project needs:

- **Small projects**: Fetch API or Axios
- **Medium projects**: Custom hooks with Axios
- **Large projects**: React Query or SWR
- **GraphQL projects**: Apollo Client

Start simple and add complexity as needed. The best solution is the one that solves your specific problems without over-engineering.
    `,
  },
  {
    id: 2,
    title: "10 Essential Tricks to Make Your React App Faster",
    slug: "react-performance-optimization-tricks",
    excerpt: "Boost your React app performance with these 10 proven techniques: memoization, lazy loading, code splitting, SSR, and more. Practical tips with code examples.",
    category: "React",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    date: "2024-12-02",
    content: `
## 10 Essential Tricks to Make Your React App Faster

Performance is crucial for user experience. Here are 10 proven techniques to optimize your React applications, from memoization to production builds.

---

## 1. React.memo() and useMemo()

Prevent unnecessary re-renders by memoizing components and expensive calculations.

### React.memo() - Memoize Components

\`\`\`jsx
const ExpensiveComponent = React.memo(({ text, count }) => {
  console.log('Rendering ExpensiveComponent');
  return (
    <div>
      <p>{text}</p>
      <p>Count: {count}</p>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState('');

  // ExpensiveComponent only re-renders when count changes, not otherState
  return (
    <>
      <ExpensiveComponent text="Hello" count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={otherState} onChange={(e) => setOtherState(e.target.value)} />
    </>
  );
}
\`\`\`

### useMemo() - Memoize Values

\`\`\`jsx
function DataList({ items }) {
  // Only recalculates when items change
  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### useCallback() - Memoize Functions

\`\`\`jsx
function SearchComponent() {
  const [query, setQuery] = useState('');

  // Function reference stays the same across re-renders
  const handleSearch = useCallback((searchTerm) => {
    console.log('Searching for:', searchTerm);
    // API call here
  }, []); // Empty deps = function never changes

  return <SearchInput onSearch={handleSearch} />;
}
\`\`\`

---

## 2. Lazy Loading

Load components only when needed to reduce initial bundle size.

\`\`\`jsx
import React, { lazy, Suspense } from 'react';

// Lazy load heavy components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### Lazy Load Images

\`\`\`jsx
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Gallery({ images }) {
  return (
    <div>
      {images.map(img => (
        <LazyLoadImage
          key={img.id}
          src={img.url}
          alt={img.alt}
          effect="blur"
          threshold={100}
        />
      ))}
    </div>
  );
}
\`\`\`

---

## 3. Pure Components

Use PureComponent or React.memo to skip re-renders when props/state haven't changed.

\`\`\`jsx
import { PureComponent } from 'react';

class UserCard extends PureComponent {
  render() {
    const { name, email } = this.props;
    console.log('Rendering UserCard');
    
    return (
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
    );
  }
}

// Functional equivalent with React.memo
const UserCardFunctional = React.memo(({ name, email }) => {
  console.log('Rendering UserCard');
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});
\`\`\`

---

## 4. Immutable Data Structures

Avoid direct mutations to help React detect changes efficiently.

\`\`\`jsx
// ❌ Bad - Direct mutation
function addItem(state, newItem) {
  state.items.push(newItem); // Mutates original
  return state;
}

// ✅ Good - Immutable update
function addItem(state, newItem) {
  return {
    ...state,
    items: [...state.items, newItem]
  };
}

// Using Immer for complex updates
import { produce } from 'immer';

const nextState = produce(state, draft => {
  draft.items.push(newItem);
  draft.count += 1;
});
\`\`\`

### Array Operations

\`\`\`jsx
// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== idToRemove));

// Update item
setItems(items.map(item => 
  item.id === idToUpdate ? { ...item, ...updates } : item
));

// Sort (create new array)
setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
\`\`\`

---

## 5. Image Optimization

Optimize images to reduce load times and bandwidth.

### Compression & Format

\`\`\`jsx
// Use next/image for automatic optimization (Next.js)
import Image from 'next/image';

function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      quality={75}
      loading="lazy"
      placeholder="blur"
    />
  );
}
\`\`\`

### Responsive Images

\`\`\`jsx
function ResponsiveImage({ src, alt }) {
  return (
    <picture>
      <source 
        srcSet={\`\${src}-small.webp\`} 
        type="image/webp" 
        media="(max-width: 640px)" 
      />
      <source 
        srcSet={\`\${src}-medium.webp\`} 
        type="image/webp" 
        media="(max-width: 1024px)" 
      />
      <img src={\`\${src}.jpg\`} alt={alt} loading="lazy" />
    </picture>
  );
}
\`\`\`

---

## 6. Code Splitting

Split your code into smaller chunks loaded on demand.

### Route-based Splitting

\`\`\`jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
\`\`\`

### Webpack Configuration

\`\`\`javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};
\`\`\`

---

## 7. CDN for Static Assets

Serve static files from a CDN for faster global delivery.

\`\`\`javascript
// vite.config.js or webpack.config.js
export default {
  base: 'https://cdn.example.com/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
};
\`\`\`

### Using CDN for Libraries

\`\`\`html
<!-- Load React from CDN in production -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
\`\`\`

---

## 8. Server-Side Rendering (SSR)

Pre-render pages on the server for faster initial load and better SEO.

### Next.js Example

\`\`\`jsx
// pages/products/[id].js
export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    props: { product }
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
}
\`\`\`

### Static Generation (SSG)

\`\`\`jsx
// Even faster - pre-render at build time
export async function getStaticProps() {
  const products = await fetchAllProducts();
  
  return {
    props: { products },
    revalidate: 3600 // Regenerate every hour
  };
}
\`\`\`

---

## 9. Performance Testing Tools

Identify and fix performance bottlenecks.

### React DevTools Profiler

\`\`\`jsx
import { Profiler } from 'react';

function onRenderCallback(
  id, // Component identifier
  phase, // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration, // Estimated time without memoization
  startTime,
  commitTime
) {
  console.log(\`\${id} took \${actualDuration}ms to render\`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourComponents />
    </Profiler>
  );
}
\`\`\`

### Web Vitals Monitoring

\`\`\`jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to your analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

---

## 10. Production Build Optimization

Configure your bundler for optimal production builds.

### Webpack Production Config

\`\`\`javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    usedExports: true, // Tree shaking
    sideEffects: false,
  },
  performance: {
    maxAssetSize: 244000,
    maxEntrypointSize: 244000,
    hints: 'warning'
  }
};
\`\`\`

### Vite Production Config

\`\`\`javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'axios']
        }
      }
    }
  }
};
\`\`\`

### Environment Variables

\`\`\`javascript
// Use production mode
if (process.env.NODE_ENV === 'production') {
  // Production-specific code
  console.log = () => {}; // Disable logs
}
\`\`\`

---

## Performance Checklist

✅ **Memoization**: Use React.memo(), useMemo(), useCallback()  
✅ **Code Splitting**: Lazy load routes and heavy components  
✅ **Images**: Compress, use WebP, lazy load  
✅ **Immutability**: Avoid direct mutations  
✅ **Bundle Size**: Analyze and reduce with webpack-bundle-analyzer  
✅ **CDN**: Serve static assets from CDN  
✅ **SSR/SSG**: Consider Next.js for better performance  
✅ **Testing**: Use Lighthouse, React DevTools Profiler  
✅ **Production Build**: Enable minification and tree shaking  
✅ **Monitoring**: Track Web Vitals in production

## Quick Wins

1. **Enable production mode** - Instant 2-3x performance boost
2. **Add React.memo()** to expensive components
3. **Lazy load routes** - Reduce initial bundle by 50%+
4. **Compress images** - Use WebP format
5. **Remove console.logs** in production

## Conclusion

Performance optimization is an ongoing process. Start with the quick wins, measure the impact, and gradually implement more advanced techniques. The best approach combines multiple strategies tailored to your specific application needs.

Remember: **Measure first, optimize second.** Use profiling tools to identify actual bottlenecks before optimizing.
    `,
  },
];

export { blogs };
