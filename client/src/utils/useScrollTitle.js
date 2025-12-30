import { useEffect } from "react";

const sectionTitles = {
  home: "Paidi’s Clinic | Home",
  about: "Paidi’s Clinic | About",
  services: "Paidi’s Clinic | Services",
  appointment: "Paidi’s Clinic | Appointment",
  contact: "Paidi’s Clinic | Contact"
};

const useScrollTitle = () => {
  useEffect(() => {
    // If admin page → DO NOTHING but ensure cleanup
    if (window.location.pathname.startsWith("/admin")) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll("section[id]")
    );

    const onScroll = () => {
      if (window.scrollY < 50) {
        document.title = sectionTitles.home;
        return;
      }

      let currentSection = "home";
      let minDistance = Infinity;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section.id;
        }
      });

      document.title =
        sectionTitles[currentSection] || sectionTitles.home;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      // ✅ THIS WAS MISSING
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};

export default useScrollTitle;
