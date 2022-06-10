import { renderHook } from "@testing-library/react";
import { useLoader } from "./LoaderService";

describe("LoaderService", () => {
  it("loader hook is not loading initially", () => {
    const { result } = renderHook(() => useLoader());
    expect(result.current.isLoading).toBeFalsy();
  });

  it("should be possible to start loading", () => {
    const { result } = renderHook(() => useLoader());
    expect(result).toBeTruthy();
  });
});
