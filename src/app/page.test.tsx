import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home page', () => {
  it('renders Next.js logo and main instructions', () => {
    render(<Home />);
    
    // Check Next.js logo
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    
    // Check main instruction text
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(screen.getByText('src/app/page.tsx')).toBeInTheDocument();
  });

  it('renders action links with correct destinations', () => {
    render(<Home />);

    // Check Deploy now link
    const deployLink = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://vercel.com/new')
    );

    // Check Read our docs link
    const docsLink = screen.getByRole('link', { name: /Read our docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://nextjs.org/docs')
    );
  });

  it('renders footer resources links', () => {
    render(<Home />);

    const learnLink = screen.getByRole('link', { name: /Learn/i });
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://nextjs.org/learn')
    );

    const examplesLink = screen.getByRole('link', { name: /Examples/i });
    expect(examplesLink).toBeInTheDocument();
    expect(examplesLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://vercel.com/templates')
    );

    const nextjsLink = screen.getByRole('link', { name: /Go to nextjs\.org/i });
    expect(nextjsLink).toBeInTheDocument();
    expect(nextjsLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://nextjs.org')
    );
  });
});
