// src/components/ScrollToTopButton.tsx
import React, { useEffect, useState } from "react";
import { ChevronUp, FileText } from "lucide-react";

interface Props {
  showFormIcon?: boolean;
  onFormIconClick?: () => void;
  extraRightPx?: number;
  /**
   * How many px the ChatBot widget is nudged up on mobile (should match ChatBot.tsx mobileNudge)
   * Example: if ChatBot.tsx uses mobileNudge = 110, pass chatbotNudge={110}
   */
  chatbotNudge?: number;
  /** breakpoint in px below which we treat as mobile */
  mobileBreakpoint?: number;
}

const ScrollToTopButton: React.FC<Props> = ({
  showFormIcon = true,
  onFormIconClick,
  extraRightPx = 0,
  chatbotNudge = 0,
  mobileBreakpoint = 480,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined"
      ? window.innerWidth <= mobileBreakpoint
      : false,
  );

  useEffect(() => {
    const onScroll = () => setIsVisible(window.pageYOffset > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileBreakpoint]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const baseRight = 20 + (extraRightPx || 0);

  // Compute bottoms so we don't overlap with the injected Gallabox widget.
  // Strategy: place our buttons ABOVE the widget. If widget is nudged up by chatbotNudge (on mobile),
  // we position our lowest button at chatbotNudge + padding, and stack additional buttons above it.
  const mobileBase = chatbotNudge > 0 ? chatbotNudge + 12 : 75; // default padding if chatbotNudge not provided
  const desktopBase = 75; // default desktop base bottom for the lowest button
  const lowestButtonBottom = isMobile ? mobileBase : desktopBase;

  // spacing between stacked buttons (vertical stack)
  const stackSpacing = 64; // px between buttons (adjust if you want tighter/looser)

  // If showFormIcon is true, that will be our lowest button (closest to screen bottom),
  // and scroll-to-top will be stacked above it. If showFormIcon is false, scroll-to-top is the lowest.
  const formButtonBottom = lowestButtonBottom;
  const scrollButtonBottom = showFormIcon
    ? lowestButtonBottom + stackSpacing
    : lowestButtonBottom;

  return (
    <>
      {isVisible && (
        <>
          {/* {showFormIcon && (
            <button
              onClick={() => {
                onFormIconClick?.();
                if (typeof window.VsourceOpenChat === "function") {
                  window.VsourceOpenChat();
                } else {
                  window.dispatchEvent(new Event("vsource-open-chat"));
                }
              }}
              aria-label="Open Form / Chat"
              className="sonar-button fixed z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              style={{
                right: `${baseRight}px`,
                bottom: `${formButtonBottom}px`,
              }}
            >
              <FileText className="h-6 w-6" />
            </button>
          )} */}

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed z-50 p-2 rounded-full shadow-lg transition-colors"
            style={{
              right: `${baseRight}px`,
              bottom: `${scrollButtonBottom}px`,
              background: "#ef4444",
              color: "#fff",
            }}
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </>
      )}

      <style>{`
        .sonar-button { overflow: visible; position: fixed; }
        .sonar-button::after{
          content: ""; position:absolute; top:50%; left:50%; width:100%; height:100%; border-radius:50%;
          transform:translate(-50%,-50%) scale(0.9); opacity:0; animation: sonarEffect 1.5s ease-out infinite;
        }
        @keyframes sonarEffect {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; box-shadow: 0 0 0 2px rgba(255,255,255,0.5), 0 0 10px 10px rgba(239,68,68,0.6); }
          100% { transform: translate(-50%,-50%) scale(2); opacity: 0; }
        }

        /* small responsive tweaks */
        @media (max-width: 420px) {
          .sonar-button,
          .fixed.p-2 {
            width: 44px;
            height: 44px;
            padding: 0.55rem;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
