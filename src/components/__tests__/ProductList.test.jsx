// src/components/__tests__/ProductsList.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store/store";
import ProductsList from "../ProductsList";

describe("ProductsList", () => {
  it("renders a list of products", () => {
    const products = [
      { id: 1, name: "Product 1", price: "$10" },
      { id: 2, name: "Product 2", price: "$20" },
    ];

    render(
      <Provider store={store}>
        <Router>
          <ProductsList products={products} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20/i)).toBeInTheDocument();
  });
});
