import { renderHook } from '@testing-library/react-hooks';

import { useLayout } from '../utils/useLayout';

describe('useLayout', () => {
  it('all values should be zero', () => {
    const { result } = renderHook(() => useLayout());

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
  });
});
