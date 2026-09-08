import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "../../../../types";
import { ProjectModalHeader } from "./ProjectModalHeader";
import { ProjectModalMetrics } from "./ProjectModalMetrics";
import { ProjectEngineeringAnalysis } from "./ProjectEngineeringAnalysis";
import { ProjectModalTechDetails } from "./ProjectModalTechDetails";
import { ProjectModalFooter } from "./ProjectModalFooter";

export interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const lenis = (
      window as unknown as { __lenis?: { stop: () => void; start: () => void } }
    ).__lenis;

    if (project) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl rounded-3xl bg-zinc-900/95 border border-zinc-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto"
        >
          {/* Top Decorative Border Highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${project.color}, #06b6d4, transparent)`,
            }}
          />

          {/* Modal Header */}
          <ProjectModalHeader project={project} onClose={onClose} />

          {/* Modal Scrollable Content */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain py-6 space-y-6 pr-1 custom-scrollbar"
          >
            <ProjectModalTechDetails project={project} />
            <ProjectModalMetrics metrics={project.metrics} />
            <ProjectEngineeringAnalysis project={project} />
          </div>

          {/* Modal Footer Actions */}
          <ProjectModalFooter project={project} onClose={onClose} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
