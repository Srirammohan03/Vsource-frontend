import React, { useEffect } from "react";

interface ChatBotProps {
  token: string;
  mobileNudge?: number;
  desktopNudge?: number;
  mobileBreakpoint?: number;
}

declare global {
  interface Window {
    Chatty?: any;
  }
}

const ChatBot: React.FC<ChatBotProps> = ({
  token,
  mobileNudge = 90,
  desktopNudge = 20,
  mobileBreakpoint = 768,
}) => {
  useEffect(() => {
    if (!token) return;

    // LOAD SCRIPT ONLY ONCE
    if (!document.getElementById("gallabox-chatty")) {
      (function (w: any, d: Document, s: string, u: string, t: string) {
        w.Chatty = function (c: any) {
          (w.Chatty._ = w.Chatty._ || []).push(c);
        };

        w.Chatty._ = w.Chatty._ || [];
        w.Chatty.url = u;
        w.Chatty.hash = t;

        const h = d.getElementsByTagName(s)[0];

        const j = d.createElement(s) as HTMLScriptElement;

        j.id = "gallabox-chatty";
        j.async = true;

        j.src =
          "https://widget.gallabox.com/chatty-widget.min.js?_=" + Math.random();

        h.parentNode?.insertBefore(j, h);
      })(window, document, "script", "https://widget.gallabox.com", token);
    }

    const adjustWidget = () => {
      const selectors = [
        "iframe[src*='gallabox']",
        ".chatty-widget",
        ".chatty-launcher",
        ".gallabox-launcher",
        "[id^='chatty']",
      ];

      const isMobile = window.innerWidth <= mobileBreakpoint;

      const bottomSpacing = isMobile ? mobileNudge : desktopNudge;

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((node) => {
          const el = node as HTMLElement;

          el.style.setProperty("bottom", `${bottomSpacing}px`, "important");

          el.style.setProperty(
            "right",
            isMobile ? "14px" : "20px",
            "important",
          );

          el.style.setProperty("z-index", "9999", "important");

          el.style.setProperty(
            "max-height",
            isMobile ? "75vh" : "85vh",
            "important",
          );

          el.style.setProperty("border-radius", "18px", "important");

          el.style.setProperty("overflow", "hidden", "important");
        });
      });
    };

    const interval = setInterval(() => {
      adjustWidget();
    }, 1000);

    window.addEventListener("resize", adjustWidget);

    setTimeout(adjustWidget, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", adjustWidget);
    };
  }, [token, mobileNudge, desktopNudge, mobileBreakpoint]);

  return null;
};

export default ChatBot;
