import { renderHook } from '@testing-library/react-hooks';

import useInputScrollHandler from '../index';

describe('useInputScrollHandler', () => {
  it('all values should be zero', () => {
    const { result } = renderHook(() => useInputScrollHandler());

    expect(result.current.keyboardSpace).toBe(0);
  });
});
