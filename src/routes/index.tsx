import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="/tanstack-circle-logo.png"
          alt="TanStack Logo"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
        <Link
          className="App-link"
          to="/admin"
        >
          Admin Dashboard
        </Link>
      </header>
    </div>
  );
}
