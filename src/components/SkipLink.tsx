// Skip to content link for keyboard users
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg z-50 transition-all duration-200"
      aria-label="Skip to main content"
    >
      Skip to Content
    </a>
  );
}

export default SkipLink;