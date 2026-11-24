import './App.css';
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskManager from "./components/TaskManager/TaskManager";
import ContactForm from "./components/ContactForm/ContactForm";

function Home() {
  return (
    <section>
       <p> Welcome to the Task Management App. You can do the following:</p>
            <ul>
                <li>Add Tasks</li>
                <li>Update Tasks</li>
                <li>Delete Tasks</li>
                <li>Download the Task List to local storage in JSON format</li>
            </ul>
    </section>
  );
}

function Todos() {
  return <TaskManager />;
}

function Contact() {
  return <ContactForm />;
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
    <div>
      <Navbar
        pages={pages}
        currentPath={currentPath}
        onNavigate={navigate}
      />
      <main>{currentPage.component}</main>
    </div>
  );
}

export default App;
