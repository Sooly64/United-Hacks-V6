// src/App.js
import React from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";

function App() {
  return (
    <Layout>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Hackathon Skeleton</h1>

      <Card title="Example Card 1">
        example content block.
      </Card>

      <Card title="Example Card 2">
        example content block 2.
      </Card>

    </Layout>
  );
}

export default App;