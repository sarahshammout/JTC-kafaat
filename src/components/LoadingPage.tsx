import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

interface LoadingPageProps {
  children: React.ReactNode;
}

export default function LoadingPage({ children }: LoadingPageProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "out" | "in">("idle");
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setTransitionPhase("out");

      const outTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionPhase("in");

        const inTimer = setTimeout(() => {
          setTransitionPhase("idle");
        }, 500);

        return () => clearTimeout(inTimer);
      }, 400);

      return () => clearTimeout(outTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, children]);

  return (
    <>
      {/* Cinematic overlay — dark navy, no white flash */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none transition-opacity ease-[cubic-bezier(0.76,0,0.24,1)] ${
          transitionPhase === "out"
            ? "opacity-100 duration-[400ms]"
            : transitionPhase === "in"
            ? "opacity-0 duration-[500ms]"
            : "opacity-0 duration-0"
        }`}
        style={{
          background: "radial-gradient(ellipse at center, hsl(214 44% 10% / 0.98), hsl(214 44% 4% / 1))",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-8xl lg:text-[10rem] font-bold font-display select-none"
            style={{
              color: "hsl(214 44% 40% / 0.25)",
              animation:
                transitionPhase === "out" || transitionPhase === "in"
                  ? "kOrbit 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  : "none",
              opacity: transitionPhase === "idle" ? 0 : undefined,
            }}
          >
            K
          </span>
        </div>
      </div>

      {/* Page content */}
      <div
        className={`transition-all ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          transitionPhase === "out"
            ? "opacity-0 scale-[0.97] blur-sm duration-[400ms]"
            : transitionPhase === "in"
            ? "opacity-0 translate-y-3 duration-[100ms]"
            : "opacity-100 scale-100 translate-y-0 blur-0 duration-[500ms]"
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
}