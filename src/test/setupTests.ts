/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import { server } from "../shared/api/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
