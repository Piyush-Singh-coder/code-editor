const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-gradient-to-t from-base-300 via-base-200/80 to-base-100 text-base-content border-t border-base-200">
      <aside>
        <p className="font-semibold text-lg sm:text-xl tracking-wide">
          Built by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
            developer
          </span>
          , but not for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 hover:from-orange-400 hover:to-pink-400 transition-all duration-300">
            developer
          </span>
          .
        </p>
        <p className="text-sm opacity-70 mt-2">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-primary">Horizon - Code Editor</span> | All rights reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;