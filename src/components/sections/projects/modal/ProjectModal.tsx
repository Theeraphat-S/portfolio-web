import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ProjectItem } from "../../../../types";
import { ProjectModalHeader } from "./ProjectModalHeader";
import { ProjectModalMetrics } from "./ProjectModalMetrics";
import { ProjectEngineeringAnalysis } from "./ProjectEngineeringAnalysis";
import { ProjectModalTechDetails } from "./ProjectModalTechDetails";
import { ProjectModalFooter } from "./ProjectModalFooter";
import { useDialog } from "../../../../hooks/useDialog";

export interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const modalContainerRef = React.useRef<HTMLDivElement>(null);
  useDialog(project !== null, modalContainerRef, onClose);

  // Portal to <body> so no transformed/blurred ancestor or stacking
  // context can clip the overlay or let fixed chrome sit above it.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-default"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07080c]/85 backdrop-blur-xl -z-10"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalContainerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0d0f17]/95 border border-white/[0.08] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_-12px_rgba(0,240,255,0.12)] overflow-hidden max-h-[90vh] flex flex-col my-auto backdrop-blur-2xl outline-none"
          >
            {/* Top Decorative Border Highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, ${project.color}, #00f0ff, transparent)`,
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
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectModal;
