import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmbeddedLayout from './layout';

describe('EmbeddedLayout Component', () => {
  it('Layout render', () => {
    render(
      <EmbeddedLayout>
        <div>Authenticated Content</div>
      </EmbeddedLayout>,
    );

    expect(screen.getByText('Authenticated Content')).toBeInTheDocument();
  });
});
