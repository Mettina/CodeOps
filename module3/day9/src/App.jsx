import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import DishDetail from "./DishDetail.jsx";
import OrderForm from "./OrderForm.jsx";
import { lazy, Suspense } from "react";

const Checkout = lazy(() => import("./Checkout.jsx"));

import SignIn from "./SignIn.jsx";
import NotFound from "./NotFound.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

function Skeleton() {
  return <p>Loading…</p>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu/:id" element={<DishDetail />} />

            <Route
              path="cart"
              element={
                <ErrorBoundary
                  fallback={(reset) => (
                    <div>
                      <p>Something went wrong loading your cart.</p>
                      <button onClick={reset}>Try again</button>
                    </div>
                  )}
                >
                  <OrderForm />
                </ErrorBoundary>
              }
            />

            <Route path="signin" element={<SignIn />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary
                  fallback={(reset) => (
                    <div>
                      <p>Something went wrong loading the menu.</p>
                      <button onClick={reset}>Try again</button>
                    </div>
                  )}
                >
                  <Menu />
                </ErrorBoundary>
              }
            />

            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Suspense fallback={<Skeleton />}>
                    <Checkout />
                  </Suspense>
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}