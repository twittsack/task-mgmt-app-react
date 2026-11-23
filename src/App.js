import './App.css';
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <section>
       <p> Welcome to the Task Management App. You can do the following:</p>
            <ul>
                <li>Add Tasks</li>
                <li>Update Tasks</li>
                <li>Delete Tasks</li>
                <li>Use the Contact form to provide details on a new or existing Task</li>
            </ul>
    </section>
  );
}

function Todos() {
  return (
    <section>
      <h1>Todos Page</h1>
      <p>This is the contact endpoint: <strong>/todos</strong></p>
    </section>
  )
}

function Contact() {
  return (
    <section>
      <h1>Contact Page</h1>
      <p>This is the contact endpoint: <strong>/contact</strong></p>
    </section>
  );
}

const pages = {
  home: { 
    label: 'Home',
    path: '/',
    component: <Home />
  },
  todos: {
    label: 'Todos',
    path: '/todos',
    component: <Todos />
  },
  contact: {
    label: 'Contact',
    path: 'contact',
    component: <Contact />
  }
};

function getCurrentPath() {
  return window.location.pathname;
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const handleBrowserNavigation = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', handleBrowserNavigation);

    return () => {
      window.removeEventListener('popstate', handleBrowserNavigation);
    };
  }, []);

  const navigate = (path) => {
    const pageExists = Object.values(pages).some(
      (page) => page.path === path
    );

    if (!pageExists) {
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const currentPage =
    Object.values(pages).find((page) => page.path === currentPath) ||
    pages.home;

  useEffect(() => {
    if (!Object.values(pages).some((page) => page.path === currentPath)) {
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
    }
  }, [currentPath]);

  return (
    <div style={{ padding: '20px' }}>
      <Navbar
        pages={pages}
        currentPath={currentPath}
        onNavigate={navigate}
      />

      <p>
        Current endpoint: <strong>{currentPath}</strong>
      </p>

      <main>{currentPage.component}</main>
    </div>
  );
}

export default App;
