import React, { useEffect } from "react";

interface ChatBotProps {
  token: string;
  openOnLoad?: boolean;
  mobileNudge?: number;
  desktopNudge?: number;
  mobileBreakpoint?: number;
  widgetSelector?: string;
}

declare global {
  interface Window {
    Chatty?: any;
    VsourceOpenChat?: () => void;
    VsourceCloseChat?: () => void;
  }
}

const defaultSelectors = [
  "iframe[src*='gallabox']",
  "iframe[src*='chatty']",
  ".chatty-launcher",
  ".chatty-widget",
  ".gallabox-launcher",
  "[id^='chatty']",
];

const ChatBot: React.FC<ChatBotProps> = ({
  token,
  openOnLoad = false,
  mobileNudge = 60,
  desktopNudge = 10,
  mobileBreakpoint = 480,
  widgetSelector,
}) => {
  useEffect(() => {
    if (!token) return;
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
    window.VsourceOpenChat = () => {
      window.Chatty?.({ open: true });
    };

    window.VsourceCloseChat = () => {
      window.Chatty?.({ open: false });
    };
    const handleClickOutside = (e: MouseEvent) => {
      const frames = document.querySelectorAll("iframe[src*='gallabox']");
      for (const frame of frames) {
        if (frame.contains(e.target as Node)) return; // ignore inside click
      }
      window.VsourceCloseChat?.();
    };

    document.addEventListener("mousedown", handleClickOutside);

    const selectors = widgetSelector
      ? [widgetSelector, ...defaultSelectors]
      : defaultSelectors;

    const applyStylesAndNudge = (el: HTMLElement, px: number) => {
      if (el.dataset.gbAdjusted === "1") return;

      el.style.transform = `translateY(-${px}px)`;
      el.style.zIndex = "9999";
      const isMobile = window.innerWidth <= mobileBreakpoint;
      if (isMobile) {
        el.style.height = "70vh";
        el.style.maxHeight = "70vh";
      }

      el.dataset.gbAdjusted = "1";
    };

    const adjustOnce = () => {
      const isMobile = window.innerWidth <= mobileBreakpoint;
      const px = isMobile ? mobileNudge : desktopNudge;

      for (const sel of selectors) {
        const nodes = document.querySelectorAll(sel);
        if (!nodes.length) continue;

        const el = nodes[0] as HTMLElement;
        applyStylesAndNudge(el, px);
        return true;
      }
      return false;
    };

    let tries = 0;
    const interval = setInterval(() => {
      tries++;
      if (adjustOnce() || tries >= 15) clearInterval(interval);
    }, 400);

    window.addEventListener("resize", adjustOnce);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", adjustOnce);
      clearInterval(interval);
    };
  }, [
    token,
    openOnLoad,
    mobileNudge,
    desktopNudge,
    mobileBreakpoint,
    widgetSelector,
  ]);

  return null;
};

export default ChatBot;
